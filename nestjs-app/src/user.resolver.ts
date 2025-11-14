import {
  Args,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { User } from './models/user.model';
import { Group } from './models/group.model';
import { UserRepository } from './repositories/user.repository';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  @Query()
  async user(@Args('id') id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  @ResolveField()
  async groups(@Parent() user: User): Promise<Group[]> {
    if (user.id !== '1') {
      return []
    }
    return [{ id: '1', name: 'Admin' }];
  }

  @ResolveReference()
  resolveReference(ref: User) {
    return this.userRepository.findById(ref.id);
  }
}

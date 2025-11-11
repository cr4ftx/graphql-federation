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
import { user } from './repositories/user.repository';

@Resolver('User')
export class UserResolver {
  @Query()
  async user(@Args('id') id: string): Promise<User | null> {
    if (id !== '1') {
      return null;
    }
    return user;
  }

  @ResolveField()
  async groups(@Parent() user: User): Promise<Group[]> {
    if (user.id !== '1') {
      return []
    }
    return [{ id: '1', name: 'Admin' }];
  }

  @ResolveReference()
  resolveReference(ref: { __typename: string; id: string }) {
    return user;
  }
}

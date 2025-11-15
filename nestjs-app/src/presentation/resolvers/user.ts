import {
  Args,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { UserDTO } from '../dto/user';
import { GroupDTO } from '../dto/group';
import { UserRepository } from '../../domain/repositories/user';
import { GroupRepository } from 'src/domain/repositories/group';
import { mapGroupToDTO } from '../mappers/group';
import { mapUserToDTO } from '../mappers/user';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly groupRepository: GroupRepository
  ) {}

  @Query()
  async user(@Args('id') id: string): Promise<UserDTO | null> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      return null
    }
    return mapUserToDTO(user)
  }

  @ResolveField()
  async groups(@Parent() user: UserDTO): Promise<GroupDTO[]> {
    const groups = await this.groupRepository.findAllByUserId(user.id)
    return groups.map(mapGroupToDTO)
  }

  @ResolveReference()
  async resolveReference(ref: UserDTO) {
    const user =  await this.userRepository.findById(ref.id);
    if (!user) {
      return null
    }
    return mapUserToDTO(user)
  }
}

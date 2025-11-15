import { Query, Resolver } from "@nestjs/graphql";
import { GroupRepository } from "src/domain/repositories/group";
import type { GroupDTO } from "../dto/group";
import { mapGroupToDTO } from "../mappers/group";

@Resolver("Group")
export class GroupResolver {
	constructor(private readonly groupRepository: GroupRepository) {}

	@Query()
	async groups(): Promise<GroupDTO[]> {
		const groups = await this.groupRepository.findAll();
		return groups.map(mapGroupToDTO);
	}
}

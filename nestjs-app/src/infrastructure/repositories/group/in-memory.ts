import { Injectable } from "@nestjs/common";
import type { Group } from "src/domain/entities/group";
import { GroupRepository } from "src/domain/repositories/group";

const groups: Group[] = [
	{ id: "1", name: "First group", description: "My awesome group" },
	{ id: "2", name: "Second group", description: "My awesome second group" },
];

type UserGroup = {
	userId: string;
	groupId: string;
};

const usersGroups: UserGroup[] = [
	{ userId: "1", groupId: "1" },
	{ userId: "2", groupId: "1" },
	{ userId: "3", groupId: "2" },
];

@Injectable()
export class InMemoryGroupRepository extends GroupRepository {
	async findAll(): Promise<Group[]> {
		return groups;
	}

	async findAllByUserId(userId: string): Promise<Group[]> {
		const userGroups = usersGroups.filter((ug) => ug.userId === userId);
		return groups.filter((group) =>
			userGroups.some((ug) => ug.groupId === group.id),
		);
	}
}

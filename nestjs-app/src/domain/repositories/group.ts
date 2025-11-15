import type { Group } from "../entities/group";

export abstract class GroupRepository {
	abstract findAll(): Promise<Group[]>;
	abstract findAllByUserId(userId: string): Promise<Group[]>;
}

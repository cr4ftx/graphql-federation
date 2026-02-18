import type { ClassProvider } from "@nestjs/common";
import { GroupRepository } from "src/domain/repositories/group";
import { PostgresGroupRepository } from "./postgres";

export const GroupRepositoryProvider: ClassProvider<GroupRepository> = {
	provide: GroupRepository,
	useClass: PostgresGroupRepository,
};

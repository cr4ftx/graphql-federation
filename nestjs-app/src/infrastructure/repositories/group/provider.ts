import type { ClassProvider } from "@nestjs/common";
import { GroupRepository } from "src/domain/repositories/group";
import { InMemoryGroupRepository } from "./in-memory";

export const GroupRepositoryProvider: ClassProvider<GroupRepository> = {
	provide: GroupRepository,
	useClass: InMemoryGroupRepository,
};

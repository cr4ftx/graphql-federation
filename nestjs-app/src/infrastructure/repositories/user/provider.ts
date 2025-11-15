import type { ClassProvider } from "@nestjs/common";
import { UserRepository } from "../../../domain/repositories/user";
import { InMemoryUserRepository } from "./in-memory";

export const UserRepositoryProvider: ClassProvider<UserRepository> = {
	provide: UserRepository,
	useClass: InMemoryUserRepository,
};

import type { ClassProvider } from "@nestjs/common";
import { InMemoryUserRepository, UserRepository } from "./user.repository";

export const UserRepositoryProvider: ClassProvider<UserRepository> = {
	provide: UserRepository,
	useClass: InMemoryUserRepository,
};

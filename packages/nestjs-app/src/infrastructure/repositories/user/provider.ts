import type { ClassProvider } from "@nestjs/common";

import { UserRepository } from "../../../domain/repositories/user";
import { PostgresUserRepository } from "./postgres";

export const UserRepositoryProvider: ClassProvider<UserRepository> = {
  provide: UserRepository,
  useClass: PostgresUserRepository,
};

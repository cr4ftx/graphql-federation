import { Module } from "@nestjs/common";

import { GroupRepositoryProvider } from "./repositories/group/provider";
import { UserRepositoryProvider } from "./repositories/user/provider";

@Module({
  providers: [UserRepositoryProvider, GroupRepositoryProvider],
  exports: [UserRepositoryProvider, GroupRepositoryProvider],
})
export class InfrastructureModule {}

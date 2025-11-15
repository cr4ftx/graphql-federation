import { Module } from "@nestjs/common";
import { InfrastructureModule } from "src/infrastructure/module";
import { GroupResolver } from "./resolvers/group";
import { UserResolver } from "./resolvers/user";

@Module({
	imports: [InfrastructureModule],
	providers: [UserResolver, GroupResolver],
})
export class PresentationModule {}

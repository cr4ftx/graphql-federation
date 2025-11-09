import {
	ApolloFederationDriver,
	type ApolloFederationDriverConfig,
} from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { RecipeResolver } from "./recipe.resolver";
import { UserResolver } from "./user.resolver";

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloFederationDriverConfig>({
			driver: ApolloFederationDriver,
			typePaths: ["./**/*.graphql"],
			graphiql: true,
			playground: false,
		}),
	],
	providers: [RecipeResolver, UserResolver],
})
export class AppModule {}

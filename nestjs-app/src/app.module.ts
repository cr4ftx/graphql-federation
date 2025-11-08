import {
	ApolloFederationDriver,
	type ApolloFederationDriverConfig,
} from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { Recipe } from "./models/recipe.model";
import { RecipeResolver } from "./recipe.resolver";
import { UserResolver } from "./user.resolver";

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloFederationDriverConfig>({
			driver: ApolloFederationDriver,
			autoSchemaFile: {
				federation: {
					version: 2,
				},
				path: "users.graphql",
			},
			buildSchemaOptions: {
				orphanedTypes: [Recipe],
			},
			graphiql: true,
			playground: false,
		}),
	],
	providers: [RecipeResolver, UserResolver],
})
export class AppModule {}

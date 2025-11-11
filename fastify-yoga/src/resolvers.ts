import type { Resolvers } from "graphql/generated.js";
import {
	recipeResolver,
	recipeUserResolver,
	userRecipesResolver,
} from "./recipes/presentations/recipes/recipe.resolver.js";

export const resolvers: Resolvers = {
	Query: {
		recipe: recipeResolver,
	},
	Recipe: {
		user: recipeUserResolver,
	},
	User: {
		recipes: userRecipesResolver,
	},
};

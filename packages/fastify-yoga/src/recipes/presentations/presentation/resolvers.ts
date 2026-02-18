import type { Resolvers } from "graphql/generated.js";
import {
	recipeResolver,
	recipesResolver,
	recipeUserResolver,
	userRecipesResolver,
} from "./recipe.resolver.js";

export const resolvers: Resolvers = {
	Query: {
		recipe: recipeResolver,
		recipes: recipesResolver,
	},
	Recipe: {
		user: recipeUserResolver,
	},
	User: {
		recipes: userRecipesResolver,
	},
};

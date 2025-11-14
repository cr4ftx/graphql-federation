import type {
	QueryResolvers,
	Recipe as RecipeGQL,
	RecipeResolvers,
	User as UserGQL,
	UserResolvers,
} from "graphql/generated.js";
import type { Recipe } from "../domain/recipe.js";
import { recipeRepository } from "../repository/recipe.repository.js";

const recipeToGQL = (recipe: Recipe): RecipeGQL => ({
	id: recipe.id,
	ingredients: recipe.ingredients,
	title: recipe.title,
	creationDate: recipe.createdAt,
	userId: recipe.userId,
	user: undefined as unknown as UserGQL,
});

export const recipeResolver: NonNullable<QueryResolvers["recipe"]> = async (
	_,
	{ id },
) => {
	const recipe = recipeRepository.findById(id);

	if (!recipe) {
		return null;
	}

	return recipeToGQL(recipe);
};

export const recipesResolver: NonNullable<
	QueryResolvers["recipes"]
> = async () => {
	const recipes = recipeRepository.findAll();
	return recipes.map(recipeToGQL);
};

export const recipeUserResolver: NonNullable<RecipeResolvers["user"]> = (
	parent,
) => {
	return {
		__typename: "User",
		id: parent.id,
		recipes: [],
	};
};

export const userRecipesResolver: NonNullable<UserResolvers["recipes"]> = (
	parent,
) => {
	const recipes = recipeRepository.findAllByUserId(parent.id);
	return recipes.map(recipeToGQL);
};

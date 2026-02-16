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
	description: recipe.description,
	userId: recipe.userId,
	user: undefined as unknown as UserGQL,
});

export const recipeResolver: NonNullable<QueryResolvers["recipe"]> = async (
	_,
	{ id },
) => {
	const recipe = await recipeRepository.findById(id);

	if (!recipe) {
		return null;
	}

	return recipeToGQL(recipe);
};

export const recipesResolver: NonNullable<
	QueryResolvers["recipes"]
> = async () => {
	const recipes = await recipeRepository.findAll();

	return recipes.map(recipeToGQL);
};

export const recipeUserResolver: NonNullable<RecipeResolvers["user"]> = async (
	parent,
) => {
	const recipe = await recipeRepository.findById(parent.id);

	if (!recipe) {
		throw new Error("recipe not found");
	}

	return {
		__typename: "User",
		id: recipe.userId,
		recipes: [],
	};
};

export const userRecipesResolver: NonNullable<
	UserResolvers["recipes"]
> = async (parent) => {
	const recipes = await recipeRepository.findAllByUserId(parent.id);

	return recipes.map(recipeToGQL);
};

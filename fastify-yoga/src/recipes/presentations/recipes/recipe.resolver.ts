import type {
	QueryResolvers,
	Recipe,
	RecipeResolvers,
	UserResolvers,
} from "graphql/generated.js";

export const recipes: Recipe[] = [
	{
		id: "1",
		creationDate: new Date(),
		ingredients: ["banana"],
		title: "test",
		description: "this is my awesome test",
	},
	{
		id: "2",
		creationDate: new Date(),
		ingredients: ["apple"],
		title: "Baked apple",
		description: "My second awesome recipe",
	},
];

export const recipeResolver: NonNullable<QueryResolvers["recipe"]> = async (
	_,
	{ id },
) => {
	return recipes.find((recipe) => recipe.id === id) ?? null;
};

export const recipeUserResolver: NonNullable<RecipeResolvers["user"]> = () => {
	return {
		__typename: "User",
		id: "1",
		recipes: [],
	};
};

export const userRecipesResolver: NonNullable<
	UserResolvers["recipes"]
> = () => {
	return recipes;
};

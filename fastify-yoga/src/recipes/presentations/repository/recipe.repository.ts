import type { Recipe } from "../domain/recipe.js";

export const recipes: Recipe[] = [
	{
		id: "1",
		ingredients: ["banana"],
		title: "test",
		description: "this is my awesome test",
		userId: "1",
		createdAt: new Date(),
	},
	{
		id: "2",
		ingredients: ["apple"],
		title: "Baked apple",
		description: "My second awesome recipe",
		userId: "2",
		createdAt: new Date(),
	},
	{
		id: "3",
		ingredients: ["pinaple"],
		title: "Pinaple pizza",
		description: "Beurk",
		userId: "1",
		createdAt: new Date(),
	},
];

const findAll = (): Recipe[] => recipes;

const findById = (id: string): Recipe | null =>
	recipes.find((recipe) => recipe.id === id) ?? null;

const findAllByUserId = (userId: string): Recipe[] =>
	recipes.filter((recipe) => recipe.userId === userId);

export const recipeRepository = {
	findAll,
	findAllByUserId,
	findById,
};

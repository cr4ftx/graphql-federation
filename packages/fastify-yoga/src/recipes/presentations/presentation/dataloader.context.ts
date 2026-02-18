import { AsyncLocalStorage } from "node:async_hooks";
import DataLoader from "dataloader";
import type { Recipe } from "../domain/recipe.js";
import { recipeRepository } from "../repository/recipe.repository.js";

interface DataLoaderContext {
	recipeByUserIdLoader: DataLoader<string, Recipe[]>;
}

const asyncLocalStorage = new AsyncLocalStorage<DataLoaderContext>();

const createDataLoaderContext = (): DataLoaderContext => ({
	recipeByUserIdLoader: new DataLoader(async (keys) => {
		const recipes = await recipeRepository.findAllByUserIds([...keys]);
		return keys.map((userId) =>
			recipes.filter((recipe) => recipe.userId === userId),
		);
	}),
});

export const getDataLoaderContext = (): DataLoaderContext => {
	const context = asyncLocalStorage.getStore();
	if (!context) {
		throw new Error(
			"DataLoader context not available. Make sure to run within runWithDataLoaderContext.",
		);
	}
	return context;
};

export const runWithDataLoaderContext = <T>(fn: () => T): T => {
	const context = createDataLoaderContext();
	return asyncLocalStorage.run(context, fn);
};

export const getRecipeLoader = (): DataLoader<string, Recipe[]> => {
	return getDataLoaderContext().recipeByUserIdLoader;
};

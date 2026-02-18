import type { Recipe } from "../domain/recipe.js";
import { pool } from "./database.js";

const fromDatabaseToRecipe = (row: any): Recipe => ({
	id: row.id,
	title: row.title,
	description: row.description,
	ingredients: row.ingredients,
	userId: row.user_id,
	createdAt: new Date(),
});

const findAll = async (): Promise<Recipe[]> => {
	const result = await pool.query(`SELECT * FROM "recipe"`);
	return result.rows.map((row) => fromDatabaseToRecipe(row));
};

const findById = async (id: string): Promise<Recipe | null> => {
	const result = await pool.query(`SELECT * FROM "recipe" where id = $1`, [id]);
	if (result.rows.length === 0) {
		return null;
	}
	return fromDatabaseToRecipe(result.rows[0]);
};

const findAllByUserId = async (userId: string): Promise<Recipe[]> => {
	const result = await pool.query(
		`SELECT * FROM "recipe", pg_sleep(0.1 + random() * 0.4) where user_id = $1`,
		[userId],
	);
	return result.rows.map((row) => fromDatabaseToRecipe(row));
};

const findAllByUserIds = async (userIds: string[]): Promise<Recipe[]> => {
	if (userIds.length === 0) {
		return [];
	}
	const placeholders = userIds.map((_, index) => `$${index + 1}`).join(",");
	const result = await pool.query(
		`SELECT * FROM "recipe", pg_sleep(0.1 + random() * 0.4) where user_id IN (${placeholders})`,
		userIds,
	);
	return result.rows.map((row) => fromDatabaseToRecipe(row));
};

export const recipeRepository = {
	findById,
	findAll,
	findAllByUserId,
	findAllByUserIds,
};

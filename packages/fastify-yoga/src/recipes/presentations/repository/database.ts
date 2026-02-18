import { Pool } from "pg";

export const pool = new Pool({
	host: "localhost",
	user: "postgres",
	password: "postgres",
	database: "recipes",
	port: 5432,
	max: 20,
});

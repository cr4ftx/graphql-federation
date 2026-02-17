import type { User } from "src/domain/entities/user";
import { UserRepository } from "src/domain/repositories/user";
import { pool } from "../database";

const fromDatabaseToUser = (row: any): User => ({
	id: row.id,
	firstName: row.first_name,
	lastName: row.last_name,
});

export class PostgresUserRepository extends UserRepository {
	async findById(id: string): Promise<User | null> {
		const result = await pool.query(`SELECT * FROM "user" WHERE id = $1`, [id]);
		if (result.rows.length === 0) {
			return null;
		}
		return fromDatabaseToUser(result.rows[0]);
	}

	async findAll(): Promise<User[]> {
		const result = await pool.query(`SELECT * FROM "user"`);
		return result.rows.map(fromDatabaseToUser);
	}
}

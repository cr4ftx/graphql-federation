import type { Group } from "src/domain/entities/group";
import { GroupRepository } from "src/domain/repositories/group";

import { pool } from "../database";

const fromDatabaseToUser = (row: any): Group => ({
  id: row.id,
  name: row.name,
  description: row.description,
});

export class PostgresGroupRepository extends GroupRepository {
  async findAll(): Promise<Group[]> {
    const result = await pool.query(`SELECT * FROM "group"`);
    return result.rows.map(fromDatabaseToUser);
  }

  async findAllByUserId(_userId: string): Promise<Group[]> {
    return [];
  }
}

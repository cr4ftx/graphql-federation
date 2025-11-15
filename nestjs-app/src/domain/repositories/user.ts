import type { User } from "src/domain/entities/user";

export abstract class UserRepository {
	abstract findById(id: string): Promise<User | null>;
}

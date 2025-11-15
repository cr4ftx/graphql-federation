import { Injectable } from "@nestjs/common";
import type { User } from "src/domain/entities/user";
import { UserRepository } from "src/domain/repositories/user";

const users: User[] = [
	{
		id: "1",
		firstName: "John",
		lastName: "Doe",
	},
	{
		id: "2",
		firstName: "Alice",
		lastName: "Gilbert",
	},
	{
		id: "3",
		firstName: "Scottie",
		lastName: "Pippen",
	},
];

@Injectable()
export class InMemoryUserRepository extends UserRepository {
	async findById(id: string): Promise<User | null> {
		const user = users.find((user) => user.id === id);
		if (!user) {
			return null;
		}
		return user;
	}
}

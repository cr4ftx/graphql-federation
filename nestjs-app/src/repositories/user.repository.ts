import { Injectable } from "@nestjs/common";
import type { User } from "src/models/user.model";

const users: User[] = [
	{
		id: "1",
		firstName: "John",
		lastName: "Doe",
	},
];

export abstract class UserRepository {
	abstract findById(id: string): User | null;
}

@Injectable()
export class InMemoryUserRepository implements UserRepository {
	findById(id: string): User | null {
		const user = users.find((user) => user.id === id);
		if (!user) {
			return null;
		}
		return user;
	}
}

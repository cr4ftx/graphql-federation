import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserDTO {
	@Field(() => ID)
	id: string;

	@Field()
	firstName: string;

	@Field()
	lastName: string;
}

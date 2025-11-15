import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class GroupDTO {
	@Field(() => ID)
	id: string;

	@Field()
	name: string;
}

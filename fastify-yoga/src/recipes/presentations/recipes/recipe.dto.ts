import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Recipe {
	@Field(() => ID)
	declare id: string;

	@Field()
	declare title: string;

	@Field({ nullable: true })
	declare description?: string;

	@Field()
	declare creationDate: Date;

	@Field(() => [String])
	declare ingredients: string[];
}

import { Directive, Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Directive("@extends")
@Directive('@key(fields: "id")')
export class User {
	@Field(() => ID)
	declare id: string;
}

import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "./user.model";

@ObjectType()
@Directive("@extends")
@Directive('@key(fields: "id")')
export class Recipe {
	@Field(() => ID)
	@Directive("@external")
	id: string;

	@Field(() => User, { nullable: true })
	user?: User;
}

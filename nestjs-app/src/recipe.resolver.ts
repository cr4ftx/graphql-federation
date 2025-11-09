import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Recipe } from "./models/recipe.model";
import { User } from "./models/user.model";
import { user } from "./repositories/user.repository";

@Resolver(() => Recipe)
export class RecipeResolver {
	@ResolveField(() => User, { nullable: true })
	async user(@Parent() recipe: Recipe): Promise<User | null> {
    if (recipe.id === "1") {
		  return user;
    }
    return null
	}
}

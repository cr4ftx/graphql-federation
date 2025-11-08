import { Arg, Query, Resolver } from "type-graphql";
import { Recipe } from "./recipe.dto.js";

@Resolver(Recipe)
export class RecipeResolver {
  constructor() {}

  @Query(() => Recipe, { nullable: true })
  async recipe(@Arg("id") id: string): Promise<Recipe | null> {
    if (id === "1") {
      return {
        id: "1",
        creationDate: new Date(),
        ingredients: [],
        title: "test",
        description: "this is my awesome test",
      };
    }
    if (id === "2") {
      return {
        id: "2",
        creationDate: new Date(),
        ingredients: [],
        title: "Baked apple",
        description: "My second awesome recipe",
      };
    }
    return null
  }
}

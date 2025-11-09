import type { QueryResolvers } from "graphql/generated.js";

export const recipeResolver: NonNullable<QueryResolvers["recipe"]> = async (
	_,
	{ id },
) => {
	if (id === "1") {
		return {
			id: "1",
			creationDate: new Date(),
			ingredients: ["banana"],
			title: "test",
			description: "this is my awesome test",
		};
	}
	if (id === "2") {
		return {
			id: "2",
			creationDate: new Date(),
			ingredients: ["apple"],
			title: "Baked apple",
			description: "My second awesome recipe",
		};
	}
	return null;
};

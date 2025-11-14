import { composeServices } from "@theguild/federation-composition";
import fs from "fs";
import { parse } from "graphql";
import path from "path";

const users = fs.readFileSync(
	path.join(import.meta.dirname, "./nestjs-app/users.graphql"),
	"utf8",
);
const recipes = fs.readFileSync(
	path.join(import.meta.dirname, "./fastify-yoga/recipe.graphql"),
	"utf8",
);

const result = composeServices([
	{
		name: "users",
		typeDefs: parse(users),
		url: "http://users/graphql",
	},
	{
		name: "recipes",
		typeDefs: parse(recipes),
		url: "http://recipes/graphql",
	},
]);

if (!result.supergraphSdl) {
	console.log(result.errors);
	throw new Error("compose services failed");
}

fs.writeFileSync(
	path.join(import.meta.dirname, "./supergraph.graphql"),
	result.supergraphSdl,
);

console.log("✅ Supergraph written to supergraph.graphql");

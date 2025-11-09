import { buildSubgraphSchema } from "@apollo/subgraph";
import fastify, { type FastifyReply, type FastifyRequest } from "fastify";
import fs from "fs";
import { parse } from "graphql";
import type { Resolvers } from "graphql/generated.js";
import { createYoga } from "graphql-yoga";
import path from "path";
import { recipeResolver } from "./recipes/presentations/recipes/recipe.resolver.js";

const app = fastify({ logger: true });

const resolvers: Resolvers = {
	Query: {
		recipe: recipeResolver,
	},
	User: {
		recipes: () => [
			{
				id: "1",
				creationDate: new Date(),
				ingredients: [],
				title: "test",
			},
			{
				id: "2",
				creationDate: new Date(),
				ingredients: ["apple"],
				title: "test 2",
			},
		],
	},
};

const yoga = createYoga<{
	req: FastifyRequest;
	reply: FastifyReply;
}>({
	schema: buildSubgraphSchema({
		typeDefs: parse(
			fs
				.readFileSync(path.join(import.meta.dirname, "../recipe.graphql"))
				.toString("utf8"),
		),
		resolvers,
	}),
	logging: {
		debug: (...args) => args.forEach((arg) => app.log.debug(arg)),
		info: (...args) => args.forEach((arg) => app.log.info(arg)),
		warn: (...args) => args.forEach((arg) => app.log.warn(arg)),
		error: (...args) => args.forEach((arg) => app.log.error(arg)),
	},
});

app.route({
	url: yoga.graphqlEndpoint,
	method: ["GET", "POST", "OPTIONS"],
	handler: (req, reply) =>
		yoga.handleNodeRequestAndResponse(req, reply, {
			req,
			reply,
		}),
});

app.listen({ port: 3001 });

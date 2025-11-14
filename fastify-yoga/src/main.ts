import { buildSubgraphSchema } from "@apollo/subgraph";
import type { GraphQLResolverMap } from "@apollo/subgraph/dist/schema-helper/resolverMap.js";
import fastify, { type FastifyReply, type FastifyRequest } from "fastify";
import fs from "fs";
import { parse } from "graphql";
import { createYoga } from "graphql-yoga";
import path from "path";
import { resolvers } from "./recipes/presentations/presentation/resolvers.js";

const app = fastify({ logger: true });

const schema = buildSubgraphSchema({
	typeDefs: parse(
		fs
			.readFileSync(path.join(import.meta.dirname, "../recipe.graphql"))
			.toString("utf8"),
	),
	resolvers: resolvers as GraphQLResolverMap<any>,
});

const yoga = createYoga<{
	req: FastifyRequest;
	reply: FastifyReply;
}>({
	schema,
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

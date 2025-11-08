import "reflect-metadata";
import fastify, { type FastifyReply, type FastifyRequest } from "fastify";
import { createYoga } from "graphql-yoga";
import { buildSchema } from "type-graphql";
import { RecipeResolver } from "./recipes/presentations/recipes/recipe.resolver.js";

const app = fastify({ logger: true });

const schema = await buildSchema({
	resolvers: [RecipeResolver],
	emitSchemaFile: "./recipe.graphql",
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

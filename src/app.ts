import fastify from "fastify";
import fastifyJWT from "@fastify/jwt";

import env from "./env";

import { toolsController } from "./http/tools-controller";
import { usersController } from "./http/users-controller";

export const app = fastify();

app.register(fastifyJWT, {
  secret: env.JWT_SECRET,
});

app.register(toolsController, {
  prefix: "/tools",
});

app.register(usersController, {
  prefix: "/users",
});
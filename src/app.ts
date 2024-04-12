import fastify from "fastify";

import { toolsController } from "./http/tools-controller";
import { usersController } from "./http/users-controller";

export const app = fastify();

app.register(toolsController, {
  prefix: "/tools",
});

app.register(usersController, {
  prefix: "/users",
})
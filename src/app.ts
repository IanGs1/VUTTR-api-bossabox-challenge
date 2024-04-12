import fastify from "fastify";

import { toolsController } from "./http/tools-controller";

export const app = fastify();

app.register(toolsController, {
  prefix: "/tools",
})
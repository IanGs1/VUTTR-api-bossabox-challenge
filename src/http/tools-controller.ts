import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { PrismaToolsRepository } from "@/repositories/prisma/prisma-tools-repository";

import { CreateToolUseCase } from "@/useCases/create-tool-useCase";
import { ListAllToolsUseCase } from "@/useCases/list-all-tools-useCase";
import { DeleteToolUseCase } from "@/useCases/delete-tool-useCase";

import { z } from "zod";

const prismaToolsRepository = new PrismaToolsRepository();

export async function toolsController(app: FastifyInstance) {
  app.post("/", async (request: FastifyRequest, reply: FastifyReply) => {
    const createToolSchema = z.object({
      title: z.string(),
      link: z.string(),
      description: z.string(),
      tags: z.string().array(),
    });

    const { title, description, link, tags } = createToolSchema.parse(request.body);

    try {
      const createToolUseCase = new CreateToolUseCase(prismaToolsRepository);

      const tool = await createToolUseCase.execute({
        title,
        description,
        link,
        tags,
      });

      return reply.status(201).send(tool);
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(409).send({
          message: error.message,
        })
      };
    };
  });

  app.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const listAllToolsUseCase = new ListAllToolsUseCase(prismaToolsRepository);

      const tools = await listAllToolsUseCase.execute();

      return reply.status(200).send(tools);
    } catch (error) {
      if (error instanceof Error) {
        console.log(`🚨 ERROR: ${error.message}`)

        return reply.status(409).send({
          message: "Internal Server Error",
        });
      };
    };
  });

  app.delete("/:toolId", async (request: FastifyRequest, reply: FastifyReply) => {
    const deleteToolSchema = z.object({
      toolId: z.string(),
    });

    const { toolId } = deleteToolSchema.parse(request.params);

    try {
      const deleteToolUseCase = new DeleteToolUseCase(prismaToolsRepository);

      const deleteToolResponse = await deleteToolUseCase.execute(toolId);

      return reply.status(200).send(deleteToolResponse);
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(409).send({
          message: error.message,
        });
      };
    };
  });
}
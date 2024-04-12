import { PrismaToolsRepository } from "@/repositories/prisma/prisma-tools-repository";
import { CreateToolUseCase } from "@/useCases/create-tool-useCase";

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

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
  })
}
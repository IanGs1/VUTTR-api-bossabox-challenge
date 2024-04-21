import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { PrismaToolsRepository } from "@/repositories/prisma/prisma-tools-repository";

import { verifyJwt } from "./middlewares/verify-jwt";

import { CreateToolUseCase } from "@/useCases/create-tool-useCase";
import { ListAllToolsUseCase } from "@/useCases/list-all-tools-useCase";
import { FindAToolByTagUseCase } from "@/useCases/find-a-tool-by-tag-useCase";
import { DeleteToolUseCase } from "@/useCases/delete-tool-useCase";

import { z } from "zod";

const prismaToolsRepository = new PrismaToolsRepository();

export async function toolsController(app: FastifyInstance) {
  app.post("/", {onRequest: [verifyJwt]}, async (request: FastifyRequest, reply: FastifyReply) => {
    const createToolSchema = z.object({
      title: z.string(),
      link: z.string(),
      description: z.string(),
      tags: z.string().array(),
    });

    const tokenSchema = z.object({
      sub: z.string(),
      iat: z.number(),
      exp: z.number(),
    });

    const { title, description, link, tags } = createToolSchema.parse(request.body);
    const { sub: user_id } = tokenSchema.parse(request.user);

    try {
      const createToolUseCase = new CreateToolUseCase(prismaToolsRepository);

      const tool = await createToolUseCase.execute({
        title,
        description,
        link,
        tags,
      }, user_id);

      return reply.status(201).send(tool);
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(409).send({
          status: "Error",
          message: error.message,
        });
      };
    };
  });

  app.get("/", {onRequest: [verifyJwt]}, async (request: FastifyRequest, reply: FastifyReply) => {
    const findByTagSchema = z.object({
      tag: z.string(),
    });

    const tokenSchema = z.object({
      sub: z.string(),
      iat: z.number(),
      exp: z.number(),
    });

    const { sub: user_id } = tokenSchema.parse(request.user)

    const _tag = findByTagSchema.safeParse(request.query);
    let tools = [];

    if (_tag.success) {
      const { tag } = _tag.data;

      const findAToolByTagUseCase = new FindAToolByTagUseCase(prismaToolsRepository);
      tools = await findAToolByTagUseCase.execute(tag, user_id);

      return reply.status(200).send(tools);
    }

    try {
      const listAllToolsUseCase = new ListAllToolsUseCase(prismaToolsRepository);
      tools = await listAllToolsUseCase.execute(user_id);

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

  app.delete("/:toolId", {onRequest: [verifyJwt]}, async (request: FastifyRequest, reply: FastifyReply) => {
    const deleteToolSchema = z.object({
      toolId: z.string(),
    });

    const tokenSchema = z.object({
      sub: z.string(),
      iat: z.number(),
      exp: z.number(),
    });

    const { sub: user_id } = tokenSchema.parse(request.user)
    const { toolId } = deleteToolSchema.parse(request.params);

    try {
      const deleteToolUseCase = new DeleteToolUseCase(prismaToolsRepository);

      const deleteToolResponse = await deleteToolUseCase.execute(toolId, user_id);

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
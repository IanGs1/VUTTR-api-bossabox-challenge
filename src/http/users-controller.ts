import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

import { CreateUserUseCase } from "@/useCases/create-user-useCase";
import { SignInUserUseCase } from "@/useCases/sign-in-user-useCase";

import { z } from "zod";

const prismaUsersRepository = new PrismaUsersRepository();

export async function usersController(app: FastifyInstance) {
  app.post("/", async (request: FastifyRequest, reply: FastifyReply) => {
    const createUserSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
    });

    const { name, email, password: password_hash } = createUserSchema.parse(request.body);

    const createUserUsecase = new CreateUserUseCase(prismaUsersRepository);

    try {      
      const response = await createUserUsecase.execute({ name, email, password_hash});

      return reply.status(201).send(response);
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(409).send({
          message: error.message,
        })
      }
    };
  });

  app.post("/signin", async (request: FastifyRequest, reply: FastifyReply) => {
    const signInSchema = z.object({
      email: z.string(),
      password: z.string(),
    });

    const { email, password } = signInSchema.parse(request.body);

    const signInUserUseCase = new SignInUserUseCase(prismaUsersRepository);

    try {      
      const { user } = await signInUserUseCase.execute({ email, password});
      
      const token = await reply.jwtSign({}, {
        sign: {
          sub: user.id,
          expiresIn: "7d",
        }
      });

      return reply.status(201).send({
        ...user,
        token,
      })
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(409).send({
          message: error.message,
        })
      }
    };
  });
};
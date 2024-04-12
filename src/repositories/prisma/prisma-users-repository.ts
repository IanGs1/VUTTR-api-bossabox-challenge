import prismaClient from "@/lib/prisma";
import { ICreateUser, UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository{
  async create(data: ICreateUser) {
    const createUserResponse = await prismaClient.user.create({
      data,
    });

    return createUserResponse;
  };

  async findByEmail(email: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
};
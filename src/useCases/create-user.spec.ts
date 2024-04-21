import { describe, it, expect } from "vitest";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { CreateUserUseCase } from "./create-user-useCase";

import { compare } from "bcryptjs";

describe("Create User UseCase", () => {
  it("It should be able to create an user", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUserUseCase = new CreateUserUseCase(usersRepository);

    const data = {
      name: "Jonh Doe",
      email: "jonh.doe@email.com",
      password_hash: "123456",
    };

    const response = await createUserUseCase.execute(data);

    expect(response).toEqual(expect.objectContaining({
      id: "user-1",
      ...data,
    }));
  });

  it("An user's password should be hashed upon a creation", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUserUseCase = new CreateUserUseCase(usersRepository);

    const data = {
      name: "Jonh Doe",
      email: "jonh.doe@email.com",
      password_hash: "123456",
    };

    const response = await createUserUseCase.execute(data);

    const isPasswordHashed = await compare("123456", response.password_hash);

    expect(isPasswordHashed).toEqual(true);
  });

  it("An user should not be able to create an account with a already in use Email", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUserUseCase = new CreateUserUseCase(usersRepository);

    const data = {
      name: "Jonh Doe",
      email: "jonh.doe@email.com",
      password_hash: "123456",
    };

    await createUserUseCase.execute(data);

    await expect(() =>
      createUserUseCase.execute({
        name: "Jonh Doe 1",
        email: "jonh.doe@email.com",
        password_hash: "123456", 
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
import { describe, it, expect } from "vitest";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

import { CreateUserUseCase } from "./create-user-useCase";
import { SignInUserUseCase } from "./sign-in-user-useCase";

describe("SignIn User UseCase", () => {
  it("An user should be able to Sign In", async () => {
    const usersRepository = new InMemoryUsersRepository();

    const createUserUseCase = new CreateUserUseCase(usersRepository);
    const signInUserUseCase = new SignInUserUseCase(usersRepository);

    const data = {
      name: "Jonh Doe",
      email: "jonh.doe@email.com",
      password_hash: "123456",
    };

    await createUserUseCase.execute(data);
    const signInResponse = await signInUserUseCase.execute({
      email: "jonh.doe@email.com",
      password: "123456",
    });

    expect(signInResponse).toEqual(expect.objectContaining({
      user: expect.objectContaining({
        id: "user-1",
        name: "Jonh Doe",
        email: "jonh.doe@email.com"
      })
    }));
  });

  it("An user should not be able to Sign In without valid credentials", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const signInUserUseCase = new SignInUserUseCase(usersRepository);

    await expect(() => 
      signInUserUseCase.execute({
        email: "jonh.doe@email.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
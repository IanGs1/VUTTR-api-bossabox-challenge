import { UsersRepository } from "@/repositories/users-repository";

import env from "@/env";

import { compare } from "bcryptjs";


interface ISignInUser {
  email: string;
  password: string;
}

export class SignInUserUseCase {
  constructor(private usersRepository: UsersRepository) {};

  async execute({ email, password }: ISignInUser) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new Error("Email/Password is wrong!");
    };

    const passwordMatch = await compare(password, user.password_hash);
    if (!passwordMatch) {
      throw new Error("Email/Password is wrong!");
    };

    return {
      user,
    };
  }; 
};
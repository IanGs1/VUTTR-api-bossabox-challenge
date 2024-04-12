import { ICreateUser, UsersRepository } from "@/repositories/users-repository";

import { hash } from "bcryptjs";

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {};
  
  async execute(data: ICreateUser) {
    const emailAlreadyInUse = await this.usersRepository.findByEmail(data.email);
    if (emailAlreadyInUse) {
      throw new Error("Email already in use!");
    };

    const password_hash = await hash(data.password_hash, 7);
    data.password_hash = password_hash;

    const createUserResponse = this.usersRepository.create(data);

    return createUserResponse;
  }
}
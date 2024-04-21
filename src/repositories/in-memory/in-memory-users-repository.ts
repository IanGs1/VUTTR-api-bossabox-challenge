import { User } from "@prisma/client";
import { ICreateUser, UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async create(data: ICreateUser) {
    const user = {
      id: "user-1",
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
    };

    this.users.push(user);

    return user;
  };

  async findByEmail(email: string) {
    const user = this.users.find(user => user.email === email);

    if (!user) {
      return undefined;
    };

    return user;
  };
}
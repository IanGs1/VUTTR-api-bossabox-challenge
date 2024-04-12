export interface ICreateUser {
  name: string;
  email: string;
  password_hash: string;
};

interface IReturnUser {
  id: string;
  name: string;
  email: string;
  password_hash: string;
}

export interface UsersRepository {
  create(data: ICreateUser): Promise<IReturnUser>
  findByEmail(email: string): Promise<IReturnUser | undefined>
};
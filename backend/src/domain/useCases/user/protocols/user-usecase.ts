import { User } from "../../../../infra/repositores/protocols/repositorys/UserRepository";

export interface IUserUseCase {
  create: (data: User) => Promise<{
    user: User;
    accessToken: string;
  }>;

  update: (data: any) => Promise<
    | User
    | {
        statusCode: number;
        body: {
          error: string;
        };
      }
    | null
  >;
  loadById: (id: string) => Promise<User | null>;
  loadAll: () => Promise<User[]>;
}

import { User } from "../repositorys/UserRepository";

export interface UserUseCase {
  create: (data: User) => Promise<{
    user: User;
    accessToken: string;
  }>;

  update: <T>(data: T) => Promise<User>;
  loadById: (id: string) => Promise<User>;
  loadAll: () => Promise<User[]>;
}

import { User } from "../repositorys/UserRepository";

export interface createUserUseCase {
  create: (data: User) => Promise<{
    user: User;
    accessToken: string;
  }>;
}

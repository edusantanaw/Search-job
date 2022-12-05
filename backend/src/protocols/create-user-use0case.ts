import { User } from "./UserRepository";

export interface createUserUseCase {
  create: (data: User) => Promise<{
    user: User;
    accessToken: string;
  }>;
}

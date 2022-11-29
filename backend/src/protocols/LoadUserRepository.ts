import { User } from "./user";

export interface loadUserRepository {
  load: (email: string) => Promise<User | null>;
}

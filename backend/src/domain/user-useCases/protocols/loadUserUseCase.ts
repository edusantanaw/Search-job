import { User } from "@prisma/client";

export interface loadUserUseCase {
  loadById: (id: string) => Promise<User | null>;
  loadAll: () => Promise<User[]>;
}

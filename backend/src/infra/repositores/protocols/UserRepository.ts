import { User } from "@prisma/client";
import { data } from "../../../domain/user-useCases/protocols/updateUserUseCase";

export type user = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export interface IUser extends user {
  id?: string;
  phoneNumber?: string | null;
  perfilPhoto?: string | null;
  city?: string | null;
  password: string;
}

export interface userRepository {
  loadByEmail: (email: string) => Promise<User | null>;
  save: (data: user) => Promise<User>;
  loadById: (id: string) => Promise<User | null>;
  update: (data: data) => Promise<User>;
  loadAll: () => Promise<User[]>;
}

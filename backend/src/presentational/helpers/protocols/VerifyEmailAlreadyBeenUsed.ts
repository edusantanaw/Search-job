import { User } from "../../../infra/repositores/protocols/repositorys/UserRepository";

export interface verifyEmailAlreadyBeenUsed {
  verify: (email: string) => Promise<User | null>;
}

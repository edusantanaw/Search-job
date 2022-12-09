import { User } from "../../../infra/repositores/protocols/UserRepository";

export interface verifyEmailAlreadyBeenUsed {
  verify: (email: string) => Promise<User | null>;
}

import { User } from "../../protocols/repositorys/UserRepository";

export interface verifyEmailAlreadyBeenUsed {
    verify: (email: string) => Promise<User | null>
}
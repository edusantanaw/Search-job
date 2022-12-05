import { User } from "../../protocols/UserRepository";

export interface verifyEmailAlreadyBeenUsed {
    verify: (email: string) => Promise<User | null>
}
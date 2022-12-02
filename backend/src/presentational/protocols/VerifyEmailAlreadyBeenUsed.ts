import { User } from "../../protocols/user";

export interface verifyEmailAlreadyBeenUsed {
    verify: (email: string) => Promise<User | null>
}
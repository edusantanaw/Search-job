import { User } from "../../protocols/user";

export interface insertUser{
    save: (data: User) => Promise<User | null>
}
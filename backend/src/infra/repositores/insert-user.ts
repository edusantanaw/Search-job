import { user } from "../../prisma/client";
import { User } from "../../protocols/user";

export class InsertUsert {
  async save(data: User) {
    if (data) {
      const newUser = await user.create({
        data: data,
      });
      return newUser;
    }
    return null;
  }
}

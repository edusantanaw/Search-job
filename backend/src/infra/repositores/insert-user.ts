import { user } from "../../prisma/client";
import { userRepository } from "../../protocols/user";

export class InsertUsert {
  async save(data: userRepository) {
    if (data) {
      const newUser = await user.create({
        data: data,
      });
      return newUser;
    }
    return null;
  }
}

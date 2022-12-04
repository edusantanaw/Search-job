import { user } from "../../prisma/client";
import { User } from "../../protocols/UserRepository";

export class UserRepository {
  async loadByEmail(email: string) {
    const userResponse = await user.findFirst({
      where: {
        email: email,
      },
    });
    return userResponse;
  }

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

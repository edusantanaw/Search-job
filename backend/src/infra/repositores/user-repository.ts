import { user } from "../../prisma/client";
import { User } from "../../protocols/repositorys/UserRepository";

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
    const newUser = await user.create({
      data: data,
    });
    return newUser;
  }
  async loadById(id: string) {
    const userResponse = await user.findFirst({
      where: {
        id: id,
      },
    });
    return userResponse;
  }
}

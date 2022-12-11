import { data } from "../../domain/user-useCases/protocols/updateUserUseCase";
import { user } from "../../prisma/client";
import { IUser, userRepository } from "./protocols/UserRepository";

export class UserRepository implements userRepository {
  async loadByEmail(email: string) {
    const userResponse = await user.findFirst({
      where: {
        email: email,
      },
    });
    return userResponse;
  }

  async save(data: IUser) {
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

  async loadAll() {
    const users = await user.findMany();
    return users;
  }

  async update(data: data) {
    const userUpdated = await user.update({
      where: {
        id: data.id,
      },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        perfilPhoto: data.perfilPhoto,
        city: data.city,
      },
    });
    return userUpdated;
  }
}

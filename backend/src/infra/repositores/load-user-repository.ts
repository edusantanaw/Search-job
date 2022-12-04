import { user } from "../../prisma/client";

export class LoadUserRepository {
  async load(email: string) {
    const userResponse = await user.findFirst({
      where: {
        email: email,
      },
    });
    return userResponse;
  }
}

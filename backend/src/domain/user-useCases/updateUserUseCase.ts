import {
  User,
  userRepository,
} from "../../infra/repositores/protocols/UserRepository";
import { verifyEmailAlreadyBeenUsed } from "../../presentational/helpers/protocols/VerifyEmailAlreadyBeenUsed";
import { emailAlreadyUsed, HttpResponse } from "../../utils/errors";
import { NotFoundError } from "../../utils/errors/not-found";

export class UpdateUserUseCase {
  constructor(
    private userRepository: userRepository,
    private verifyEmailAlreadyBeenUsed: verifyEmailAlreadyBeenUsed
  ) {}
  async update(userRequest: User) {
    if (userRequest.id) {
      const verifyUserExists = await this.userRepository.loadById(
        userRequest.id
      );
      if (!verifyUserExists)
        throw HttpResponse.badRequest(new NotFoundError("user"));

      if (userRequest.email !== verifyUserExists.email) {
        const verify = await this.verifyEmailAlreadyBeenUsed.verify(
          userRequest.email
        );
        if (!verify) return HttpResponse.badRequest(new emailAlreadyUsed());
      }
      const userUpdated = await this.userRepository.update(userRequest);
      return userUpdated;
    }
    return null;
  }
}

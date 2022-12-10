import { userRepository } from "../../infra/repositores/protocols/UserRepository";
import { verifyEmailAlreadyBeenUsed } from "../../presentational/helpers/protocols/VerifyEmailAlreadyBeenUsed";
import { emailAlreadyUsed, InvalidParamError } from "../../utils/errors";
import { NotFoundError } from "../../utils/errors/not-found";
import { data, updateUserUseCase } from "./protocols/updateUserUseCase";

export class UpdateUserUseCase implements updateUserUseCase {
  constructor(
    private userRepository: userRepository,
    private verifyEmailAlreadyBeenUsed: verifyEmailAlreadyBeenUsed
  ) {}
  async update(data: data) {
    if (data.id) {
      const verifyUserExists = await this.userRepository.loadById(data.id);
      if (!verifyUserExists) throw new NotFoundError("user");

      if (data.email !== verifyUserExists.email) {
        const verify = await this.verifyEmailAlreadyBeenUsed.verify(data.email);
        if (!verify) throw new emailAlreadyUsed();
      }
      const userUpdated = await this.userRepository.update(data);
      return userUpdated;
    }
    throw new InvalidParamError("id");
  }
}

import { UserUseCase } from "../../../domain/user-useCases/createUserUseCase";
import { UserRepository } from "../../../infra/repositores/user-repository";
import { VerifyEmailAlreadyBeenUsed } from "../../../presentational/helpers/verifyEmailAlreadyBeenUsed";
import { UserRoutes } from "../../../presentational/routers/user/updateUser-routers";

import { Encrypter } from "../../../utils/helpers/encrypter";
import { GenerateToken } from "../../../utils/helpers/token-generate";

export class UserRouterComposer {
  static compose() {
    const encrypter = new Encrypter();
    const userRepository = new UserRepository();
    const verifyEmailAlreadyBeenUsed = new VerifyEmailAlreadyBeenUsed(
      userRepository
    );
    const generateToken = new GenerateToken("secret");

    const userUseCase = new UserUseCase({
      userRepository,
      encrypter,
      verifyEmailAlreadyBeenUsed,
      generateToken,
    });
    return new UserRoutes({ userUseCase });
  }
}

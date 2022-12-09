import { AuthUseCase } from "../../../domain/user-useCases/auth-useCase";
import { UserUseCase } from "../../../domain/user-useCases/user-useCase";
import { UserRepository } from "../../../infra/repositores/user-repository";
import { VerifyEmailAlreadyBeenUsed } from "../../../presentational/helpers/verifyEmailAlreadyBeenUsed";
import AuthRouter from "../../../presentational/routers/auth/auth.routers";
import { EmailValidator } from "../../../utils/helpers/email-validator";
import { Encrypter } from "../../../utils/helpers/encrypter";
import { GenerateToken } from "../../../utils/helpers/token-generate";

export default class SigninRouterComposer {
  static compose() {
    const emailValidator = new EmailValidator();
    const userRepository = new UserRepository();
    const encrypter = new Encrypter();
    const generateToken = new GenerateToken("secret");

    const verifyEmailAlreadyBeenUsed = new VerifyEmailAlreadyBeenUsed(
      userRepository
    );
    const authUseCase = new AuthUseCase(
      userRepository,
      encrypter,
      generateToken
    );
    const userUseCase = new UserUseCase({
      encrypter,
      generateToken,
      userRepository,
      verifyEmailAlreadyBeenUsed,
    });

    return new AuthRouter({ authUseCase, emailValidator, userUseCase });
  }
}

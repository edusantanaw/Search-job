import { CreateUseCase } from "../../../domain/user-useCases/createUserUseCase";
import { UserRepository } from "../../../infra/repositores/user-repository";
import { VerifyEmailAlreadyBeenUsed } from "../../../presentational/helpers/verifyEmailAlreadyBeenUsed";
import { SignupRouter } from "../../../presentational/routers/auth/signupRouter";
import { EmailValidator } from "../../../utils/helpers/email-validator";
import { Encrypter } from "../../../utils/helpers/encrypter";
import { GenerateToken } from "../../../utils/helpers/token-generate";

export default class SignupComposer {
  static compose() {
    const emailValidator = new EmailValidator();
    const encrypter = new Encrypter();
    const userRepository = new UserRepository();
    const verifyEmailAlreadyBeenUsed = new VerifyEmailAlreadyBeenUsed(
      userRepository
    );
    const generateToken = new GenerateToken("secret");

    const signupUseCase = new CreateUseCase({
      encrypter,
      userRepository,
      verifyEmailAlreadyBeenUsed,
      generateToken,
    });

    return new SignupRouter(signupUseCase, emailValidator);
  }
}

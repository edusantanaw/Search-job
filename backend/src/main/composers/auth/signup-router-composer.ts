import { UserUseCase } from "../../../domain/useCases/user/user-useCase";
import { UserRepository } from "../../../infra/repositores/user-repository";
import { VerifyEmailAlreadyBeenUsed } from "../../../presentational/helpers/verifyEmailAlreadyBeenUsed";
import { SignupRouter } from "../../../presentational/routers/auth/signup.routers";
import { EmailValidator } from "../../../utils/helpers/email-validator";
import { Encrypter } from "../../../utils/helpers/encrypter";
import { GenerateToken } from "../../../utils/helpers/token-generate";

export default class SignupRouterComposer {
  static compose() {
    const emailValidator = new EmailValidator();
    const userRepository = new UserRepository();
    const verifyEmailAlreadyBeenUsed = new VerifyEmailAlreadyBeenUsed(
      userRepository
    );
    const generateToken = new GenerateToken("secret");
    const encrypter = new Encrypter();
    const createUserUseCase = new UserUseCase({
      encrypter,
      generateToken,
      userRepository,
      verifyEmailAlreadyBeenUsed,
    });

    return new SignupRouter({
      emailValidator,
      createUserUseCase,
    });
  }
}

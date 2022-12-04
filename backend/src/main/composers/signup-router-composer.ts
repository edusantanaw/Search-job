import { AuthUseCase } from "../../domain/useCases/auth-useCase";
import { UserRepository } from "../../infra/repositores/user-repository";
import { VerifyEmailAlreadyBeenUsed } from "../../presentational/helpers/verifyEmailAlreadyBeenUsed";
import { SignupRouter } from "../../presentational/routers/signup.routers";
import { EmailValidator } from "../../utils/helpers/email-validator";
import { Encrypter } from "../../utils/helpers/encrypter";
import { GenerateToken } from "../../utils/helpers/token-generate";

export default class SignupRouterComposer {
  static compose() {
    const emailValidator = new EmailValidator();
    const userRepository = new UserRepository()
    const verifyEmailAlreadyBeenUsed = new VerifyEmailAlreadyBeenUsed(
     userRepository
    );
    const encrypter = new Encrypter();
    
    const authUseCase = new AuthUseCase(
     userRepository,
      encrypter,
      new GenerateToken("secret")
    );

    return new SignupRouter(
      emailValidator,
      verifyEmailAlreadyBeenUsed,
      userRepository,
      encrypter,
      authUseCase
    );
  }
}
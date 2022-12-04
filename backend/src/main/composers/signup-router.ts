import { AuthUseCase } from "../../domain/useCases/auth-useCase";
import { InsertUsert } from "../../infra/repositores/insert-user";
import { LoadUserRepository } from "../../infra/repositores/load-user-repository";
import { VerifyEmailAlreadyBeenUsed } from "../../presentational/helpers/verifyEmailAlreadyBeenUsed";
import { SignupRouter } from "../../presentational/routers/signup.routers";
import { EmailValidator } from "../../utils/helpers/email-validator";
import { Encrypter } from "../../utils/helpers/encrypter";
import { GenerateToken } from "../../utils/helpers/token-generate";

export class SignupRouterComposer {
  static compose() {
    const emailValidator = new EmailValidator();
    const verifyEmailAlreadyBeenUsed = new VerifyEmailAlreadyBeenUsed(
      new LoadUserRepository()
    );
    const insertUser = new InsertUsert();
    const encrypter = new Encrypter();
    const authUseCase = new AuthUseCase(
      new LoadUserRepository(),
      encrypter,
      new GenerateToken("secret")
    );

    return new SignupRouter(
      emailValidator,
      verifyEmailAlreadyBeenUsed,
      insertUser,
      encrypter,
      authUseCase
    );
  }
}

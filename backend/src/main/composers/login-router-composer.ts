import { EmailValidator } from "../../protocols/email-validator";
import { AuthUseCase } from "../../domain/useCases/auth-useCase";
import { LoadUserRepository } from "../../infra/repositores/load-user-repository";
import LoginRouter from "../../presentational/routers/signin.routers";
import { Encrypter } from "../../utils/helpers/encrypter";
import { GenerateToken } from "../../utils/helpers/token-generate";

export default class LoginRouterComposer {
  static compose() {
    const emailValidator = new EmailValidator();
    const loadUserRepository = new LoadUserRepository();
    const encrypter = new Encrypter();
    const generateToken = new GenerateToken("secret");

    const authUseCase = new AuthUseCase(
      loadUserRepository,
      encrypter,
      generateToken
    );
    return new LoginRouter(authUseCase, emailValidator);
  }
}

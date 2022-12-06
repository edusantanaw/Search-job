import { AuthUseCase } from "../../../domain/useCases/user/auth-useCase";
import { UserRepository } from "../../../infra/repositores/user-repository";
import LoginRouter from "../../../presentational/routers/auth/signin.routers";
import { EmailValidator } from "../../../utils/helpers/email-validator";
import { Encrypter } from "../../../utils/helpers/encrypter";
import { GenerateToken } from "../../../utils/helpers/token-generate";

export default class SigninRouterComposer {
  static compose() {
    const emailValidator = new EmailValidator();
    const userRepository = new UserRepository();
    const encrypter = new Encrypter();
    const generateToken = new GenerateToken("secret");
    const authUseCase = new AuthUseCase(
      userRepository,
      encrypter,
      generateToken
    );
    return new LoginRouter({ authUseCase, emailValidator });
  }
}

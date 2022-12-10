import { SigninUseCase } from "../../../domain/auth/signinUseCase";
import { UserRepository } from "../../../infra/repositores/user-repository";
import SigninRouter from "../../../presentational/routers/auth/signinRouter";
import { EmailValidator } from "../../../utils/helpers/email-validator";
import { Encrypter } from "../../../utils/helpers/encrypter";
import { GenerateToken } from "../../../utils/helpers/token-generate";

export default class SigninComposer {
  static compose() {
    const emailValidator = new EmailValidator();
    const encrypter = new Encrypter();
    const loadUserRepository = new UserRepository();
    const generateToken = new GenerateToken("secret");
    const signinUseCase = new SigninUseCase(
      loadUserRepository,
      encrypter,
      generateToken
    );

    return new SigninRouter(emailValidator, signinUseCase);
  }
}

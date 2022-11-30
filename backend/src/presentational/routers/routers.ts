import { emailValidator } from "../../protocols/email-validator";
import { HttpResponse } from "../../utils/errors/http-reponse";
import { InvalidParamError } from "../../utils/errors/invalid-param";

export default class LoginRouter {
  constructor(
    private authUseCase: authUseCase,
    private emailValidator: emailValidator
  ) {
    this.emailValidator = emailValidator;
    this.authUseCase = authUseCase;
  }

  async login(email: string, password: string) {
    if (email.length === 0)
      return HttpResponse.badRequest(new InvalidParamError("email"));

    if (password.length === 0)
      return HttpResponse.badRequest(new InvalidParamError("password"));

    if (!this.emailValidator.isValid(email))
      return HttpResponse.badRequest(new InvalidParamError("email"));

    const accessToken = await this.authUseCase.auth(email, password);

    if (!accessToken) return HttpResponse.unauthotizedError();

    return HttpResponse.ok({ accessToken });
  }
}

import { signinUseCase } from "../../../domain/auth/signinUseCase";
import { HttpResponse, InvalidParamError } from "../../../utils/errors";
import { Controller } from "../../../utils/protocols/controller";
import { emailValidator } from "../../../utils/protocols/email-validator";

export default class SigninRouter implements Controller {
  constructor(
    private emailValidator: emailValidator,
    private signinUseCase: signinUseCase
  ) {}

  async handle(data: { email: string; password: string }) {
    const { email, password } = data;
    if (!email) return HttpResponse.badRequest(new InvalidParamError("email"));

    if (!password)
      return HttpResponse.badRequest(new InvalidParamError("password"));

    if (!this.emailValidator.isValid(email))
      return HttpResponse.badRequest(new InvalidParamError("email"));

    const accessToken = await this.signinUseCase.auth(email, password);

    if (typeof accessToken !== "string" && accessToken) {
      return {
        statusCode: accessToken.statusCode,
        body: accessToken.body,
      };
    }
    return HttpResponse.ok({ accessToken });
  }
}

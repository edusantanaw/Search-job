import { emailValidator } from "../../../protocols/email-validator";
import { HttpResponse, InvalidParamError } from "../../../utils/errors";

export default class LoginRouter {
  constructor(
    private readonly authUseCase: authUseCase,
    private readonly emailValidator: emailValidator
  ) {
  }

  async route({ email, password }: { email: string; password: string }) {
    if (!email) return HttpResponse.badRequest(new InvalidParamError("email"));

    if (!password)
      return HttpResponse.badRequest(new InvalidParamError("password"));

    if (!this.emailValidator.isValid(email))
      return HttpResponse.badRequest(new InvalidParamError("email"));

    const accessToken = await this.authUseCase.auth(email, password);

    if (typeof accessToken !== "string" && accessToken) {
        return {
          statusCode: accessToken.statusCode,
          body: accessToken.body,
        };
    }
    return HttpResponse.ok({ accessToken });
  }
}

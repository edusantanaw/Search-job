import { emailValidator } from "../../../protocols/email-validator";
import { HttpResponse, InvalidParamError } from "../../../utils/errors";

type LoginProps = {
  authUseCase: authUseCase;
  emailValidator: emailValidator;
};

export default class LoginRouter {
  constructor(private props: LoginProps) {}

  async route({ email, password }: { email: string; password: string }) {
    if (!email) return HttpResponse.badRequest(new InvalidParamError("email"));

    if (!password)
      return HttpResponse.badRequest(new InvalidParamError("password"));

    if (!this.props.emailValidator.isValid(email))
      return HttpResponse.badRequest(new InvalidParamError("email"));

    const accessToken = await this.props.authUseCase.auth(email, password);

    if (typeof accessToken !== "string" && accessToken) {
      return {
        statusCode: accessToken.statusCode,
        body: accessToken.body,
      };
    }
    return HttpResponse.ok({ accessToken });
  }
}

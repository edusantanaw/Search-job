import { emailValidator } from "../../../utils/protocols/email-validator";
import { HttpResponse, InvalidParamError } from "../../../utils/errors";
import { authUseCase } from "../../../domain/user-useCases/protocols/auth-useCases";

type LoginProps = {
  authUseCase: authUseCase;
  emailValidator: emailValidator;
};

type data = {
  email: string;
  password: string;
};

export default class LoginRouter {
  constructor(private props: LoginProps) {}

  async signin(data: data) {
    const { email, password } = data;
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

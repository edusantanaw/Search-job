import { emailValidator } from "../../../utils/protocols/email-validator";
import {
  HttpResponse,
  InvalidParamError,
  NotEqualError,
} from "../../../utils/errors";
import { authUseCase } from "../../../domain/user-useCases/protocols/auth-useCases";
import { IUserUseCase } from "../../../domain/user-useCases/protocols/user-usecase";
import { userSignup } from "./protocols/userSignup";

type AuthProps = {
  authUseCase: authUseCase;
  emailValidator: emailValidator;
  userUseCase: IUserUseCase;
};

type data = {
  email: string;
  password: string;
};

interface auth {
  signin: (data: data) => Promise<{
    statusCode: number;
    body: any;
  }>;

  signup: (data: userSignup) => Promise<unknown>;
}

export default class AuthRouter implements auth {
  constructor(private props: AuthProps) {}

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

  async signup(data: userSignup) {
    const { email, password, confirmPassword, firstName, lastName } = data;
    try {
      if (!firstName)
        return HttpResponse.badRequest(new InvalidParamError("firstName"));

      if (!lastName)
        return HttpResponse.badRequest(new InvalidParamError("lastName"));

      if (!email)
        return HttpResponse.badRequest(new InvalidParamError("email"));

      if (!password)
        return HttpResponse.badRequest(new InvalidParamError("password"));

      if (!confirmPassword)
        return HttpResponse.badRequest(
          new InvalidParamError("confirmPassword")
        );

      if (password !== confirmPassword)
        return HttpResponse.badRequest(new NotEqualError());

      const isValid = this.props.emailValidator.isValid(email);
      if (!isValid)
        return HttpResponse.badRequest(new InvalidParamError("email"));

      const create = await this.props.userUseCase.create({
        firstName,
        email,
        lastName,
        password,
      });
      const { accessToken, user } = create;
      return HttpResponse.ok({ accessToken, user });
    } catch (error) {
      return error;
    }
  }
}

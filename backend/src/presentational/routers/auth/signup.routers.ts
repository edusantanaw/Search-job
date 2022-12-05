import { createUserUseCase } from "../../../protocols/create-user-use0case";
import { emailValidator } from "../../../protocols/email-validator";
import {
  HttpResponse,
  InvalidParamError,
  NotEqualError,
} from "../../../utils/errors";
import { userSignup } from "../../protocols/userSignup";

type signup = {
  emailValidator: emailValidator;
  createUserUseCase: createUserUseCase;
};

export class SignupRouter {
  constructor(private props: signup) {}

  async route(body: userSignup) {
    const { email, password, confirmPassword, firstName, lastName } = body;
    if (!firstName)
      return HttpResponse.badRequest(new InvalidParamError("firstName"));

    if (!lastName)
      return HttpResponse.badRequest(new InvalidParamError("lastName"));

    if (!email) return HttpResponse.badRequest(new InvalidParamError("email"));

    if (!password)
      return HttpResponse.badRequest(new InvalidParamError("password"));

    if (!confirmPassword)
      return HttpResponse.badRequest(new InvalidParamError("confirmPassword"));

    if (password !== confirmPassword)
      return HttpResponse.badRequest(new NotEqualError());

    const isValid = this.props.emailValidator.isValid(email);
    if (!isValid)
      return HttpResponse.badRequest(new InvalidParamError("email"));

    const create = await this.props.createUserUseCase.create({
      firstName,
      email,
      lastName,
      password,
    });

    if (!create) return create;
    const { accessToken, user } = create;

    return HttpResponse.ok({ accessToken, user });
  }
}

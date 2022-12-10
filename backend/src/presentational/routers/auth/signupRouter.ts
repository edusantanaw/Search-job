import {
  HttpResponse,
  InvalidParamError,
  NotEqualError,
} from "../../../utils/errors";
import { Controller } from "../../../utils/protocols/controller";
import { emailValidator } from "../../../utils/protocols/email-validator";
import { userSignup } from "./protocols/userSignup";

export class SignupRouter implements Controller {
  constructor(
    private signupUseCase: any,
    private emailValidator: emailValidator
  ) {}

  async handle(data: userSignup) {
    const { email, password, confirmPassword, firstName, lastName } = data;

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

    const isValid = this.emailValidator.isValid(email);
    if (!isValid)
      return HttpResponse.badRequest(new InvalidParamError("email"));
    const create = await this.signupUseCase.create({
      firstName,
      email,
      lastName,
      password,
    });
    const { accessToken, user } = create;
    return HttpResponse.ok({ accessToken, user });
  }
}

import { emailValidator } from "../../../utils/protocols/email-validator";
import {
  HttpResponse,
  InvalidParamError,
  NotEqualError,
} from "../../../utils/errors";
import { userSignup } from "./protocols/userSignup";
import { IUserUseCase } from "../../../domain/user-useCases/protocols/user-usecase";

type signup = {
  emailValidator: emailValidator;
  useUserCase: IUserUseCase;
};

interface sign {
  signup: (data: userSignup) => Promise<unknown>;
}

export class SignupRouter implements sign {
  constructor(private props: signup) {}

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

      const create = await this.props.useUserCase.create({
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

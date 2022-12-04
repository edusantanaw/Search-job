import { emailValidator } from "../../protocols/email-validator";
import {
  emailAlreayUsed,
  HttpResponse,
  InvalidParamError,
  NotEqualError,
} from "../../utils/errors";
import { insertUser } from "../protocols/InsertUser";
import { verifyEmailAlreadyBeenUsed } from "../protocols/VerifyEmailAlreadyBeenUsed";
import { encrypter } from "../../protocols/encrypter";
import { userSignup } from "../protocols/userSignup";

export class SignupRouter {
  constructor(
    private readonly emailValidator: emailValidator,
    private readonly verifyEmailAlreadyBeenUsed: verifyEmailAlreadyBeenUsed,
    private readonly insertUser: insertUser,
    private readonly encrypter: encrypter,
    private readonly authUseCase: authUseCase
  ) {}

  async route(body: userSignup) {
    for (let item in body) {
      if (!item) return HttpResponse.badRequest(new InvalidParamError(item));
    }

    const { email, password, confirmPassword, firstName, lastName } = body;

    if (password !== confirmPassword)
      return HttpResponse.badRequest(new NotEqualError());

    const isValid = this.emailValidator.isValid(email);
    if (!isValid)
      return HttpResponse.badRequest(new InvalidParamError("email"));

    const verify = await this.verifyEmailAlreadyBeenUsed.verify(email);
    if (!verify) return HttpResponse.badRequest(new emailAlreayUsed());

    const hashPassword = await this.encrypter.genHash(password);

    const user = await this.insertUser.save({
      email,
      firstName,
      lastName,
      password: hashPassword,
    });

    const accessToken = await this.authUseCase.auth(email, password);

    if (typeof accessToken !== "string" && accessToken) {
      return {
        statusCode: accessToken.statusCode,
        body: accessToken.body,
      };
    }
    return HttpResponse.ok({ accessToken, user });
  }
}

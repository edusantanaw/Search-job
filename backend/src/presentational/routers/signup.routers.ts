import { emailValidator } from "../../protocols/email-validator";
import {
  emailAlreadyUsed,
  HttpResponse,
  InvalidParamError,
  NotEqualError,
} from "../../utils/errors";
import { insertUser } from "../protocols/InsertUser";
import { verifyEmailAlreadyBeenUsed } from "../protocols/VerifyEmailAlreadyBeenUsed";
import { encrypter } from "../../protocols/encrypter";
import { userSignup } from "../protocols/userSignup";
import { generateToken } from "../../protocols/generateToken";

export class SignupRouter {
  constructor(
    private readonly emailValidator: emailValidator,
    private readonly verifyEmailAlreadyBeenUsed: verifyEmailAlreadyBeenUsed,
    private readonly insertUser: insertUser,
    private readonly encrypter: encrypter,
    private readonly generateToken: generateToken
  ) {}

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

    const isValid = this.emailValidator.isValid(email);
    if (!isValid)
      return HttpResponse.badRequest(new InvalidParamError("email"));

    const verify = await this.verifyEmailAlreadyBeenUsed.verify(email);
    if (verify) return HttpResponse.badRequest(new emailAlreadyUsed());

    const hashPassword = await this.encrypter.genHash(password);

    const user = await this.insertUser.save({
      email,
      firstName,
      lastName,
      password: hashPassword,
    });
    const accessToken = await this.generateToken.generate(user.id);

    return HttpResponse.ok({ accessToken, user });
  }
}

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
    private emailValidator: emailValidator,
    private verifyEmailAlreadyBeenUsed: verifyEmailAlreadyBeenUsed,
    private insertUser: insertUser,
    private encrypter: encrypter,
    private authUseCase: authUseCase
  ) {
    this.emailValidator = emailValidator;
    this.verifyEmailAlreadyBeenUsed = verifyEmailAlreadyBeenUsed;
    this.insertUser = insertUser;
    this.encrypter = encrypter;
  }

  async signup(body: userSignup) {
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
    return { accessToken, user };
  }
}

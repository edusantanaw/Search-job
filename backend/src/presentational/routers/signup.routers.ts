import { emailValidator } from "../../protocols/email-validator";
import { emailAlreayUsed } from "../../utils/errors/email-already-used-error";
import { HttpResponse } from "../../utils/errors/http-reponse";
import { InvalidParamError } from "../../utils/errors/invalid-param";
import { NotEqualError } from "../../utils/errors/not-equal-error";
import { insertUser } from "../protocols/InsertUser";
import { verifyEmailAlreadyBeenUsed } from "../protocols/VerifyEmailAlreadyBeenUsed";

interface user {
  email: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
  password: string;
}

export class SignupRouter {
  constructor(
    private emailValidator: emailValidator,
    private verifyEmailAlreadyBeenUsed: verifyEmailAlreadyBeenUsed,
    private insertUser: insertUser
  ) {
    this.emailValidator = emailValidator;
    this.verifyEmailAlreadyBeenUsed = verifyEmailAlreadyBeenUsed;
    this.insertUser = insertUser;
  }

  async signup({
    email,
    firstName,
    lastName,
    confirmPassword,
    password,
  }: user) {
    if (!email) return HttpResponse.badRequest(new InvalidParamError("email"));

    if (!firstName)
      return HttpResponse.badRequest(new InvalidParamError("first name"));

    if (!lastName)
      return HttpResponse.badRequest(new InvalidParamError("last name"));

    if (!password)
      return HttpResponse.badRequest(new InvalidParamError("password"));

    if (!confirmPassword)
      return HttpResponse.badRequest(new InvalidParamError("confirm password"));

    if (password !== confirmPassword)
      return HttpResponse.badRequest(new NotEqualError());

    const isValid = this.emailValidator.isValid(email);

    if (!isValid)
      return HttpResponse.badRequest(new InvalidParamError("email"));

    const verify = await this.verifyEmailAlreadyBeenUsed.verify(email);
    if (!verify) return HttpResponse.badRequest(new emailAlreayUsed());
    
    const user = await this.insertUser.save({
      email,
      firstName,
      lastName,
      password,
    });

    return;
  }
}

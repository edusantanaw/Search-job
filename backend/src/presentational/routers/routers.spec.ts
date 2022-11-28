import { HttpResponse } from "../helpers/http-reponse";
import { InvalidParamError } from "../errors/invalid-param";

export default class LoginRouter {
  constructor(private emailValidator: EmailValidatorSpy) {
    this.emailValidator = emailValidator;
  }

  async login(email: string, password: string) {
    if (email.length === 0)
      return HttpResponse.badRequest(new InvalidParamError("email"));
    if (!password)
      return HttpResponse.badRequest(new InvalidParamError("password"));
    if (!this.emailValidator.isValid(email))
      return HttpResponse.badRequest(new InvalidParamError("email"));
  }
}

class EmailValidatorSpy {
  email = "";
  isEmailValid = "";
  isValid(email: string) {
    this.email = email;
    return this.isEmailValid;
  }
}

const makeSut = () => {
  const loginRouter = new LoginRouter(new EmailValidatorSpy());
  const emailValidatorSpy = new EmailValidatorSpy();
  return { loginRouter, emailValidatorSpy };
};

describe("LoginRouter", () => {
  test("Should return a new error if a invalid email is provided  ", async () => {
    const { loginRouter } = makeSut();
    const response = await loginRouter.login("", "eduardo");
    expect(response?.statusCode).toBe(400);
    expect(response?.body.error).toBe(new InvalidParamError("email").message);
  });

  test("Should return a new error if an invalid password is provided ", async () => {
    const { loginRouter } = makeSut();
    const response = await loginRouter.login("valid_email@email.com", "");
    expect(response?.statusCode).toBe(400);
    expect(response?.body.error).toBe(
      new InvalidParamError("password").message
    );
  });

  test("Should return a new error if an invalid email is provided", async () => {
    const { loginRouter } = makeSut();
    const response = await loginRouter.login("invalid_email", "hello");
    expect(response?.statusCode).toBe(400);
    expect(response?.body.error).toBe(new InvalidParamError("email").message);
  });
});

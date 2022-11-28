import { HttpResponse } from "../helpers/http-reponse";
import { MissingParamError } from "../../utils/errors/missing-params-error";
import { InvalidParamError } from "../errors/invalid-param";

export default class LoginRouter {
  constructor(private emailValidator: EmailValidatorSpy) {
    this.emailValidator = emailValidator;
  }

  async login(email: string, password: string) {
    if (email.length === 0)
      return HttpResponse.badRequest(new MissingParamError("email"));
    if (!password)
      return HttpResponse.badRequest(new MissingParamError("password"));
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
  return { loginRouter };
};

describe("LoginRouter", () => {
  test("Should return a new error if a invalid email is provided  ", async () => {
    const { loginRouter } = makeSut();
    const response = await loginRouter.login("", "");
    expect(response?.statusCode).toBe(400);
    expect(response?.body.error).toBe(new MissingParamError("email").message);
  });

  test("Should return a new error if an invalid password is provided ", async () => {
    const { loginRouter } = makeSut();
    const response = await loginRouter.login("", "");
    expect(response?.statusCode).toBe(400);
  });
});

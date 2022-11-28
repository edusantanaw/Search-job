import { HttpResponse } from "../helpers/http-reponse";
import { MissingParamError } from "../../utils/errors/missing-params-error";

export default class LoginRouter {
  async login(email: string, password: string){
    if (email.length === 0)
      return HttpResponse.badRequest(new MissingParamError("email"));
    if (!password)
      return HttpResponse.badRequest(new MissingParamError("password"));
  }
}


const makeSut = () => {
  const loginRouter = new LoginRouter();
  return { loginRouter };
};

describe("LoginRouter", () => {
  test("Should return a new error if an email is not provided ", async () => {
    const { loginRouter } = makeSut();
    const response = await loginRouter.login("", "");
    expect(response?.statusCode).toBe(400);
  });
});

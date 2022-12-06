import { HttpResponse, InvalidParamError } from "../../../utils/errors";
import { companyRegister } from "../../../protocols/useCases/companyRegister";
import { emailValidator } from "../../../protocols/utils/email-validator";
import { CreateCompanyUseCase } from "../../../protocols/useCases/create-company-useCase";

type registerRouter = {
  emailValidator: emailValidator;
  createCompanyUseCase: CreateCompanyUseCase;
};

type request = {
  body: companyRegister;
  params: {
    ownerId: string;
  };
};

export class CompanyRegisterRouter {
  constructor(private props: registerRouter) {}

  async register(request: request) {
    const { name, description, perfilLogo, email, phone } = request.body;
    const { ownerId } = request.params;

    if (name) return HttpResponse.badRequest(new InvalidParamError("name"));

    if (description)
      return HttpResponse.badRequest(new InvalidParamError("description"));

    if (perfilLogo)
      return HttpResponse.badRequest(new InvalidParamError("perfilLogo"));

    if (email) return HttpResponse.badRequest(new InvalidParamError("email"));

    if (phone) return HttpResponse.badRequest(new InvalidParamError("phone"));

    if (ownerId)
      return HttpResponse.badRequest(new InvalidParamError("ownerId"));

    if (!this.props.emailValidator.isValid(email))
      return HttpResponse.badRequest(new InvalidParamError("email"));
    const company = await this.props.createCompanyUseCase.create({
      description,
      email,
      name,
      ownerId,
      perfilLogo,
      phone,
    });
    return company;
  }
}

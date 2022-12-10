import { HttpResponse, InvalidParamError } from "../../../utils/errors";
import { companyRegister } from "../../../domain/company-useCases/protocols/companyRegister";
import { emailValidator } from "../../../utils/protocols/email-validator";
import { CreateCompanyUseCase } from "../../../domain/company-useCases/protocols/create-company-useCase";
import { Controller } from "../../../utils/protocols/controller";

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

export class CompanyRegisterRouter implements Controller {
  constructor(private props: registerRouter) {}

  async handle(request: request) {
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
    return HttpResponse.ok({ company });
  }
}

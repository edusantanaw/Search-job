import { HttpResponse, InvalidParamError } from "../../../utils/errors";
import { companyRegister } from "../../../protocols/companyRegister";
import { emailValidator } from "../../../protocols/email-validator";
import { CreateCompanyUseCase } from "../../../protocols/create-company-useCase";

type registerRouter = {
  emailValidator: emailValidator;
  createCompanyUseCase: CreateCompanyUseCase;
};

export class CompanyRegisterRouter {
  constructor(private props: registerRouter) {}

  async route(body: companyRegister) {
    const { name, description, perfilLogo, email, phone, ownerId } = body;
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

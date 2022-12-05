import { HttpResponse, InvalidParamError } from "../../../utils/errors";
import {
  companyRegister,
  companyRepository,
} from "../../../protocols/companyRegister";
import { emailValidator } from "../../../protocols/email-validator";

type registerRouter = {
  companyRepository: companyRepository;
  emailValidator: emailValidator;
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

    const verifyIfEmail = await this.props.companyRepository.loadCompanyByEmail(
      email
    );
    if (verifyIfEmail)
      return HttpResponse.badRequest({
        message: "Email is already been used!",
      });

    const company = await this.props.companyRepository.save({
      name,
      description,
      perfilLogo,
      ownerId,
      email,
      phone,
    });

    return company;
  }
}

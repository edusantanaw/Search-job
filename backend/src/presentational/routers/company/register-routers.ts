import { HttpResponse, InvalidParamError } from "../../../utils/errors";
import {
  companyRegister,
  companyRepository,
} from "../../../protocols/companyRegister";

export class RegisterRouter {
  constructor(private readonly companyRepository: companyRepository) {}

  async route(body: companyRegister) {
    const { name, description, perfilLogo } = body;
    if (name) return HttpResponse.badRequest(new InvalidParamError("name"));

    if (description)
      return HttpResponse.badRequest(new InvalidParamError("description"));

    if (perfilLogo)
      return HttpResponse.badRequest(new InvalidParamError("perfilLogo"));

    const company = await this.companyRepository.save({
      name,
      description,
      perfilLogo,
    });

    return company;
  }
}

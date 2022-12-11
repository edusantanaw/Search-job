import { HttpResponse, InvalidParamError } from "../../../utils/errors";
import { emailValidator } from "../../../utils/protocols/email-validator";
import { CreateCompanyUseCase } from "../../../domain/company-useCases/protocols/create-company-useCase";
import { Controller } from "../../../utils/protocols/controller";

type registerRouter = {
  emailValidator: emailValidator;
  createCompanyUseCase: CreateCompanyUseCase;
};

type request = {
  id?: string;
  name: string;
  description: string;
  perfilLogo: string;
  email: string;
  phone: number;
  ownerId: string;
  req: {
    file: Express.Multer.File;
  };
};

export class CompanyRegisterRouter implements Controller {
  constructor(private props: registerRouter) {}

  async handle(request: request) {
    try {
      let { name, description, req, email, phone, ownerId } = request;
      const perfilLogo = req.file.filename;
      if (typeof phone === "string") phone = Number(phone);

      if (!name) return HttpResponse.badRequest(new InvalidParamError("name"));
      console.log(req.file);
      if (!description)
        return HttpResponse.badRequest(new InvalidParamError("description"));

      if (!perfilLogo)
        return HttpResponse.badRequest(new InvalidParamError("perfilLogo"));

      if (!email)
        return HttpResponse.badRequest(new InvalidParamError("email"));

      if (!phone)
        return HttpResponse.badRequest(new InvalidParamError("phone"));

      if (!ownerId)
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
    } catch (error) {
      console.log(error);
      return HttpResponse.catchError(error);
    }
  }
}

import { CreateCompanyUseCase } from "../../../domain/useCases/company/create-company-usecase";
import { CompanyRepository } from "../../../infra/repositores/company-repositore";
import { CompanyRegisterRouter } from "../../../presentational/routers/company/register-routers";
import { EmailValidator } from "../../../utils/helpers/email-validator";

export class CompanyRouterCompose {
  static compose() {
    const emailValidator = new EmailValidator();
    const companyRepository = new CompanyRepository();
    const createCompanyUseCase = new CreateCompanyUseCase(companyRepository);
    return new CompanyRegisterRouter({ emailValidator, createCompanyUseCase });
  }
}

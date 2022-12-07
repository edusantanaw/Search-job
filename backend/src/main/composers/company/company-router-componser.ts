import { CompanyUseCase } from "../../../domain/useCases/company/company-useCase";
import { CompanyRepository } from "../../../infra/repositores/company-repositore";
import { CompanyRegisterRouter } from "../../../presentational/routers/company/register-routers";
import { EmailValidator } from "../../../utils/helpers/email-validator";

export class CompanyRouterCompose {
  static compose() {
    const emailValidator = new EmailValidator();
    const companyRepository = new CompanyRepository();
    const createCompanyUseCase = new CompanyUseCase(companyRepository);
    return new CompanyRegisterRouter({ emailValidator, createCompanyUseCase });
  }
}

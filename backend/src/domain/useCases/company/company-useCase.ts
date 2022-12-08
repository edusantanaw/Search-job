import {
  companyRegister,
  companyRepository,
} from "../../../protocols/useCases/companyRegister";
import { HttpResponse, NotFoundError } from "../../../utils/errors";

export class CompanyUseCase {
  constructor(private companyRepository: companyRepository) {}

  async create(data: companyRegister) {
    const verifyIfEmail = await this.companyRepository.loadByEmail(data.email);
    if (verifyIfEmail)
      throw HttpResponse.badRequest({
        message: "Email is already been used!",
      });

    const company = await this.companyRepository.save({
      ...data,
    });
    return company;
  }

  async getById(id: string) {
    const company = await this.companyRepository.loadById(id);
    if (!company) return HttpResponse.badRequest(new NotFoundError("company"));
    return this.companyRepository;
  }
}

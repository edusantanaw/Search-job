import {
  companyRegister,
  companyRepository,
} from "./protocols/companyRegister";
import { HttpResponse } from "../../utils/errors";

export class CompanyUseCase {
  constructor(private companyRepository: companyRepository) {}

  async create(data: companyRegister) {
    const verifyIfEmail = await this.companyRepository.loadByEmail(data.email);
    if (verifyIfEmail)
      return HttpResponse.badRequest({
        message: "Email is already been used!",
      });

    const company = await this.companyRepository.save({
      ...data,
    });
    return company;
  }
}

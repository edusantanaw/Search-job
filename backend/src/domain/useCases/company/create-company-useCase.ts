import {
  companyRegister,
  companyRepository,
} from "../../../protocols/companyRegister";
import { HttpResponse } from "../../../utils/errors";

export class CreateCompanyUseCase {
  constructor(private companyRepository: companyRepository) {}

  async create(data: companyRegister) {
    const verifyIfEmail = await this.companyRepository.loadCompanyByEmail(
      data.email
    );
    if (verifyIfEmail)
      throw HttpResponse.badRequest({
        message: "Email is already been used!",
      });

    const company = await this.companyRepository.save({
      ...data,
    });
    return company;
  }
}

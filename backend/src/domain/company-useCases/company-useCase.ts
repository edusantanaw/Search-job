import { emailAlreadyUsed } from "../../utils/errors";
import {
  companyRegister,
  companyRepository,
} from "./protocols/companyRegister";

export class CompanyUseCase {
  constructor(private companyRepository: companyRepository) {}

  async create(data: any) {
    const verifyIfEmail = await this.companyRepository.loadByEmail(data.email);
    if (verifyIfEmail) throw new emailAlreadyUsed();

    const company = await this.companyRepository.save({
      ...data,
    });
    return company;
  }
}

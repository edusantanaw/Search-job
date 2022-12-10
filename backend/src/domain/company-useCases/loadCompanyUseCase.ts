import { NotFoundError } from "../../utils/errors/not-found";
import { companyRepository } from "./protocols/companyRegister";

export class LoadCompanyUseCase {
  constructor(private companyRepository: companyRepository) {}

  async loadById(id: string) {
    const company = await this.companyRepository.loadById(id);
    if (company) return company;
    throw new NotFoundError("company");
  }

  async loadAll() {
    const companys = await this.companyRepository.loadAll();
    if (companys) return companys;
    throw new NotFoundError("companys");
  }
}

import { HttpResponse } from "../../utils/errors";
import { NotFoundError } from "../../utils/errors/not-found";
import { companyRepository } from "./protocols/companyRegister";

export class LoadCompanyUseCase {
  constructor(private companyRepository: companyRepository) {}

  async loadById(id: string) {
    const company = await this.companyRepository.loadById(id);
    if (!company) return HttpResponse.badRequest(new NotFoundError("company"));
    return company;
  }

  async loadAll() {
    const company = await this.companyRepository.loadAll();
    if (!company) return HttpResponse.badRequest(new NotFoundError("companys"));
    return company;
  }
}

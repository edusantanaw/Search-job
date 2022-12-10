import { jobRepository } from "../../infra/repositores/protocols/job-repository";
import { NotFoundError } from "../../utils/errors/not-found";
import { companyRepository } from "../company-useCases/protocols/companyRegister";

export class JobUseCase {
  constructor(
    private jobRepository: jobRepository,
    private companyRepository: companyRepository
  ) {}

  async create(data: { vacancyFor: string; CompanyId: string }) {
    const { CompanyId } = data;
    const verifyCompanyExists = await this.companyRepository.loadById(
      CompanyId
    );
    if (!verifyCompanyExists) throw new NotFoundError("company");
    const vancacy = await this.jobRepository.create({
      ...data,
      openStatus: true,
    });
    return vancacy;
  }
}

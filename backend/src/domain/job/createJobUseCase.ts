import { jobRepository } from "../../infra/repositores/protocols/job-repository";

export class JobUseCase {
  constructor(private jobRepository: jobRepository) {}

  async create(data: { vacancyFor: string; CompanyId: string }) {
    const vancacy = await this.jobRepository.create({
      ...data,
      openStatus: true,
    });
    return vancacy;
  }
}

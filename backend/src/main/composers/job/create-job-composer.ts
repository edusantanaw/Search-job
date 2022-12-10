import { JobUseCase } from "../../../domain/job/createJobUseCase";
import { CompanyRepository } from "../../../infra/repositores/company-repositore";
import { JobRepository } from "../../../infra/repositores/job-repository";
import { CreateJobRouter } from "../../../presentational/routers/job/create-router";

export class CreateJobComposer {
  static compose() {
    const jobRepository = new JobRepository();
    const companyRepository = new CompanyRepository();
    const createJobUseCase = new JobUseCase(jobRepository, companyRepository);

    return new CreateJobRouter(createJobUseCase);
  }
}

import { JobUseCase } from "../../../domain/company-useCases/job-useCase";
import { JobRepository } from "../../../infra/repositores/job-repository";
import { JobRouter } from "../../../presentational/routers/company/job-routers";

export class JobRouterComposer {
  static compose() {
    const jobRepository = new JobRepository();
    const jobUseCase = new JobUseCase({ jobRepository });
    return new JobRouter({ jobUseCase });
  }
}

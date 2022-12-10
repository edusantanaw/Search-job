import { LoadJobUseCase } from "../../../domain/job/loadJobUseCase";
import { JobRepository } from "../../../infra/repositores/job-repository";
import { LoadJobByIdRouter } from "../../../presentational/routers/job/loadById-Router";

export class LoadJobByIdComposer {
  static compose() {
    const jobRepository = new JobRepository();
    const loadJobUseCase = new LoadJobUseCase(jobRepository);

    return new LoadJobByIdRouter(loadJobUseCase);
  }
}

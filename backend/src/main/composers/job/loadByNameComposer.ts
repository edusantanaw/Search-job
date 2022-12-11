import { LoadJobUseCase } from "../../../domain/job/loadJobUseCase";
import { JobRepository } from "../../../infra/repositores/job-repository";
import { LoadJobsByNameRouter } from "../../../presentational/routers/job/loadJobsByName";

export class LoadJobsByNameComposer {
  static compose() {
    const jobRepository = new JobRepository();
    const loadJobCase = new LoadJobUseCase(jobRepository);
    return new LoadJobsByNameRouter(loadJobCase);
  }
}

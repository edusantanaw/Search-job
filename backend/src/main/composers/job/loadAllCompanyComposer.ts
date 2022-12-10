import { LoadJobUseCase } from "../../../domain/job/loadJobUseCase";
import { JobRepository } from "../../../infra/repositores/job-repository";
import { LoadAllJobRouter } from "../../../presentational/routers/job/loadAllJobs";

export default class LoadAllJobsComposer {
  static compose() {
    const loadJobRepository = new JobRepository();
    const loadJobUseCase = new LoadJobUseCase(loadJobRepository);

    return new LoadAllJobRouter(loadJobUseCase);
  }
}

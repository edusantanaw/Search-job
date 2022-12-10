import { UpdateJobStatus } from "../../../domain/job/updateJobUseCase";
import { JobRepository } from "../../../infra/repositores/job-repository";
import { UpdateRouter } from "../../../presentational/routers/job/updateJobRouter";

export class UpdateJobComposer {
  static compose() {
    const jobRepository = new JobRepository();
    const updateJobUseCase = new UpdateJobStatus(jobRepository);
    return new UpdateRouter(updateJobUseCase);
  }
}

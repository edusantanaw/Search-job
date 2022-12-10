import { JobUseCase } from "../../../domain/job/createJobUseCase";
import { JobRepository } from "../../../infra/repositores/job-repository";
import { CreateJobRouter } from "../../../presentational/routers/job/create-router";

export class CreateJobComposer {
  static compose() {
    const jobRepository = new JobRepository();
    const createJobUseCase = new JobUseCase(jobRepository);

    return new CreateJobRouter(createJobUseCase);
  }
}

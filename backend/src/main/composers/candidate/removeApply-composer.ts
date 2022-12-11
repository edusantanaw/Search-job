import { ApplyForJobUseCase } from "../../../domain/candidate/applyForJobUseCase";
import { ApplyRepository } from "../../../infra/repositores/applyRepository";
import { JobRepository } from "../../../infra/repositores/job-repository";
import { UserRepository } from "../../../infra/repositores/user-repository";
import { RemoveApplyRouter } from "../../../presentational/routers/apply/removeApplyRouter";

export class RemoveApplyComposer {
  static compose() {
    const userRepository = new UserRepository();
    const jobRepository = new JobRepository();
    const applyRepository = new ApplyRepository();
    const applyForJobUseCase = new ApplyForJobUseCase(
      applyRepository,
      jobRepository,
      userRepository
    );
    return new RemoveApplyRouter(applyForJobUseCase);
  }
}

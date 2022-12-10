import { jobRepository } from "../../infra/repositores/protocols/job-repository";
import { HttpResponse } from "../../utils/errors";
import { NotFoundError } from "../../utils/errors/not-found";
import { updateJobUseCase } from "./protocols/ijob-useCase";

export class UpdateJobStatus implements updateJobUseCase {
  constructor(private jobRepository: jobRepository) {}

  async update(id: string, status: boolean) {
    const verifyExists = await this.jobRepository.getJobById(id);
    if (!verifyExists) return HttpResponse.badRequest(new NotFoundError("job"));
    const vacancy = await this.jobRepository.update(status, id);
    return vacancy;
  }
}

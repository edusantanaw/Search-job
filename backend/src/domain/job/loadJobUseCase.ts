import { jobRepository } from "../../infra/repositores/protocols/job-repository";
import { HttpResponse } from "../../utils/errors";
import { NotFoundError } from "../../utils/errors/not-found";

export class LoadJobUseCase {
  constructor(private jobRepository: jobRepository) {}

  async loadAll() {
    const vacancy = await this.jobRepository.getAll();
    if (!vacancy) return HttpResponse.badRequest(new NotFoundError("jobs"));
    return vacancy;
  }

  async loadById(id: string) {
    const vancacy = await this.jobRepository.getJobById(id);
    if (!vancacy) return HttpResponse.badRequest(new NotFoundError("vancacy"));
    return vancacy;
  }
}

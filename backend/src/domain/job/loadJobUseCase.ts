import { jobRepository } from "../../infra/repositores/protocols/job-repository";
import { NotFoundError } from "../../utils/errors/not-found";
import { loadJobUseCase } from "./protocols/ijob-useCase";

export class LoadJobUseCase implements loadJobUseCase {
  constructor(private jobRepository: jobRepository) {}

  async loadAll() {
    const vacancy = await this.jobRepository.getAll();
    if (vacancy) return vacancy;
    throw new NotFoundError("vacancys");
  }

  async loadById(id: string) {
    const vancacy = await this.jobRepository.getJobById(id);
    if (vancacy) return vancacy;
    throw new NotFoundError("vacancys");
  }

  async loadByName(name: string) {
    const jobs = await this.jobRepository.getJobsByName(name);
    if (!jobs) throw "Jobs not found!";
    return jobs;
  }
}

import { candidateRepository } from "../../infra/repositores/protocols/candidateRepo";
import { jobRepository } from "../../infra/repositores/protocols/job-repository";
import { userRepository } from "../../infra/repositores/protocols/UserRepository";
import { NotFoundError } from "../../utils/errors/not-found";
import { applyForJobUseCase } from "./protocols/apply-interface";

export class ApplyForJobUseCase implements applyForJobUseCase {
  constructor(
    private candidateRepository: candidateRepository,
    private jobRepository: jobRepository,
    private userRepository: userRepository
  ) {}

  async apply(userId: string, vacancyId: string) {
    const verifyUserExists = await this.userRepository.loadById(userId);

    if (!verifyUserExists) throw new NotFoundError("user");

    const verifyVacancyExists = await this.jobRepository.getJobById(vacancyId);
    if (!verifyVacancyExists) throw new NotFoundError("vacancy");
    const candidates = await this.candidateRepository.loadAll();

    const verifyUserAlreadyApply = candidates.map(
      (candidate) => candidate.candidateId === userId
    );
    if (verifyUserAlreadyApply.length > 0)
      throw "User Already applied for this vacancy!";

    await this.candidateRepository.save(userId, vacancyId);

    return "success";
  }
}

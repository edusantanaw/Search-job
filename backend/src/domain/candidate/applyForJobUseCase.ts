import { applyRepository } from "../../infra/repositores/protocols/applyRepo";
import { jobRepository } from "../../infra/repositores/protocols/job-repository";
import { userRepository } from "../../infra/repositores/protocols/UserRepository";
import { NotFoundError } from "../../utils/errors/not-found";
import { applyForJobUseCase } from "./protocols/apply-interface";

export class ApplyForJobUseCase implements applyForJobUseCase {
  constructor(
    private applyRepository: applyRepository,
    private jobRepository: jobRepository,
    private userRepository: userRepository
  ) {}

  async apply(userId: string, vacancyId: string) {
    const verifyUserExists = await this.userRepository.loadById(userId);

    if (!verifyUserExists) throw new NotFoundError("user");

    const verifyVacancyExists = await this.jobRepository.getJobById(vacancyId);

    if (!verifyVacancyExists) throw new NotFoundError("vacancy");
    const candidates = await this.applyRepository.loadAll(vacancyId);

    const verifyUserAlreadyApply = candidates.filter(
      (candidate) => candidate.candidateId === userId
    );
    if (verifyUserAlreadyApply.length > 0)
      throw "User Already applied for this vacancy!";

    await this.applyRepository.save(userId, vacancyId);

    return "success";
  }

  async removeApply(userId: string, vacancyId: string) {
    const verifyUserApply = await this.applyRepository.loadByUserIdAndVacancyId(
      userId,
      vacancyId
    );

    if (!verifyUserApply) throw "User is not applied in this vacancy!";

    await this.applyRepository.removeApply(verifyUserApply.id);

    return true;
  }
}

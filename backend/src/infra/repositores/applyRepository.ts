import { applyRepository } from "./protocols/applyRepo";
import { applyJob } from "../../prisma/client";

export class ApplyRepository implements applyRepository {
  async save(userId: string, vacancyId: string) {
    await applyJob.create({
      data: {
        candidateId: userId,
        jobId: vacancyId,
      },
    });
    return;
  }
  async loadAll(vacancyId: string) {
    const candidates = await applyJob.findMany({
      where: {
        jobId: vacancyId,
      },
    });
    return candidates;
  }

  async loadByUserIdAndVacancyId(userId: string, vacancyId: string) {
    const applied = await applyJob.findFirst({
      where: {
        candidateId: userId,
        jobId: vacancyId,
      },
    });
    return applied;
  }

  async removeApply(applyId: string) {
    await applyJob.delete({
      where: {
        id: applyId,
      },
    });
    return;
  }
}

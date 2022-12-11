import { candidateRepository } from "./repositores/protocols/candidateRepo";
import { applyJob } from "../prisma/client";

export class CandidateRepository implements candidateRepository {
  async save(userId: string, vacancyId: string) {
    await applyJob.create({
      data: {
        candidateId: userId,
        jobId: vacancyId,
      },
    });
    return;
  }
  async loadAll() {
    const candidates = await applyJob.findMany();
    return candidates;
  }
}

import { ApplyJob } from "@prisma/client";

export interface loadCandidatesUseCase {
  loadCandidates: (vacancyId: string) => Promise<ApplyJob[]>;
}

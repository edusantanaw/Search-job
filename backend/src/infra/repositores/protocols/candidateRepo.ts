import { ApplyJob } from "@prisma/client";

export interface candidateRepository {
  save: (userId: string, vacancyId: string) => Promise<void>;
  loadAll: () => Promise<ApplyJob[]>;
}

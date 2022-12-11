import { ApplyJob } from "@prisma/client";

export interface applyRepository {
  save: (userId: string, vacancyId: string) => Promise<void>;
  loadAll: (vacancyId: string) => Promise<ApplyJob[]>;
  removeApply: (applyId: string) => Promise<void>;
  loadByUserIdAndVacancyId: (
    userId: string,
    vacancyId: string
  ) => Promise<ApplyJob | null>;
}

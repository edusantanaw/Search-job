import { ApplyJob } from "@prisma/client";

export interface applyRepository {
  save: (userId: string, vacancyId: string) => Promise<void>;
  loadAll: () => Promise<ApplyJob[]>;
  removeApply: (applyId: string) => Promise<void>;
  loadByUserIdAndVacancyId: (
    userId: string,
    vacancyId: string
  ) => Promise<ApplyJob | null>;
}

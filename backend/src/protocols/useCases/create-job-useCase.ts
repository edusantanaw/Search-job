import { Job } from "@prisma/client";

export interface createJobUseCase {
  create: (data: { vacancyFor: string; CompanyId: string }) => Promise<Job>;
}

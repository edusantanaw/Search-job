import { Job } from "@prisma/client";

export interface jobUseCase {
  create: (data: { vacancyFor: string; CompanyId: string }) => Promise<Job>;
}

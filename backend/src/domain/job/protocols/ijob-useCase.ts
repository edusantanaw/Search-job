import { Job } from "@prisma/client";

export interface createJobUseCase {
  create: (data: { vacancyFor: string; CompanyId: string }) => Promise<Job>;
}

export interface loadJobUseCase {
  loadById: (id: string) => Promise<Job | null>;
  loadAll: () => Promise<Job[] | null>;
}

export interface updateJobUseCase {
  update: (
    id: string,
    status: boolean
  ) => Promise<Job | { statusCode: number; body: any } | null>;
}

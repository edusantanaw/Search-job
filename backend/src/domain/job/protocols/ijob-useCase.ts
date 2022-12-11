import { Job } from "@prisma/client";

export interface createJobUseCase {
  create: (data: { vacancyFor: string; CompanyId: string }) => Promise<Job>;
}

export interface loadJobUseCase {
  loadById: (id: string) => Promise<Job | null>;
  loadAll: () => Promise<Job[]>;
  loadByName: (name: string) => Promise<Job[]>;
}

export interface updateJobUseCase {
  update: (
    id: string,
    status: boolean
  ) => Promise<Job | { statusCode: number; body: any } | null>;
}

import { Job } from "@prisma/client";

export interface jobUseCase {
  create: (data: { vacancyFor: string; CompanyId: string }) => Promise<Job>;
  getAll: () => Promise<Job[]>;
  getById: (id: string) => Promise<Job>;
  update: ({
    id,
    status,
  }: {
    id: string;
    status: boolean;
  }) => Promise<Job | null>;
}

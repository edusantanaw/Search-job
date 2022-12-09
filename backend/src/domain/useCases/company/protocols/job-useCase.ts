import { Job } from "@prisma/client";

export interface jobUseCase {
  create: (data: { vancacyFor: string; CompanyId: string }) => Promise<Job>;
  getAllVancacy: () => Promise<Job[]>;
  getById: (id: string) => Promise<Job>;
  update: ({
    id,
    status,
  }: {
    id: string;
    status: boolean;
  }) => Promise<Job | null>;
}

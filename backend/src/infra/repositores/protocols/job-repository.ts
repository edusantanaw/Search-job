import { Job } from "@prisma/client";

export type jobParams = {
  vacancyFor: string;
  CompanyId: string;
  openStatus: boolean;
};

export interface jobRepository {
  create: (data: jobParams) => Promise<Job>;
  getJobById: (id: string) => Promise<Job | null>;
  getJobsByName: (name: string) => Promise<Job[] | null>;
  update: (status: boolean, id: string) => Promise<Job | null>;
  getAll: () => Promise<Job[] | null>;
}

import { Job } from "@prisma/client";

export type jobParams = {
    vacancyFor: string;
    CompanyId: string;
  }
  
  export interface jobRepository {
      create: (data: jobParams) => Promise<Job>
      getJobById: (id: string) => Promise<Job>
      getJobsByName: (name: string) => Promise<Job[]>
  }
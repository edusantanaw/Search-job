import { Job } from "@prisma/client";
import { client, job } from "../../prisma/client";
import { jobParams, jobRepository } from "./protocols/job-repository";

export class JobRepository implements jobRepository {
  async create(data: jobParams) {
    const vacancy = await job.create({
      data: data,
    });
    return vacancy;
  }

  async getJobById(id: string) {
    const vancacy: Job[] = await client.$queryRaw`
        select * from "Job" 
        inner join "Company" on  "Company".id = "Job"."CompanyId"
        where "Job".id = ${id};
    `;
    if (!vancacy) return null;
    return vancacy[0];
  }

  async getJobsByName(name: string) {
    const vancacys: Job[] = await client.$queryRaw`
        select * from job
        inner join company on company.id = job."CompanyId"
        where vacancyFor like ${`%${name}%`}; 
    `;

    if (vancacys.length === 0) return null;
    return vancacys;
  }

  async update(status: boolean, id: string) {
    const updatedVancacy = await job.update({
      where: {
        id: id,
      },
      data: {
        openStatus: status,
      },
    });
    return updatedVancacy;
  }

  async getAll() {
    const vancacys = await job.findMany();
    return vancacys;
  }
}

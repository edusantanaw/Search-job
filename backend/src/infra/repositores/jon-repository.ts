import { client, job } from "../../prisma/client";
import { jobParams } from "../../protocols/repositorys/job-repository";

export class JobRepository {
  async create(data: jobParams) {
    const vacancy = await job.create({
      data: data,
    });
    return vacancy;
  }

  async getJobById(id: string) {
    const vancacy = await client.$queryRaw`
        select * from job 
        inner join company.id = job."CompanyId"
        where id = ${id};
    `;
    return vancacy;
  }

  async getJobsByName(name: string) {
    const vancacys = await client.$queryRaw`
        select * from job
        inner join company on company.id = job."CompanyId"
        where vacancyFor like ${`%${name}%`}; 
    `;
    return vancacys;
  }
}

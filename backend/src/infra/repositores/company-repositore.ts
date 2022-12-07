import { Company } from "@prisma/client";
import { company, client } from "../../prisma/client";
import { companyRegister } from "../../protocols/useCases/companyRegister";

export class CompanyRepository {
  async save(data: companyRegister) {
    const companyResponse = await company.create({
      data: data,
    });
    return companyResponse;
  }

  async loadById(id: string) {
    const companyResponse = await company.findFirst({
      where: {
        id: id,
      },
    });
    return companyResponse;
  }

  async searchByName(name: string) {
    const companyResponse: Company = await client.$queryRaw`
        select * from company
        where name like ${`%${name}%`}
    `;
    return companyResponse;
  }

  async loadByEmail(email: string) {
    const companyResponse = await company.findFirst({
      where: {
        email: email,
      },
    });
    if (companyResponse) return companyResponse;
    return null;
  }
}

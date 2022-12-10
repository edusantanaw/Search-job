import { Company } from "@prisma/client";
import { company, client } from "../../prisma/client";
import {
  companyRegister,
  companyRepository,
} from "../../domain/company-useCases/protocols/companyRegister";

export class CompanyRepository implements companyRepository {
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

  async loadAll() {
    const companys = await company.findMany();
    return companys;
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

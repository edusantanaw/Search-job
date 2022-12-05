import { Company } from "@prisma/client";
import { companyRegister } from "./companyRegister";

export interface CreateCompanyUseCase {
  create: (data: companyRegister) => Promise<Company>;
}

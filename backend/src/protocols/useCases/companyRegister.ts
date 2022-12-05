import { Company } from "@prisma/client";

export interface companyRegister {
  id?: string;
  name: string;
  description: string;
  perfilLogo: string;
  email: string;
  phone: number;
  ownerId: string;
}

export interface companyRepository {
  save: (data: companyRegister) => Promise<Company>;
  loadCompanyById: (id: string) => Promise<Company | null>;
  searchCompanyByName: (name: string) => Promise<Company | null>;
  loadCompanyByEmail: (email: string) => Promise<Company | null>;
}

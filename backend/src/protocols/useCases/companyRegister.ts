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
  loadById: (id: string) => Promise<Company | null>;
  searchByName: (name: string) => Promise<Company | null>;
  loadByEmail: (email: string) => Promise<Company | null>;
}

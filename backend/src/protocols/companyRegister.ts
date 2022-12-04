export interface companyRegister {
  id?: string;
  name: string;
  description: string;
  perfilLogo: string;
}

export interface companyRepository {
  save: (data: companyRegister) => Promise<companyRegister>;
  loadCompanyById: (id: string) => Promise<companyRegister>;
  searchCompanyByName: (name: string) => Promise<companyRegister>;
}

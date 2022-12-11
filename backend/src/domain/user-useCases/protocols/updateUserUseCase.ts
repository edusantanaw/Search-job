import { User } from "@prisma/client";

export interface data {
  id: string;
  req?: {
    file: Express.Multer.File;
  };
  city: string | null;
  password?: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: number | null;
  perfilPhoto: string | null;
}

export interface updateUserUseCase {
  update: (data: data) => Promise<User>;
}

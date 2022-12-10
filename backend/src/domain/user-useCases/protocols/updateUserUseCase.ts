import { User } from "@prisma/client";

export interface data {
  id: string;
  file?: Express.Multer.File;
  city?: string;
  password?: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: number | null;
  perfilPhoto?: string;
}

export interface updateUserUseCase {
  update: (data: data) => Promise<User>;
}

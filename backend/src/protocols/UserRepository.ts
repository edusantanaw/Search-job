export type user = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export interface User extends user {
  id?: string;
  phoneNumber?: string | null;
  perfilPhoto?: string | null;
}

export interface userRepository {
  loadByEmail: (email: string) => Promise<User | null>;
  save: (data: user) => Promise<User>;
}

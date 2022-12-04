export type userRepository = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export interface User extends userRepository {
  id?: string;
  phoneNumber?: string | null;
  perfilPhoto?: string | null;
}

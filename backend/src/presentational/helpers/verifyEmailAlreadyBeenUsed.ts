import { userRepository } from "../../infra/repositores/protocols/UserRepository";

export class VerifyEmailAlreadyBeenUsed {
  constructor(private loadUserRepository: userRepository) {
    this.loadUserRepository = loadUserRepository;
  }
  async verify(email: string) {
    const user = await this.loadUserRepository.loadByEmail(email);
    if (user) return user;
    return null;
  }
}

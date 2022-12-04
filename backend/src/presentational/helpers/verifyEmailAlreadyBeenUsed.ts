import { loadUserRepository } from "../../protocols/UserRepository";

export class VerifyEmailAlreadyBeenUsed {
  constructor(private loadUserRepository: loadUserRepository) {
    this.loadUserRepository = loadUserRepository;
  }
  async verify(email: string) {
    const user = await this.loadUserRepository.load(email);
    if (user) return user;
    return null;
  }
}

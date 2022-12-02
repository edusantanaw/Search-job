import { LoadUserRepository } from "../../infra/repositores/load-user-repository";

const loadUserRepository = new LoadUserRepository();

export class VerifyEmailAlreadyBeenUsed {
  async verify(email: string) {
    const user = await loadUserRepository.load(email);
    if (user) return user;
    return null;
  }
}

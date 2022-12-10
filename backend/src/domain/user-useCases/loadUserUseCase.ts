import { userRepository } from "../../infra/repositores/protocols/UserRepository";

export class LoadUserUseCase {
  constructor(private userRepository: userRepository) {}
  async loadById(id: string) {
    const user = this.userRepository.loadById(id);
    return user;
  }

  async loadAll() {
    const users = this.userRepository.loadAll();
    return users;
  }
}

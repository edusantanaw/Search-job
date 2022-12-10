import { userRepository } from "../../infra/repositores/protocols/UserRepository";
import { NotFoundError } from "../../utils/errors/not-found";
import { loadUserUseCase } from "./protocols/loadUserUseCase";

export class LoadUserUseCase implements loadUserUseCase {
  constructor(private userRepository: userRepository) {}
  async loadById(id: string) {
    const user = await this.userRepository.loadById(id);
    if (!user) throw new NotFoundError("user");
    return user;
  }

  async loadAll() {
    const users = await this.userRepository.loadAll();
    if (users.length === 0) throw new NotFoundError("users");
    return users;
  }
}

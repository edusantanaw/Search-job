import { LoadUserUseCase } from "../../../domain/user-useCases/loadUserUseCase";
import { UserRepository } from "../../../infra/repositores/user-repository";
import { LoadUserByIdRouter } from "../../../presentational/routers/user/loadUserById-Router";

export class LoadUserByIdComposer {
  static compose() {
    const userRepository = new UserRepository();
    const loadUserUseCase = new LoadUserUseCase(userRepository);
    return new LoadUserByIdRouter(loadUserUseCase);
  }
}

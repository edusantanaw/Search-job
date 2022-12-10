import { LoadUserUseCase } from "../../../domain/user-useCases/loadUserUseCase";
import { UserRepository } from "../../../infra/repositores/user-repository";
import { LoadAllUserRouter } from "../../../presentational/routers/user/loadAllRouter";

export class LoadAllUsersComposer {
  static compose() {
    const userRepository = new UserRepository();
    const loadUserUseCase = new LoadUserUseCase(userRepository);
    return new LoadAllUserRouter(loadUserUseCase);
  }
}

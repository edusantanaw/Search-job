import { UpdateUserUseCase } from "../../../domain/user-useCases/updateUserUseCase";
import { UserRepository } from "../../../infra/repositores/user-repository";
import { VerifyEmailAlreadyBeenUsed } from "../../../presentational/helpers/verifyEmailAlreadyBeenUsed";
import { UpdateUserRoutes } from "../../../presentational/routers/user/updateUser-routers";

export class UpdateUserComposer {
  static compose() {
    const userRepository = new UserRepository();
    const verifyEmailAlreadyBeignUsed = new VerifyEmailAlreadyBeenUsed(
      userRepository
    );
    const updateUserUseCase = new UpdateUserUseCase(
      userRepository,
      verifyEmailAlreadyBeignUsed
    );
    return new UpdateUserRoutes(updateUserUseCase);
  }
}

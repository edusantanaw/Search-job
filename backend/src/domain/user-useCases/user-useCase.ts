import { verifyEmailAlreadyBeenUsed } from "../../presentational/helpers/protocols/VerifyEmailAlreadyBeenUsed";
import { encrypter } from "../../utils/protocols/encrypter";
import { generateToken } from "../../utils/protocols/generateToken";
import {
  User,
  userRepository,
} from "../../infra/repositores/protocols/UserRepository";
import {
  emailAlreadyUsed,
  HttpResponse,
  NotFoundError,
} from "../../utils/errors";

import { IUserUseCase } from "./protocols/user-usecase";
type props = {
  userRepository: userRepository;
  encrypter: encrypter;
  generateToken: generateToken;
  verifyEmailAlreadyBeenUsed: verifyEmailAlreadyBeenUsed;
};

export class UserUseCase implements IUserUseCase {
  constructor(private props: props) {}

  async create(data: User) {
    const verify = await this.props.verifyEmailAlreadyBeenUsed.verify(
      data.email
    );
    if (verify) throw HttpResponse.badRequest(new emailAlreadyUsed());

    const hashPassword = await this.props.encrypter.genHash(data.password);
    data.password = hashPassword;
    const user = await this.props.userRepository.save(data);

    const accessToken = this.props.generateToken.generate(user.id || "");

    return { user, accessToken };
  }

  async loadById(id: string) {
    const user = this.props.userRepository.loadById(id);
    return user;
  }

  async loadAll() {
    const users = this.props.userRepository.loadAll();
    return users;
  }

  async update(userRequest: User) {
    if (userRequest.id) {
      const verifyUserExists = await this.props.userRepository.loadById(
        userRequest.id
      );
      if (!verifyUserExists)
        throw HttpResponse.badRequest(new NotFoundError("user"));

      if (userRequest.email !== verifyUserExists.email) {
        const verify = await this.props.verifyEmailAlreadyBeenUsed.verify(
          userRequest.email
        );
        if (!verify) return HttpResponse.badRequest(new emailAlreadyUsed());
      }
      const userUpdated = await this.props.userRepository.update(userRequest);
      return userUpdated;
    }
    return null;
  }
}

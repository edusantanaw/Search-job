import { verifyEmailAlreadyBeenUsed } from "../../../presentational/protocols/VerifyEmailAlreadyBeenUsed";
import { encrypter } from "../../../protocols/utils/encrypter";
import { generateToken } from "../../../protocols/utils/generateToken";
import {
  User,
  userRepository,
} from "../../../protocols/repositorys/UserRepository";
import {
  emailAlreadyUsed,
  HttpResponse,
  NotFoundError,
} from "../../../utils/errors";

type createUser = {
  userRepository: userRepository;
  encrypter: encrypter;
  generateToken: generateToken;
  verifyEmailAlreadyBeenUsed: verifyEmailAlreadyBeenUsed;
};

export class UserUseCase {
  constructor(private props: createUser) {}

  async create(data: User) {
    const verify = await this.props.verifyEmailAlreadyBeenUsed.verify(
      data.email
    );
    if (verify) throw HttpResponse.badRequest(new emailAlreadyUsed());

    const hashPassword = await this.props.encrypter.genHash(data.password);
    data.password = hashPassword;
    const user = await this.props.userRepository.save({
      ...data,
    });

    const accessToken = this.props.generateToken.generate(user.id || "");

    return { user, accessToken };
  }

  async loadById(id: string) {
    const user = this.props.userRepository.loadById(id);
    return user;
  }

  async getAll() {
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

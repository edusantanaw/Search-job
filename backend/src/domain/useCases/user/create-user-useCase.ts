import { verifyEmailAlreadyBeenUsed } from "../../../presentational/protocols/VerifyEmailAlreadyBeenUsed";
import { encrypter } from "../../../protocols/utils/encrypter";
import { generateToken } from "../../../protocols/utils/generateToken";
import { User, userRepository } from "../../../protocols/repositorys/UserRepository";
import { emailAlreadyUsed, HttpResponse } from "../../../utils/errors";

type createUser = {
  userRepository: userRepository;
  encrypter: encrypter;
  generateToken: generateToken;
  verifyEmailAlreadyBeenUsed: verifyEmailAlreadyBeenUsed;
};

export class CreateUserUseCase {
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
}

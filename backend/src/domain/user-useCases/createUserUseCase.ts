import { verifyEmailAlreadyBeenUsed } from "../../presentational/helpers/protocols/VerifyEmailAlreadyBeenUsed";
import { encrypter } from "../../utils/protocols/encrypter";
import { generateToken } from "../../utils/protocols/generateToken";
import {
  IUser,
  userRepository,
} from "../../infra/repositores/protocols/UserRepository";
import { emailAlreadyUsed } from "../../utils/errors";

type props = {
  userRepository: userRepository;
  encrypter: encrypter;
  generateToken: generateToken;
  verifyEmailAlreadyBeenUsed: verifyEmailAlreadyBeenUsed;
};

export class CreateUseCase {
  constructor(public props: props) {}

  async create(data: IUser) {
    const verify = await this.props.verifyEmailAlreadyBeenUsed.verify(
      data.email
    );
    console.log(verify);
    if (verify) throw new emailAlreadyUsed();

    const hashPassword = await this.props.encrypter.genHash(data.password);
    data.password = hashPassword;
    const user = await this.props.userRepository.save(data);

    if (user.id) {
      const accessToken = this.props.generateToken.generate(user.id);
      return { user, accessToken };
    }
  }
}

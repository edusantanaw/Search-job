import { encrypter } from "../../utils/protocols/encrypter";
import { generateToken } from "../../utils/protocols/generateToken";
import { userRepository } from "../../infra/repositores/protocols/UserRepository";

export interface signinUseCase {
  auth: (email: string, password: string) => Promise<string>;
}

export class SigninUseCase implements signinUseCase {
  constructor(
    public loadUserRepository: userRepository,
    public encrypter: encrypter,
    public generateToken: generateToken
  ) {
    this.loadUserRepository = loadUserRepository;
    this.encrypter = encrypter;
    this.generateToken = generateToken;
  }

  async auth(email: string, password: string) {
    const user = await this.loadUserRepository.loadByEmail(email);
    console.log(user);
    if (!user) throw "User not found!";

    const isValid = await this.encrypter.compare(password, user.password);

    if (!isValid) throw "Email/password is invalid!";
    const accessToken = this.generateToken.generate(user.id ? user.id : "");

    return accessToken;
  }
}

import { NotFoundError } from "../../../utils/errors/not-found";
import { encrypter } from "../../../utils/protocols/encrypter";
import { generateToken } from "../../../utils/protocols/generateToken";
import { userRepository } from "../../../infra/repositores/protocols/repositorys/UserRepository";
import { HttpResponse } from "../../../utils/errors/http-reponse";

interface authUseCase {
  loadUserRepository: userRepository;
  encrypter: encrypter;
  generateToken: generateToken;
}

export class AuthUseCase implements authUseCase {
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

    if (!user) return HttpResponse.notFound(new NotFoundError("User"));

    const isValid = await this.encrypter.compare(password, user.password);

    if (!isValid)
      return HttpResponse.badRequest({ message: "Email/password is invalid!" });

    const accessToken = this.generateToken.generate(user.id ? user.id : "");

    return accessToken;
  }
}

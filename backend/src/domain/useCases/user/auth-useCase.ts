import { NotFoundError } from "../../../utils/errors/not-found";
import { encrypter } from "../../../protocols/encrypter";
import { generateToken } from "../../../protocols/generateToken";
import { userRepository } from "../../../protocols/UserRepository";
import { HttpResponse } from "../../../utils/errors/http-reponse";

export class AuthUseCase {
  constructor(
    private loadUserRepository: userRepository,
    private encrypter: encrypter,
    private generateToken: generateToken
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

    const accessToken =  this.generateToken.generate(user.id ? user.id: "" );

    return accessToken;
  }
}

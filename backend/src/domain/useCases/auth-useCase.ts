import { NotFoundError } from "@prisma/client/runtime";
import { encrypter } from "../../protocols/encrypter";
import { generateToken } from "../../protocols/generateToken";
import { loadUserRepository } from "../../protocols/LoadUserRepository";
import { HttpResponse } from "../../utils/errors/http-reponse";

export class AuthUseCase {
  constructor(
    private loadUserRepository: loadUserRepository,
    private encrypter: encrypter,
    private generateToken: generateToken
  ) {
    this.loadUserRepository = loadUserRepository;
    this.encrypter = encrypter;
    this.generateToken = generateToken;
  }

  async auth(email: string, password: string) {
    const user = await this.loadUserRepository.load(email);
    if (!user) throw HttpResponse.notFound(new NotFoundError("User"));
    const isValid = await this.encrypter.compare(password, user.password);
    if (isValid) {
      const accessToken = await this.generateToken.generate(user.id);
      return accessToken;
    }
    return null;
  }
}

import { NotFoundError } from "@prisma/client/runtime";
import { LoadUserRepository } from "../../infra/repositores/load-user-repository";
import { HttpResponse } from "../../utils/errors/http-reponse";
import { Encrypter } from "../../utils/helpers/encrypter";
import { GenerateToken } from "../../utils/helpers/token-generate";

export class AuthUseCase {
  constructor(
    private loadUserRepository: LoadUserRepository,
    private encrypter: Encrypter,
    private generateToken: GenerateToken
  ) {
    this.loadUserRepository = loadUserRepository;
    this.encrypter = encrypter;
    this.generateToken = generateToken
  }

  async auth(email: string, password: string) {
    const user = await this.loadUserRepository.load(email);
    if (!user) throw HttpResponse.notFound(new NotFoundError("User"));
    const isValid = await this.encrypter.compare(password, user.password);
    if(isValid){
        const accessToken = await this.generateToken.generate(user.id)
        return accessToken
    }
    return null
  }
}

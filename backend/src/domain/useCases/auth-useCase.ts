import { NotFoundError } from "@prisma/client/runtime";
import { LoadUserRepository } from "../../infra/repositores/load-user-repository";
import { HttpResponse } from "../../utils/errors/http-reponse";

export class AuthUseCase{

    constructor(private loadUserRepository: LoadUserRepository){
        this.loadUserRepository = loadUserRepository
    }

    async auth (email: string, password: string){
            const user = await this.loadUserRepository.load(email)
            if(!user) throw  HttpResponse.notFound(new NotFoundError("User"))
    }
}
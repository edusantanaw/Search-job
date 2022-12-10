import { loadUserUseCase } from "../../../domain/user-useCases/protocols/loadUserUseCase";
import { HttpResponse, InvalidParamError } from "../../../utils/errors";
import { NotFoundError } from "../../../utils/errors/not-found";
import { Controller } from "../../../utils/protocols/controller";

export class LoadUserByIdRouter implements Controller {
  constructor(private loadUserUseCase: loadUserUseCase) {}
  async handle(req: { id: string }) {
    try {
      const { id } = req;
      if (!id) return HttpResponse.badRequest(new InvalidParamError("id"));

      const user = await this.loadUserUseCase.loadById(id);
      if (!user) return HttpResponse.badRequest(new NotFoundError("user"));

      return HttpResponse.ok({ user });
    } catch (error) {
      return HttpResponse.catchError(error);
    }
  }
}

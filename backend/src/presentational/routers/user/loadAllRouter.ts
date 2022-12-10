import { loadUserUseCase } from "../../../domain/user-useCases/protocols/loadUserUseCase";
import { HttpResponse } from "../../../utils/errors";
import { NotFoundError } from "../../../utils/errors/not-found";
import { Controller } from "../../../utils/protocols/controller";

export class LoadAllRouter implements Controller {
  constructor(private loadUserUseCase: loadUserUseCase) {}

  async handle() {
    const users = await this.loadUserUseCase.loadAll();
    if (!users) return HttpResponse.badRequest(new NotFoundError("users"));
    return HttpResponse.ok({ users });
  }
}

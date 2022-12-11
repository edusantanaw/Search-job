import { loadJobUseCase } from "../../../domain/job/protocols/ijob-useCase";
import {
  HttpResponse,
  InvalidParamError,
  NotFoundError,
} from "../../../utils/errors";
import { Controller } from "../../../utils/protocols/controller";

export class LoadJobByIdRouter implements Controller {
  constructor(private loadJobUseCase: loadJobUseCase) {}

  async handle(req: { id: string }) {
    try {
      const { id } = req;
      console.log(id);
      if (!id) return HttpResponse.badRequest(new InvalidParamError("id"));
      const vacancy = await this.loadJobUseCase.loadById(id);
      if (!vacancy)
        return HttpResponse.badRequest(new NotFoundError("vacancy"));
      return HttpResponse.ok({ vacancy });
    } catch (error) {
      return HttpResponse.catchError(error);
    }
  }
}

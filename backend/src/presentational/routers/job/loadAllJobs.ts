import { loadJobUseCase } from "../../../domain/job/protocols/ijob-useCase";
import { HttpResponse } from "../../../utils/errors";
import { Controller } from "../../../utils/protocols/controller";

export class LoadAllJobRouter implements Controller {
  constructor(private loadUserUseCase: loadJobUseCase) {}

  async handle() {
    try {
      const vancacy = await this.loadUserUseCase.loadAll();
      return HttpResponse.ok({ vancacy });
    } catch (error) {
      return HttpResponse.catchError(error);
    }
  }
}

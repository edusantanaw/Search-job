import { loadJobUseCase } from "../../../domain/job/protocols/ijob-useCase";
import { HttpResponse } from "../../../utils/errors";
import { Controller } from "../../../utils/protocols/controller";

export class LoadJobRouter implements Controller {
  constructor(private loadUserUseCase: loadJobUseCase) {}

  async handle() {
    const vancacy = await this.loadUserUseCase.loadAll();
    return HttpResponse.ok({ vancacy });
  }
}

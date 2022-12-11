import { updateJobUseCase } from "../../../domain/job/protocols/ijob-useCase";
import { HttpResponse, InvalidParamError } from "../../../utils/errors";
import { NotFoundError } from "../../../utils/errors/not-found";
import { Controller } from "../../../utils/protocols/controller";
import { data } from "../../../utils/protocols/jobRequest";

export class UpdateRouter implements Controller {
  constructor(private updateJobUseCase: updateJobUseCase) {}

  async handle(data: data) {
    try {
      const { id, status } = data;
      console.log(status);
      if (status === undefined || status === null)
        return HttpResponse.badRequest(new InvalidParamError("status"));

      if (!id) return HttpResponse.badRequest(new InvalidParamError("id"));

      const job = await this.updateJobUseCase.update(id, status);
      if (!job) return HttpResponse.notFound(new NotFoundError("job"));
      return HttpResponse.ok({ job });
    } catch (error) {
      return HttpResponse.catchError(error);
    }
  }
}

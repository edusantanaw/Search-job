import { createJobUseCase } from "../../../domain/job/protocols/ijob-useCase";
import { HttpResponse, InvalidParamError } from "../../../utils/errors";
import { Controller } from "../../../utils/protocols/controller";
import { data } from "../../../utils/protocols/jobRequest";

export class CreateJobRouter implements Controller {
  constructor(private createJobUseCase: createJobUseCase) {}

  async handle(data: { vacancyFor: string; CompanyId: string }) {
    const { vacancyFor, CompanyId } = data;

    if (!vacancyFor)
      return HttpResponse.badRequest(new InvalidParamError("vacancyFor"));

    if (!CompanyId)
      return HttpResponse.badRequest(new InvalidParamError("vacancyFor"));

    const vancacy = await this.createJobUseCase.create({
      vacancyFor,
      CompanyId,
    });
    return HttpResponse.ok({ vancacy });
  }
}

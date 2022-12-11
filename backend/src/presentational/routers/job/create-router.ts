import { createJobUseCase } from "../../../domain/job/protocols/ijob-useCase";
import { HttpResponse, InvalidParamError } from "../../../utils/errors";
import { Controller } from "../../../utils/protocols/controller";

export class CreateJobRouter implements Controller {
  constructor(private createJobUseCase: createJobUseCase) {}

  async handle(data: { vacancyFor: string; CompanyId: string }) {
    try {
      const { vacancyFor, CompanyId } = data;
      console.log(vacancyFor);

      if (!vacancyFor)
        return HttpResponse.badRequest(new InvalidParamError("vacancyFor"));

      if (!CompanyId)
        return HttpResponse.badRequest(new InvalidParamError("CompanyId"));

      const vancacy = await this.createJobUseCase.create({
        vacancyFor,
        CompanyId,
      });
      return HttpResponse.ok({ vancacy });
    } catch (error) {
      return HttpResponse.catchError(error);
    }
  }
}

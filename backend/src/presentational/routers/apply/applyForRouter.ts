import { applyForJobUseCase } from "../../../domain/candidate/protocols/apply-interface";
import { HttpResponse, InvalidParamError } from "../../../utils/errors";
import { Controller } from "../../../utils/protocols/controller";

export class ApplyForJobRouter implements Controller {
  constructor(private applyForJobUseCase: applyForJobUseCase) {}

  async handle(req: { userId: string; vacancyId: string }) {
    try {
      const { userId, vacancyId } = req;
      if (!userId)
        return HttpResponse.badRequest(new InvalidParamError("userId"));
      if (!vacancyId)
        return HttpResponse.badRequest(new InvalidParamError("vacancyId"));

      const apply = await this.applyForJobUseCase.apply(userId, vacancyId);
      return HttpResponse.ok({ apply });
    } catch (error) {
      return HttpResponse.catchError(error);
    }
  }
}

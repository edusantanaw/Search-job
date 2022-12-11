import { applyForJobUseCase } from "../../../domain/candidate/protocols/apply-interface";
import { HttpResponse, InvalidParamError } from "../../../utils/errors";
import { Controller } from "../../../utils/protocols/controller";

export class RemoveApplyRouter implements Controller {
  constructor(private applyForJobUseCase: applyForJobUseCase) {}

  async handle(req: { userId: string; vacancyId: string }) {
    try {
      const { userId, vacancyId } = req;

      if (!userId)
        return HttpResponse.badRequest(new InvalidParamError("userId"));
      if (!vacancyId)
        return HttpResponse.badRequest(new InvalidParamError("vacancyId"));

      await this.applyForJobUseCase.removeApply(userId, vacancyId);

      return HttpResponse.ok("success");
    } catch (error) {
      return HttpResponse.catchError(error);
    }
  }
}

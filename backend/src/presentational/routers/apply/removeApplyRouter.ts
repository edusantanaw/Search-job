import { HttpResponse, InvalidParamError } from "../../../utils/errors";
import { Controller } from "../../../utils/protocols/controller";

interface removeApplyUseCase {
  remove: (userId: string, vacancyId: string) => Promise<boolean>;
}

export class RemoveApplyRouter implements Controller {
  constructor(private removeApplyUseCase: removeApplyUseCase) {}

  async handle(req: { userId: string; vacancyId: string }) {
    try {
      const { userId, vacancyId } = req;

      if (!userId)
        return HttpResponse.badRequest(new InvalidParamError("userId"));
      if (!vacancyId)
        return HttpResponse.badRequest(new InvalidParamError("vacancyId"));

      await this.removeApplyUseCase.remove(userId, vacancyId);

      return HttpResponse.ok("success");
    } catch (error) {
      return HttpResponse.catchError(error);
    }
  }
}

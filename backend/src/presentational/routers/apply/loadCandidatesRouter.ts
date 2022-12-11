import { loadCandidatesUseCase } from "../../../domain/candidate/protocols/loadCandidateInterface";
import { HttpResponse, InvalidParamError } from "../../../utils/errors";
import { Controller } from "../../../utils/protocols/controller";

export class LoadCandidatesRouter implements Controller {
  constructor(private loadCandidatesUseCase: loadCandidatesUseCase) {}

  async handle({ vacancyId }: { vacancyId: string }) {
    try {
      if (!vacancyId)
        return HttpResponse.badRequest(new InvalidParamError("vacancyId"));

      const candidates = await this.loadCandidatesUseCase.loadCandidates(
        vacancyId
      );

      return HttpResponse.ok({ candidates });
    } catch (error) {
      return HttpResponse.catchError(error);
    }
  }
}

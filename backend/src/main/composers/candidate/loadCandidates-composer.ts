import { LoadCandidatesUseCase } from "../../../domain/candidate/loadCandidatesUseCase";
import { ApplyRepository } from "../../../infra/repositores/applyRepository";
import { LoadCandidatesRouter } from "../../../presentational/routers/apply/LoadCandidatesRouter";

export class LoadCandidatesCompose {
  static compose() {
    const applyRepository = new ApplyRepository();
    const loadCandidatesUseCase = new LoadCandidatesUseCase(applyRepository);
    return new LoadCandidatesRouter(loadCandidatesUseCase);
  }
}

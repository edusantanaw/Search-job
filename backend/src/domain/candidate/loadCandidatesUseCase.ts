import { applyRepository } from "../../infra/repositores/protocols/applyRepo";
import { loadCandidatesUseCase } from "./protocols/loadCandidateInterface";



export class LoadCandidatesUseCase implements loadCandidatesUseCase {
  constructor(private applyRepository: applyRepository) {}

  async loadCandidates(vacancyId: string) {
    const candidates = await this.applyRepository.loadAll(vacancyId);
    if (candidates) throw "Candidates not found!";
    return candidates;
  }
}

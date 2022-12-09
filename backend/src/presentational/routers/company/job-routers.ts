import { request } from "../../../utils/protocols/jobRequest";
import { jobUseCase } from "../../../domain/useCases/company/protocols/job-useCase";
import { HttpResponse, InvalidParamError } from "../../../utils/errors";

interface props {
  jobUseCase: jobUseCase;
}

export class JobRouter {
  constructor(private props: props) {}

  async create(request: request) {
    const { vancacyFor } = request.body;
    const { companyId } = request.params;
    try {
      if (!vancacyFor)
        return HttpResponse.badRequest(new InvalidParamError("vancacyFor"));

      if (!companyId)
        return HttpResponse.badRequest(new InvalidParamError("vancacyFor"));

      const vancacy = await this.props.jobUseCase.create({
        vancacyFor,
        CompanyId: companyId,
      });
      return vancacy;
    } catch (error) {
      return error;
    }
  }

  async updateStatus(request: request) {
    const { id } = request.params;
    const { status } = request.body;

    try {
      if (!status)
        return HttpResponse.badRequest(new InvalidParamError("status"));

      if (!id) return HttpResponse.badRequest(new InvalidParamError("id"));

      const job = await this.props.jobUseCase.update({ id, status });
      return job;
    } catch (error) {
      return error;
    }
  }

  async getAll() {
    try {
      const vancacy = await this.props.jobUseCase.getAllVancacy();
      return vancacy;
    } catch (error) {
      return error;
    }
  }

  async getByid(request: request) {
    const { id } = request.params;
    try {
      if (!id) return HttpResponse.badRequest(new InvalidParamError("id"));
      const vancacy = await this.props.jobUseCase.getById(id);
      return vancacy;
    } catch (error) {
      return error;
    }
  }
}

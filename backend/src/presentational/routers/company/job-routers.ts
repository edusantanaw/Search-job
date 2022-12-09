import { data } from "../../../utils/protocols/jobRequest";
import { jobUseCase } from "../../../domain/company-useCases/protocols/job-useCase";
import { HttpResponse, InvalidParamError } from "../../../utils/errors";

interface props {
  jobUseCase: jobUseCase;
}

export class JobRouter {
  constructor(private props: props) {}

  async create(data: data) {
    const { vacancyFor, companyId } = data;
    try {
      if (!vacancyFor)
        return HttpResponse.badRequest(new InvalidParamError("vacancyFor"));

      if (!companyId)
        return HttpResponse.badRequest(new InvalidParamError("vacancyFor"));

      const vancacy = await this.props.jobUseCase.create({
        vacancyFor,
        CompanyId: companyId,
      });
      return vancacy;
    } catch (error) {
      return error;
    }
  }

  async updateStatus(data: data) {
    const { id, status } = data;

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
      const vancacy = await this.props.jobUseCase.getAll();
      return vancacy;
    } catch (error) {
      return error;
    }
  }

  async getByid(data: data) {
    const { id } = data;
    try {
      if (!id) return HttpResponse.badRequest(new InvalidParamError("id"));
      const vancacy = await this.props.jobUseCase.getById(id);
      return vancacy;
    } catch (error) {
      return error;
    }
  }
}

import { jobUseCase } from "../../../protocols/useCases/create-job-useCase";
import { HttpResponse, InvalidParamError } from "../../../utils/errors";

interface props {
  createJobUseCase: jobUseCase;
}

type request = {
  body: {
    vacancyFor: string;
    status: boolean;
  };
  params: {
    id: string;
    companyId: string;
  };
};

export class JobRouter {
  constructor(private props: props) {}

  async create(request: request) {
    const { vacancyFor } = request.body;
    const { companyId } = request.params;
    if (!vacancyFor)
      return HttpResponse.badRequest(new InvalidParamError("vancacyFor"));

    if (!companyId)
      return HttpResponse.badRequest(new InvalidParamError("vancacyFor"));

    const vancacy = await this.props.createJobUseCase.create({
      vacancyFor,
      CompanyId: companyId,
    });
    return vancacy;
  }

  async updateStatus(request: request) {
    const { id } = request.params;
    const { status } = request.body;

    
}
}

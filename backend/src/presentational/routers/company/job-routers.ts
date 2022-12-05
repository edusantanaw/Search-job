import { createJobUseCase } from "../../../protocols/useCases/create-job-useCase";
import { HttpResponse, InvalidParamError } from "../../../utils/errors";

interface props {
  createJobUseCase: createJobUseCase;
}

export class JobRouter {
  constructor(private props: props) {}

  async route(body: any) {
    const { vancacyFor, companyId } = body;
    if (!vancacyFor)
      return HttpResponse.badRequest(new InvalidParamError("vancacyFor"));
    
      if (!companyId)
      return HttpResponse.badRequest(new InvalidParamError("vancacyFor"));

    const vancacy = await this.props.createJobUseCase.create(body);
    return vancacy;
  }
}

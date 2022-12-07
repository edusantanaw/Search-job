import { job } from "../../../prisma/client";
import { jobRepository } from "../../../protocols/repositorys/job-repository";
import { HttpResponse, NotFoundError } from "../../../utils/errors";

interface props {
  jobRepository: jobRepository;
}

export class JobUseCase {
  constructor(private props: props) {}

  async create(data: {
    vacancyFor: string;
    CompanyId: string;
    openStatus: true; // open by default
  }) {
    const vancacy = await this.props.jobRepository.create(data);

    return vancacy;
  }

  async update({ status, id }: { status: boolean; id: string }) {
    const verifyExists = await this.props.jobRepository.getJobById(id);
    if (!verifyExists) throw HttpResponse.badRequest(new NotFoundError("job"));
    const vacancy = await this.props.jobRepository.update(status, id);
    return vacancy;
  }

  async getAll() {
    const vacancy = await this.props.jobRepository.getAll();
    if (!vacancy) throw HttpResponse.badRequest(new NotFoundError("jobs"));
    return vacancy;
  }

  async getById(id: string) {
    const vancacy = await this.props.jobRepository.getJobById(id);
    if (!vancacy) throw HttpResponse.badRequest(new NotFoundError("vancacy"));
    return vancacy;
  }
}

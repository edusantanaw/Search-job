import { jobRepository } from "../../../protocols/repositorys/job-repository";

interface props {
  jobRepository: jobRepository;
}

export class CreateJobUseCase {
  constructor(private props: props) {}
  async create(data: { vacancyFor: string; CompanyId: string }) {
    const vancacy = await this.props.jobRepository.create(data);

    return vancacy;
  }
}

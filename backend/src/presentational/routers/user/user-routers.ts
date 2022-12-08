import { User } from "@prisma/client";
import { UserUseCase } from "../../../protocols/useCases/create-user-use0case";
import {
  HttpResponse,
  InvalidParamError,
  NotFoundError,
} from "../../../utils/errors";

type props = {
  userUseCase: UserUseCase;
};
interface request {
  body: User;
  params: {
    id: string;
  };
  file: Express.Multer.File;
}

interface useRoutes {
  props: props;
}

export class UserRoutes implements useRoutes {
  constructor(public props: props) {}

  async getById(request: request) {
    const { id } = request.params;
    if (!id) return HttpResponse.badRequest(new InvalidParamError("id"));

    const user = await this.props.userUseCase.loadById(id);
    if (!user) return HttpResponse.badRequest(new NotFoundError("user"));

    return HttpResponse.ok({ user });
  }

  async getAll() {
    const users = await this.props.userUseCase.loadAll();
    if (!users) return HttpResponse.badRequest(new NotFoundError("users"));
    return HttpResponse.ok({ users });
  }

  async update(request: request) {
    const { id } = request.params;
    const { city, email, firstName, lastName, phoneNumber } = request.body;
    const perfilPhoto = request.file?.filename;

    if (!email) return HttpResponse.badRequest(new InvalidParamError("email"));
    if (!firstName)
      return HttpResponse.badRequest(new InvalidParamError("first name"));

    if (!lastName)
      return HttpResponse.badRequest(new InvalidParamError("last name"));

    const userUpdated = await this.props.userUseCase.update({
      id,
      city,
      email,
      phoneNumber,
      firstName,
      lastName,
      perfilPhoto,
    });

    return HttpResponse.ok({ userUpdated });
  }
}

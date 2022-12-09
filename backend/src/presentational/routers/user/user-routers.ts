import { IUserUseCase } from "../../../domain/user-useCases/protocols/user-usecase";
import {
  HttpResponse,
  InvalidParamError,
  NotFoundError,
} from "../../../utils/errors";

type props = {
  userUseCase: IUserUseCase;
};
interface data {
  id: string;
  file: Express.Multer.File;
  city: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
}

interface useRoutes {
  props: props;
}

export class UserRoutes implements useRoutes {
  constructor(public props: props) {}

  async getById(data: data) {
    const { id } = data;
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

  async update(data: data) {
    const { id } = data;
    const { city, email, firstName, lastName, phoneNumber } = data;
    const perfilPhoto = data.file?.filename;

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

import {
  updateUserUseCase,
  data,
} from "../../../domain/user-useCases/protocols/updateUserUseCase";
import { HttpResponse, InvalidParamError } from "../../../utils/errors";
import { Controller } from "../../../utils/protocols/controller";

export class UpdateUserRoutes implements Controller {
  constructor(private updateUserUseCase: updateUserUseCase) {}

  async handle(data: data) {
    try {
      const { id } = data;
      const { city, email, req, firstName, lastName, phoneNumber } = data;
      console.log(req);
      let perfilPhoto = req?.file.filename ? req.file.filename : null;

      if (!email)
        return HttpResponse.badRequest(new InvalidParamError("email"));
      if (!firstName)
        return HttpResponse.badRequest(new InvalidParamError("first name"));

      if (!lastName)
        return HttpResponse.badRequest(new InvalidParamError("last name"));

      const userUpdated = await this.updateUserUseCase.update({
        id,
        city,
        email,
        phoneNumber,
        firstName,
        lastName,
        perfilPhoto,
      });

      return HttpResponse.ok({ userUpdated });
    } catch (error) {
      return HttpResponse.catchError(error);
    }
  }
}

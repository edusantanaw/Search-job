import { UnauthorizedError } from "../errors/unauthorized-errors";

export class HttpResponse {
  static ok(body: any) {
    return {
      stateCode: 200,
      body,
    };
  }

  static badRequest(error: { message: string }) {
    return {
      statusCode: 400,
      body: {
        error: error.message,
      },
    };
  }
  static unauthotizedError() {
    return {
      statusCode: 401,
      body: {
        error: new UnauthorizedError("unauthorized"),
      },
    };

  }
}

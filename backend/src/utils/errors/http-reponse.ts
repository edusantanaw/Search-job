import { UnauthorizedError } from "./unauthorized-errors";

export class HttpResponse {
  static ok(body: any) {
    return {
      statusCode: 200,
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
  static notFound(error: { message: string }) {
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

  static catchError(error: any) {
    return {
      statusCode: 400,
      body: error,
    };
  }
}

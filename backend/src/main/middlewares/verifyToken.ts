import { NextFunction, Request } from "express";
import { HttpResponse } from "../../utils/errors";

export function verifyTokenMiddleware(req: Request, next: NextFunction) {
  const getToken = req.headers.authorization;
  if (!getToken) return HttpResponse.unauthotizedError();
  const token = getToken.split(" ")[1];
  if (token) next();
  return HttpResponse.unauthotizedError();
}

import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../../utils/errors";

export function verifyTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const getToken = req.headers.authorization;
  if (!getToken) return HttpResponse.unauthotizedError();
  const token = getToken.split(" ")[1];
  if (token) next();
  return res.status(401).json("Tokne invalid!");
}

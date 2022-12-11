import { NextFunction, Request, Response } from "express";

export function verifyTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const getToken = req.headers.authorization;
    if (!getToken) return res.status(401).json("Access denied!");
    const token = getToken.split(" ")[1];
    if (token.length == 0) {
      throw "Token invalid!";
    }
    next();
  } catch (error) {
    res.status(401).json(error);
  }
}

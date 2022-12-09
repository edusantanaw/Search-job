import { Request, Response } from "express";

const adapt = (method: any) => {
  return async (req: Request, res: Response) => {
    const httpResponse = await method({
      ...req.body,
      ...req.params,
      ...req.query,
      ...req.file,
      ...req.files,
    });
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};

export default adapt;

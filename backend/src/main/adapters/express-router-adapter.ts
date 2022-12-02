import { Request, Response } from "express";

const adapt = (controller: any) => {
  return async (req: Request, res: Response) => {
    const httpResponse = await controller.login(req.body);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};

export default adapt;

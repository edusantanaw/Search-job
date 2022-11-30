import { Request, Response } from "express";

const adapt= (controller: any) => {
  return async (req: Request, res: Response) => {
    const httpRequest: any = {
      body: req.body,
    };
    const httpResponse = await controller.login(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};


export default adapt
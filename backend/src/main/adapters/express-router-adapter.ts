import { Request, Response } from "express";

type adapter = {
  route: (body: any) => Promise<{ statusCode: number; body: any }>;
}

const adapt = (controller: adapter) => { 
  return async (req: Request, res: Response) => {
    const httpResponse = await controller.route(req.body);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};

export default adapt;

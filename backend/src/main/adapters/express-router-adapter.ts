import { Request, Response } from "express";

interface adapter {
  route: (body: any) => Promise<{ statusCode: number; body: {error: string} }>;
}

const adapt = (controller: adapter) => {
  return async (req: Request, res: Response) => {
    const httpResponse = await controller.route(req.body);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};

export default adapt;

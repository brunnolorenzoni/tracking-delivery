import { Request, Response, NextFunction } from 'express';

const errorHandler: any = (error: Error, req: Request, res: Response, next: NextFunction) => {
  res.send(error).status(400);
};

export default errorHandler;
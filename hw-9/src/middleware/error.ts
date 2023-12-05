import debug from 'debug';
import { type Request, type Response, type NextFunction } from 'express';

const errorDebugLog = debug('error');

export function errorMiddleware(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  errorDebugLog(err.message);
  errorDebugLog(err.stack);
  res
    .status(500)
    .send({ data: null, error: { message: 'Ooops, something went wrong' } });
}

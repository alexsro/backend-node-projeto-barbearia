import { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import AppError from 'shared/errors/AppError';

export default function globalExceptionHandler(
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: err.message, // 'Internal server error',
  });
}

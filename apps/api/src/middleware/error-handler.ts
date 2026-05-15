import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { HttpError } from '../utils/errors.js';
import { logger } from '../config/logger.js';

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ error: err.issues });
  }
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message });
  }

  const reqId = (req as Request & { id?: string }).id;
  logger.error({ err, reqId, url: req.url, method: req.method }, 'unhandled error');
  res.status(500).json({ error: 'Internal server error' });
};

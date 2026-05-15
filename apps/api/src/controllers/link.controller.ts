import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import type { CreateLinkInput } from '@linksy/shared';
import * as service from '../services/link.service.js';
import { HttpError } from '../utils/errors.js';

const createLinkSchema = z.object({
  url: z.string().url(),
  alias: z.string().min(1).max(64),
}) satisfies z.ZodType<CreateLinkInput>;

type CreateLinkBody = z.infer<typeof createLinkSchema>;

export const createLink = async (
  req: Request<{}, {}, CreateLinkBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { url, alias } = createLinkSchema.parse(req.body);

    const link = await service.createShortLink(alias, url);
    const baseUrl =
      process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;

    res.json({
      shortUrl: `${baseUrl}/${alias}`,
      data: link,
    });
  } catch (error) {
    next(error);
  }
};

export const redirect = async (
  req: Request<{ alias: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { alias } = req.params;
    const link = await service.redirectAndCount(alias);

    // Cache the redirect for 1 minute to improve performance while balancing analytics accuracy
    res.setHeader('Cache-Control', 'public, max-age=60');
    res.redirect(link.original_url);
  } catch (error) {
    if (error instanceof HttpError && error.status === 404) {
      return res.status(404).send('Link not found');
    }
    next(error);
  }
};

export const getLinkDetails = async (
  req: Request<{ alias: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { alias } = req.params;
    const link = await service.getLink(alias);

    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }

    res.json(link);
  } catch (error) {
    next(error);
  }
};

export const getStats = async (
  req: Request<{ alias: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { alias } = req.params;
    const stats = await service.getLinkStats(alias);
    res.json(stats);
  } catch (error) {
    next(error);
  }
};

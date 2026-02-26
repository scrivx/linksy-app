import { Request, Response } from 'express';
import { z } from 'zod';
import * as service from '../services/link.service';

// request schema
const createLinkSchema = z.object({
  url: z.string().url(),
  alias: z.string().min(1),
});

type CreateLinkBody = z.infer<typeof createLinkSchema>;

export const createLink = async (
  req: Request<{}, {}, CreateLinkBody>,
  res: Response,
) => {
  try {
    const { url, alias } = createLinkSchema.parse(req.body);

    const link = await service.createShortLink(alias, url);

    res.json({
      shortUrl: `${process.env.BASE_URL}/${alias}`,
      data: link,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }
    res.status(400).json({ error: error.message });
  }
};

export const redirect = async (
  req: Request<{ alias: string }>,
  res: Response,
) => {
  try {
    const { alias } = req.params;
    const link = await service.getLink(alias);

    if (!link) {
      return res.status(404).send('Link not found');
    }

    await service.registerClick(alias);
    res.redirect(link.original_url);
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getLinkDetails = async (
  req: Request<{ alias: string }>,
  res: Response,
) => {
  try {
    const { alias } = req.params;
    const link = await service.getLink(alias);

    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }

    res.json(link);
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getStats = async (
  req: Request<{ alias: string }>,
  res: Response,
) => {
  try {
    const { alias } = req.params;
    const stats = await service.getLinkStats(alias);

    res.json(stats);
  } catch (error: any) {
    if (error.message === 'Link not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

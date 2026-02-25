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
  // alias is guaranteed to be a string by the generic above
  const { alias } = req.params;

  const link = await service.getLink(alias);

  if (!link) {
    return res.status(404).send('Link not found');
  }

  await service.registerClick(alias);

  res.redirect(link.original_url);
};

import * as repo from '../repositories/link.repository';
import { Link } from '../models/link.model';

export const createShortLink = async (
  alias: string,
  url: string,
): Promise<Link> => {
  const existing = await repo.findByAlias(alias);

  if (existing) {
    throw new Error('Alias already exists');
  }

  return repo.createLink(alias, url);
};

export const getLink = async (alias: string): Promise<Link | undefined> => {
  return repo.findByAlias(alias);
};

export const registerClick = async (alias: string): Promise<void> => {
  await repo.incrementClicks(alias);
};

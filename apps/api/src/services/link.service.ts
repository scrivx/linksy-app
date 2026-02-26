import * as repo from '../repositories/link.repository';
import { Link } from '../models/link.model';
import { isReserved } from '../utils/reserved-words';

export const createShortLink = async (
  alias: string,
  url: string,
): Promise<Link> => {
  if (isReserved(alias)) {
    throw new Error('This alias is reserved and cannot be used');
  }

  const existing = await repo.findByAlias(alias);

  if (existing) {
    throw new Error('Alias already exists');
  }

  return repo.createLink(alias, url);
};

export const getLink = async (alias: string): Promise<Link | null> => {
  return repo.findByAlias(alias);
};

export const registerClick = async (alias: string): Promise<void> => {
  await repo.incrementClicks(alias);
};

export const getLinkStats = async (alias: string) => {
  const link = await repo.findByAlias(alias);
  if (!link) {
    throw new Error('Link not found');
  }

  return {
    alias: link.alias,
    clicks: link.clicks,
    last_accessed_at: link.last_accessed_at,
    created_at: link.created_at,
  };
};

import * as repo from '../repositories/link.repository.js';
import { isReserved } from '../utils/reserved-words.js';
import { HttpError, isPrismaErrorWithCode } from '../utils/errors.js';

export const createShortLink = async (alias: string, url: string) => {
  if (isReserved(alias)) {
    throw new HttpError(400, 'This alias is reserved and cannot be used');
  }

  try {
    return await repo.createLink(alias, url);
  } catch (error: unknown) {
    if (isPrismaErrorWithCode(error, 'P2002')) {
      throw new HttpError(409, 'Alias already exists');
    }
    throw error;
  }
};

export const getLink = async (alias: string) => {
  return repo.findByAlias(alias);
};

export const redirectAndCount = async (alias: string) => {
  try {
    return await repo.incrementAndFetch(alias);
  } catch (error: unknown) {
    if (isPrismaErrorWithCode(error, 'P2025')) {
      throw new HttpError(404, 'Link not found');
    }
    throw error;
  }
};

export const getLinkStats = async (alias: string) => {
  const link = await repo.findByAlias(alias);
  if (!link) {
    throw new HttpError(404, 'Link not found');
  }

  return {
    alias: link.alias,
    clicks: link.clicks,
    last_accessed_at: link.last_accessed_at,
    created_at: link.created_at,
  };
};

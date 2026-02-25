import { pool } from '../config/database';
import { Link } from '../models/link.model';

// allow simple in‑memory store for development/testing
const useMemory = process.env.USE_IN_MEMORY_DB === 'true';
const memoryStore = new Map<string, Link>();

export const createLink = async (alias: string, url: string): Promise<Link> => {
  if (useMemory) {
    const now = new Date();
    const newLink: Link = {
      id: now.getTime().toString(),
      alias,
      original_url: url,
      clicks: 0,
      created_at: now,
      updated_at: now,
      last_accessed_at: null,
    };
    memoryStore.set(alias, newLink);
    return newLink;
  }

  const query = `
    INSERT INTO links (alias, original_url)
    VALUES ($1, $2)
    RETURNING *
  `;
  const { rows } = await pool.query(query, [alias, url]);
  return rows[0] as Link;
};

export const findByAlias = async (alias: string): Promise<Link | undefined> => {
  if (useMemory) {
    return memoryStore.get(alias);
  }

  const query = `
    SELECT * FROM links WHERE alias = $1
  `;
  const { rows } = await pool.query(query, [alias]);
  return rows[0] as Link | undefined;
};

export const incrementClicks = async (alias: string): Promise<void> => {
  if (useMemory) {
    const l = memoryStore.get(alias);
    if (l) {
      l.clicks += 1;
      l.last_accessed_at = new Date();
      memoryStore.set(alias, l);
    }
    return;
  }

  const query = `
    UPDATE links
    SET clicks = clicks + 1,
        last_accessed_at = NOW()
    WHERE alias = $1
  `;
  await pool.query(query, [alias]);
};

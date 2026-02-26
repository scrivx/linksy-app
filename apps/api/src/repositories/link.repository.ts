import { prisma } from '../config/prisma';

export const createLink = async (alias: string, url: string) => {
  return prisma.link.create({
    data: {
      alias,
      original_url: url,
    },
  });
};

export const findByAlias = async (alias: string) => {
  return prisma.link.findUnique({
    where: { alias },
  });
};

export const incrementClicks = async (alias: string) => {
  return prisma.link.update({
    where: { alias },
    data: {
      clicks: { increment: 1 },
      last_accessed_at: new Date(),
    },
  });
};

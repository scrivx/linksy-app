import { PrismaClient } from '../generated/prisma/client';

// create a singleton so the client is reused during hot-reloads
// pass an empty options object; additional configuration (logging, datasources, etc.)
// can be provided here if needed
// PrismaClient requires an options object with generic parameters; an empty
// object cast to `any` works when no custom config is needed.
export const prisma = new PrismaClient({} as any);

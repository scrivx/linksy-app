import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import linkRoutes from './routes/link.routes.js';
import { errorHandler } from './middleware/error-handler.js';
import { httpLogger } from './middleware/http-logger.js';
import { logger } from './config/logger.js';

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:4321',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:4321',
  process.env.FRONTEND_URL,
].filter((origin): origin is string => Boolean(origin));

if (process.env.NODE_ENV === 'production' && !process.env.FRONTEND_URL) {
  logger.warn(
    'FRONTEND_URL is not set — production requests from the deployed frontend will be blocked.',
  );
}

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(httpLogger);
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json({ limit: '32kb' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use(linkRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Linksy API is running' });
});

app.use(errorHandler);

if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    logger.info({ port: PORT, allowedOrigins }, 'server started');
  });
}

export default app;

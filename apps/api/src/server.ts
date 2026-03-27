import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import linkRoutes from './routes/link.routes.js';

const app = express();

// CORS configuration
const allowedOrigins = [
  // Desarrollo local
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:4321',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:4321',
  // Producción - reemplaza con tu dominio real de Vercel
  process.env.FRONTEND_URL || '',
].filter(Boolean);

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use(linkRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Linksy API is running' });
});

// Solo inicia el servidor si no estamos en Vercel (desarrollo local)
if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}

export default app;

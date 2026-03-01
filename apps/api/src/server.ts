import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import linkRoutes from './routes/link.routes';

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
app.use(express.json());

app.use(linkRoutes);

app.get('/', (req, res) => {
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

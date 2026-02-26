import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import linkRoutes from './routes/link.routes';

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:4321',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:4321',
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(linkRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Linksy API is running' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

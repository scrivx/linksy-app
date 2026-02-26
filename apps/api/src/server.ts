import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import linkRoutes from './routes/link.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(linkRoutes);

app.get('/', (req, res) => {
  res.send('Scrix Link API running 🚀');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

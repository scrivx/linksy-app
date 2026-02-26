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
  res.send('Linksy API is running');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

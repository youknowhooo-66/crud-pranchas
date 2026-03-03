import express from 'express';
import cors from 'cors';
import pranchaRoutes from './routes/pranchaRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/pranchas', pranchaRoutes);

export default app;
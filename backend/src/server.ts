import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';
import taskRoutes from './routes/tasks';
import { setupWebSocket } from './utils/websocket';

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Routes - 順番が重要です
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

setupWebSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
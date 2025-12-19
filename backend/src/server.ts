import express, { Request, Response } from 'express'; // 型（Request, Response）も一緒にインポート
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';
import taskRoutes from './routes/tasks';
import { setupWebSocket } from './utils/websocket';

// 環境変数の読み込み（PORTなどを読み込むために必要です）
dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Health check
// さきほどエラーが出ていた req: Request, res: Response がこれで正しく認識されます
app.get('/api/health', (req: Request, res: Response) => { 
  res.json({ status: 'ok', message: 'Server is running' });
});

// Setup WebSocket
setupWebSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // デプロイ環境（Render）では localhost ではないため、ログを少し汎用的にしています
  console.log(`WebSocket server is ready`);
});

export default app;
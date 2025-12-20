import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';
import taskRoutes from './routes/tasks';
import { setupWebSocket } from './utils/websocket';

// 1. 環境変数の読み込み
dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 10000;

// 2. ミドルウェアの設定（順番が非常に重要です！）
// 🚨 cors() を必ず express.json() や Routes よりも先に書いてください
app.use(cors({
  origin: '*', // すべてのドメインからのアクセスを許可（デバッグ用）
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// 3. ルート（API）の設定
// 認証が必要ないルート（Login/Register）
app.use('/api/auth', authRoutes);

// プロジェクトとタスクのルート
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// 4. ヘルスチェック（サーバーが起きているか確認用）
app.use('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// 5. WebSocket のセットアップ
setupWebSocket(server);

// 6. サーバーの起動
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

export default app;
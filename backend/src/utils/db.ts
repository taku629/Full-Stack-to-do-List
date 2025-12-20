
import { Pool } from 'pg';
import dotenv from 'dotenv';

// 1. 最初に環境変数を読み込む
dotenv.config();

// 2. ログを出して、環境変数が読み込めているか確認する
// これにより Render の Logs で「何を見に行こうとしているか」がわかります
if (!process.env.DATABASE_URL) {
  console.error("❌ CRITICAL ERROR: DATABASE_URL is undefined!");
  console.log("Render の Environment 設定を確認してください。");
} else {
  console.log("✅ DATABASE_URL detected. Connecting to remote DB...");
}

export const pool = new Pool({
  // 直接 DATABASE_URL を指定（127.0.0.1 を見に行く余地をなくします）
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // RenderのPostgreSQL接続にはこれが必要です
  }
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
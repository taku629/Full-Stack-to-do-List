import { Pool } from 'pg';
import dotenv from 'dotenv';

// 環境変数を読み込む設定
dotenv.config();

// デバッグ用ログ：URLが空っぽならエラーを出す（RenderのLogsで見れます）
if (!process.env.DATABASE_URL) {
  console.error("❌ ERROR: DATABASE_URL is not defined! Check Render settings.");
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Renderのデータベース接続に必須
  }
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
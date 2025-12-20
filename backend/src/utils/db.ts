import { Pool } from 'pg';
import dotenv from 'dotenv';

// 環境変数を読み込む（これがないと process.env が空になります）
dotenv.config();

// 本番環境（Render）では DATABASE_URL を使い、なければローカルの設定を使う
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
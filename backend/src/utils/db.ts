import { Pool } from 'pg';
import dotenv from 'dotenv';

// 1. 環境変数を確実に読み込む（これがないと process.env.DATABASE_URL が空になります）
dotenv.config();

// 2. 接続先の設定
// DATABASE_URL があれば本番（Render）、なければローカルの 5432 番ポートを見に行きます
const connectionString = process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString: connectionString,
  ssl: connectionString ? { rejectUnauthorized: false } : false // 本番環境ではSSL接続が必須です
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
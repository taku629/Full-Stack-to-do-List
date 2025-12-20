import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// RenderのPostgreSQLに接続するための設定
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Render接続に必須の設定
  }
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
// backend/src/routes/tasks.ts
import express, { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { pool } from '../utils/db'; // SQL用の接続をインポート

const router = express.Router();

// タスク作成 (SQL対応版)
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, status, priority, projectId } = req.body;
    const id = uuidv4();

    // SQL文で tasks テーブルに直接保存する
    const result = await pool.query(
      'INSERT INTO tasks (id, title, description, status, priority, project_id, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [id, title, description || '', status || 'todo', priority || 'medium', projectId, req.userId]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Task create error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// タスク取得 (SQL対応版)
router.get('/project/:projectId', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM tasks WHERE project_id = $1 AND user_id = $2',
      [req.params.projectId, req.userId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
import express, { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';
import { pool } from '../utils/db.js';
const router = express.Router();

// プロジェクトごとのタスク取得
router.get('/project/:projectId', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM tasks WHERE project_id = $1 AND user_id = $2 ORDER BY created_at ASC',
      [req.params.projectId, req.userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Fetch tasks error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// タスク作成
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    // projectId を project_id に修正して受け取る
    const { title, description, status, priority, project_id } = req.body;
    const id = uuidv4();
    
    const result = await pool.query(
      'INSERT INTO tasks (id, title, description, status, priority, project_id, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [id, title, description || '', status || 'todo', priority || 'medium', project_id, req.userId]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    // エラーの詳細をRenderのログに出力する
    console.error('Task creation error detail:', error.message);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

// タスク更新（ステータス以外も更新できるように拡張）
router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, status, priority } = req.body;
    const result = await pool.query(
      'UPDATE tasks SET title = COALESCE($1, title), description = COALESCE($2, description), status = COALESCE($3, status), priority = COALESCE($4, priority) WHERE id = $5 AND user_id = $6 RETURNING *',
      [title, description, status, priority, req.params.id, req.userId]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// タスク削除
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    await pool.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2', [req.params.id, req.userId]);
    res.json({ message: 'Deleted' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

export default router;
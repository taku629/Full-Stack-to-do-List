import express, { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { pool } from '../utils/db';

const router = express.Router();

// 1. タスク作成 (既にあるもの)
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, status, priority, projectId } = req.body;
    const id = uuidv4();

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

// 2. タスク取得 (既にあるもの)
router.get('/project/:projectId', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM tasks WHERE project_id = $1 AND user_id = $2 ORDER BY id ASC',
      [req.params.projectId, req.userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// 3. 【追加】タスクの更新・移動
// これがないと、ドラッグ&ドロップやステータス変更がSQLに反映されません
router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, status, priority } = req.body;

    const result = await pool.query(
      `UPDATE tasks 
       SET title = COALESCE($1, title), 
           description = COALESCE($2, description), 
           status = COALESCE($3, status), 
           priority = COALESCE($4, priority) 
       WHERE id = $5 AND user_id = $6 
       RETURNING *`,
      [title, description, status, priority, req.params.id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// 4. 【追加】タスクの削除
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2',
      [req.params.id, req.userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
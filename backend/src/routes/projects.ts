import express, { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
// 自作ファイルへのパスの末尾に .js を追加
import { authMiddleware, AuthRequest } from '../middleware/auth.js'; 
import { pool } from '../utils/db.js';

const router = express.Router();

// GET: 自分のプロジェクト一覧を「作成日時が新しい順」に取得
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM projects WHERE user_id = $1 ORDER BY created_at DESC', 
      [req.userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// POST: 新しいプロジェクトを作成
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { name, description } = req.body;
    const id = uuidv4();
    const result = await pool.query(
      'INSERT INTO projects (id, name, description, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [id, name, description || '', req.userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Project Create Error:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// DELETE: プロジェクトと関連するタスクを削除
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    await pool.query('DELETE FROM tasks WHERE project_id = $1', [req.params.id]);
    const result = await pool.query(
      'DELETE FROM projects WHERE id = $1 AND user_id = $2',
      [req.params.id, req.userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Project not found or unauthorized' });
    }

    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ error: 'Delete failed' });
  }
});

export default router;
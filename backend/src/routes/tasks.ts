import express, { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import datastore from '../utils/datastore';

const router = express.Router();

// プロジェクトごとの全タスクを取得
router.get('/project/:projectId', authMiddleware, (req: AuthRequest, res: Response): void => {
  try {
    const project = datastore.getProjectById(req.params.projectId);

    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    if (project.userId !== req.userId) {
      res.status(403).json({ error: 'Access denied' });
      return;
    }

    const tasks = datastore.getTasksByProjectId(req.params.projectId);
    res.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// 認証済みユーザーの全タスクを取得
router.get('/', authMiddleware, (req: AuthRequest, res: Response): void => {
  try {
    const tasks = datastore.getAllTasksByUserId(req.userId!);
    res.json(tasks);
  } catch (error) {
    console.error('Get all tasks error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// 新しいタスクを作成
router.post('/', authMiddleware, (req: AuthRequest, res: Response): void => {
  try {
    const { title, description, status, priority, projectId } = req.body;

    if (!title || !projectId) {
      res.status(400).json({ error: 'Title and projectId are required' });
      return;
    }

    const project = datastore.getProjectById(projectId);
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    if (project.userId !== req.userId) {
      res.status(403).json({ error: 'Access denied' });
      return;
    }

    const task = {
      id: uuidv4(),
      title,
      description: description || '',
      status: status || 'todo',
      priority: priority || 'medium',
      projectId,
      userId: req.userId!,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const createdTask = datastore.createTask(task);
    res.status(201).json(createdTask);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// 特定のタスクを取得
router.get('/:id', authMiddleware, (req: AuthRequest, res: Response): void => {
  try {
    const task = datastore.getTaskById(req.params.id);

    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    if (task.userId !== req.userId) {
      res.status(403).json({ error: 'Access denied' });
      return;
    }

    res.json(task);
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// 【修正箇所】タスクの更新処理（カンバン移動時のデータ消失防止）
router.put('/:id', authMiddleware, (req: AuthRequest, res: Response): void => {
  try {
    const task = datastore.getTaskById(req.params.id);

    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    if (task.userId !== req.userId) {
      res.status(403).json({ error: 'Access denied' });
      return;
    }

    const { title, description, status, priority } = req.body;

    // リクエストで送られてこなかった項目は、元のtaskの値を維持する
    const updatedTask = datastore.updateTask(req.params.id, {
      title: title ?? task.title,
      description: description ?? task.description,
      status: status ?? task.status,
      priority: priority ?? task.priority
    });

    res.json(updatedTask);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// タスクの削除
router.delete('/:id', authMiddleware, (req: AuthRequest, res: Response): void => {
  try {
    const task = datastore.getTaskById(req.params.id);

    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    if (task.userId !== req.userId) {
      res.status(403).json({ error: 'Access denied' });
      return;
    }

    datastore.deleteTask(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
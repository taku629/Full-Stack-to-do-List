import fs from 'fs';
import path from 'path';
import { Database, User, Project, Task } from '../models/types';

class DataStore {
  private dbPath: string;
  private db: Database;

  constructor() {
    this.dbPath = path.join(__dirname, '../data/database.json');
    this.initDatabase();
    this.db = this.readDatabase();
  }

  private initDatabase(): void {
    const dirPath = path.dirname(this.dbPath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    if (!fs.existsSync(this.dbPath)) {
      const initialDb: Database = {
        users: [],
        projects: [],
        tasks: []
      };
      fs.writeFileSync(this.dbPath, JSON.stringify(initialDb, null, 2));
    }
  }

  private readDatabase(): Database {
    try {
      const data = fs.readFileSync(this.dbPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading database:', error);
      return { users: [], projects: [], tasks: [] };
    }
  }

  private writeDatabase(): void {
    try {
      fs.writeFileSync(this.dbPath, JSON.stringify(this.db, null, 2));
    } catch (error) {
      console.error('Error writing database:', error);
    }
  }

  // User operations
  createUser(user: User): User {
    this.db.users.push(user);
    this.writeDatabase();
    return user;
  }

  getUserByEmail(email: string): User | undefined {
    return this.db.users.find(u => u.email === email);
  }

  getUserById(id: string): User | undefined {
    return this.db.users.find(u => u.id === id);
  }

  // Project operations
  createProject(project: Project): Project {
    this.db.projects.push(project);
    this.writeDatabase();
    return project;
  }

  getProjectsByUserId(userId: string): Project[] {
    return this.db.projects.filter(p => p.userId === userId);
  }

  getProjectById(id: string): Project | undefined {
    return this.db.projects.find(p => p.id === id);
  }

  updateProject(id: string, updates: Partial<Project>): Project | null {
    const index = this.db.projects.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    this.db.projects[index] = { ...this.db.projects[index], ...updates };
    this.writeDatabase();
    return this.db.projects[index];
  }

  deleteProject(id: string): boolean {
    const index = this.db.projects.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    this.db.projects.splice(index, 1);
    // Also delete associated tasks
    this.db.tasks = this.db.tasks.filter(t => t.projectId !== id);
    this.writeDatabase();
    return true;
  }

  // Task operations
  createTask(task: Task): Task {
    this.db.tasks.push(task);
    this.writeDatabase();
    return task;
  }

  getTasksByProjectId(projectId: string): Task[] {
    return this.db.tasks.filter(t => t.projectId === projectId);
  }

  getTaskById(id: string): Task | undefined {
    return this.db.tasks.find(t => t.id === id);
  }

  updateTask(id: string, updates: Partial<Task>): Task | null {
    const index = this.db.tasks.findIndex(t => t.id === id);
    if (index === -1) return null;
    
    this.db.tasks[index] = { 
      ...this.db.tasks[index], 
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.writeDatabase();
    return this.db.tasks[index];
  }

  deleteTask(id: string): boolean {
    const index = this.db.tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    
    this.db.tasks.splice(index, 1);
    this.writeDatabase();
    return true;
  }

  getAllTasksByUserId(userId: string): Task[] {
    const userProjects = this.getProjectsByUserId(userId);
    const projectIds = userProjects.map(p => p.id);
    return this.db.tasks.filter(t => projectIds.includes(t.projectId));
  }
}

export default new DataStore();

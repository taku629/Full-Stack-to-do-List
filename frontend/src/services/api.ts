
import axios from 'axios';

// --- 他のファイルから参照される型定義 (これらを正しくexportする必要があります) ---
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  userId: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  projectId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// --- APIの設定 ---
const API_URL = import.meta.env.VITE_API_URL || 'https://full-stack-to-do-list-121l.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- 認証関連 ---
export const register = async (email: string, password: string, name: string): Promise<AuthResponse> => {
  const response = await api.post('/auth/register', { email, password, name });
  return response.data;
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

// --- プロジェクト関連 ---
export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get('/projects');
  return response.data;
};

export const createProject = async (name: string, description: string): Promise<Project> => {
  const response = await api.post('/projects', { name, description });
  return response.data;
};

export const updateProject = async (id: string, name: string, description: string): Promise<Project> => {
  const response = await api.put(`/projects/${id}`, { name, description });
  return response.data;
};

export const deleteProject = async (id: string): Promise<void> => {
  await api.delete(`/projects/${id}`);
};

// --- タスク関連 ---
export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get('/tasks');
  return response.data;
};

export const getTasksByProject = async (projectId: string): Promise<Task[]> => {
  const response = await api.get(`/tasks/project/${projectId}`);
  return response.data;
};

export const createTask = async (task: Partial<Task>): Promise<Task> => {
  const response = await api.post('/tasks', task);
  return response.data;
};

export const updateTask = async (id: string, updates: Partial<Task>): Promise<Task> => {
  const response = await api.put(`/tasks/${id}`, updates);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

export default api;
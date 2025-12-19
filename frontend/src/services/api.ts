import axios from 'axios';

// ... (Interface定義はそのまま)

// 環境変数が読み込めない時のためのフォールバックを確実に設定
const API_URL = import.meta.env.VITE_API_URL || 'https://full-stack-to-do-list-121l.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
});

// リクエスト送信時にトークンを付与
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// エラー発生時のログ出力を強化
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// --- 認証関連 ---
export const register = async (email: string, password: string, name: string) => {
  const response = await api.post('/auth/register', { email, password, name });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

// --- プロジェクト関連 ---
export const getProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};

export const createProject = async (name: string, description: string) => {
  const response = await api.post('/projects', { name, description });
  return response.data;
};

// --- タスク関連 ---
export const getTasksByProject = async (projectId: string) => {
  const response = await api.get(`/tasks/project/${projectId}`);
  return response.data;
};

export const createTask = async (task: any) => {
  const response = await api.post('/tasks', task);
  return response.data;
};

// 【重要】更新処理
export const updateTask = async (id: string, updates: any) => {
  // updatesには { status: 'in-progress' } など、変更したい部分だけが入る
  const response = await api.put(`/tasks/${id}`, updates);
  return response.data;
};

export const deleteTask = async (id: string) => {
  await api.delete(`/tasks/${id}`);
};

export default api;
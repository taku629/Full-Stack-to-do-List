import React from 'react';
import * as api from '../services/api';

type Task = api.Task;

interface TaskCardProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate, onDelete }) => {
  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const handleStatusChange = () => {
    const statusFlow: Record<Task['status'], Task['status']> = {
      'todo': 'in-progress',
      'in-progress': 'done',
      'done': 'todo',
    };
    onUpdate(task.id, { status: statusFlow[task.status] });
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-gray-800">{task.title}</h4>
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this task?')) {
              onDelete(task.id);
            }
          }}
          className="text-red-500 hover:text-red-700"
        >
          ✕
        </button>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
      )}

      <div className="flex justify-between items-center">
        <span className={`text-xs px-2 py-1 rounded ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
        <button
          onClick={handleStatusChange}
          className="text-xs bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded"
        >
          Move →
        </button>
      </div>
    </div>
  );
};

export default TaskCard;

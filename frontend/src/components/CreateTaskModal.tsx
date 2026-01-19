import React, { useState } from 'react';
import * as api from '../services/api';

type Task = api.Task;

interface CreateTaskModalProps {
  onClose: () => void;
  onCreate: (task: Partial<Task>) => Promise<void>; // Promiseを返すように変更
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        // 親（Dashboard）の保存処理が終わるのを待つ
        await onCreate({
          title,
          description,
          priority,
          status: 'todo',
        });
        
        // 成功した場合のみ、入力をクリアする
        setTitle('');
        setDescription('');
        setPriority('medium');
      } catch (error) {
        // エラー時は入力を残す
        console.error('Failed to submit task:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Task Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              autoFocus
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Task['priority'])}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${
                isSubmitting ? 'bg-green-300' : 'bg-green-500 hover:bg-green-700'
              } text-white font-bold py-2 px-4 rounded`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;


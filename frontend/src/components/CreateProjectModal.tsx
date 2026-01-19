import React, { useState } from 'react';

// プロパティ（引数）の型定義
interface CreateProjectModalProps {
  onClose: () => void;
  // onCreate が終わるまで待てるように Promise を返り値に設定
  onCreate: (name: string, description: string) => Promise<void>;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // プロジェクト名が空でないかチェック
    if (name.trim() && !isSubmitting) {
      try {
        setIsSubmitting(true);
        
        // サーバーへの保存が終わるまで待機
        await onCreate(name, description);
        
        // 成功した場合のみ、入力をクリアして閉じる
        setName('');
        setDescription('');
        onClose();
      } catch (error) {
        // エラーが起きた場合は、入力内容を消さずに残す
        console.error("プロジェクトの作成に失敗しました:", error);
        alert("作成に失敗しました。ログを確認してください。");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Project</h2>
        
        <form onSubmit={handleSubmit}>
          {/* プロジェクト名入力欄 */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Project Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter project name"
              required
              autoFocus
            />
          </div>

          {/* 説明欄（Optional） */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="What is this project about?"
              // required を外して、空でもOKにしています
            />
          </div>

          {/* ボタンエリア */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${
                isSubmitting ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-700'
              } text-white font-bold py-2 px-4 rounded transition shadow-md`}
            >
              {isSubmitting ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;
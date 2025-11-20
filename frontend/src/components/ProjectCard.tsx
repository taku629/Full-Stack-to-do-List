import React from 'react';
import * as api from '../services/api';

type Project = api.Project;

interface ProjectCardProps {
  project: Project;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isSelected,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`p-4 rounded-lg cursor-pointer transition-all ${
        isSelected
          ? 'bg-blue-500 text-white shadow-lg'
          : 'bg-white text-gray-800 hover:shadow-md'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1">{project.name}</h3>
          <p className={`text-sm ${isSelected ? 'text-blue-100' : 'text-gray-600'}`}>
            {project.description || 'No description'}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm('Are you sure you want to delete this project?')) {
              onDelete();
            }
          }}
          className={`ml-2 ${
            isSelected ? 'text-white hover:text-red-200' : 'text-red-500 hover:text-red-700'
          }`}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;

import React from 'react';
import { CustomNodeModel } from './types';
import '../../styles/components/CustomNode.css';

interface CustomNodeProps {
  node: CustomNodeModel;
  depth: number;
  isOpen: boolean;
  onToggle: (id: CustomNodeModel['id']) => void;
  onDelete: (path: string) => void;
  onSelect: () => void;
}

export const CustomNode: React.FC<CustomNodeProps> = ({
  node,
  depth,
  isOpen,
  onToggle,
  onDelete,
  onSelect,
}) => {
  const indent = depth * 24;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(node.id);
  };

  return (
    <div
      className={`tree-node ${node.data?.fileType}`}
      style={{ paddingLeft: indent }}
      onClick={onSelect}
    >
      <div className="node-content">
        {node.droppable && (
          <span
            className={`arrow ${isOpen ? 'open' : ''}`}
            onClick={handleToggle}
          >
            ▶
          </span>
        )}
        <span className="icon">{node.data?.icon}</span>
        <span className="text">{node.text}</span>
        <button
          className="delete-button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(node.id as string);
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}; 
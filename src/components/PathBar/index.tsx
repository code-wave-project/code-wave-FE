import React from 'react';
import '../../styles/components/PathBar.css';
interface PathBarProps {
  openFiles: string[];
  activeFile?: string;
  onClose: (filePath: string) => void;
  onSelect: (filePath: string) => void;
}

const PathBar: React.FC<PathBarProps> = ({ openFiles, activeFile, onClose, onSelect }) => {
  return (
    <div className="tab-bar">
      {openFiles.map((filePath) => {
        const fileName = filePath.split('/').pop() || '';
        const isActive = filePath === activeFile;
        
        return (
          <div 
            key={filePath}
            className={`tab ${isActive ? 'active' : ''}`}
            onClick={() => onSelect(filePath)}
          >
            <span className="tab-text">{fileName}</span>
            <button 
              className="tab-close" 
              onClick={(e) => {
                e.stopPropagation();
                onClose(filePath);
              }}
            >
              x
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PathBar; 
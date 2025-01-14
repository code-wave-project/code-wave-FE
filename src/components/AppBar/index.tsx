import React from 'react';
import { VscChevronDown, VscAccount, VscBell } from 'react-icons/vsc';
import '../../styles/components/AppBar.css';

interface AppBarProps {
  currentPage?: string;
}

const AppBar: React.FC<AppBarProps> = ({ currentPage = 'Current Page' }) => {
  return (
    <div className="app-bar">
      <div className="app-bar-right">
        <button className="app-bar-button">
          <VscAccount size={24}/>
        </button>
      </div>
    </div>
  );
};

export default AppBar; 
import React from 'react';
import { VscFiles, VscSettingsGear, VscCommentDiscussion } from 'react-icons/vsc';
import { TbSunHigh } from 'react-icons/tb';

import '../../styles/components/SideBar.css';

interface SideBarProps {
	activeTab: string;
	onTabChange: (tab: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ activeTab, onTabChange }) => {
	const menuItems = [
		{ id: 'files', icon: VscFiles, label: '파일 탐색기' },
		{ id: 'chat', icon: VscCommentDiscussion, label: '채팅' },
		{ id: 'settings', icon: VscSettingsGear, label: '설정' },
	];

	return (
		<div className="sidebar-container">
			<div className="sidebar-menu">
				{menuItems.map(({ id, icon: Icon, label }) => (
					<button
						key={id}
						className={`sidebar-item ${activeTab === id ? 'active' : ''}`}
						onClick={() => onTabChange(id)}
						title={label}>
						<Icon size={24} />
					</button>
				))}
			</div>
			<div className="sidebar-bottom">
				<button className="sidebar-item" title="설정">
					<TbSunHigh size={24} />
				</button>
			</div>
		</div>
	);
};

export default SideBar;

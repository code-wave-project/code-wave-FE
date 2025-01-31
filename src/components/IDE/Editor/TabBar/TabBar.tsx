import React from 'react';

import { TabBar as TabBarContainer, Tab, TabTitle, CloseButton } from './TabBar.styles';
import CloseIcon from '@/assets/icons/dashboard_menu_new.svg?react';
import { TabBarProps } from './TabBar.d';

export const TabBar: React.FC<TabBarProps> = ({ tabs, activeTabId, onTabClick, onTabClose }) => {
	return (
		<TabBarContainer>
			{tabs.map(tab => (
				<Tab key={tab.id} isActive={tab.id === activeTabId} onClick={() => onTabClick(tab.id)}>
					<TabTitle>{tab.title}</TabTitle>
					<CloseButton onClick={e => onTabClose(tab.id, e)}>
						<CloseIcon />
					</CloseButton>
				</Tab>
			))}
		</TabBarContainer>
	);
};

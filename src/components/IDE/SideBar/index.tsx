import React from 'react';
import { Container, Logo, SidebarIcon, ThemeToggle } from '../../../styles/IDE/SideBar.style';
import logoDashboard from '../../../assets/logos/logo_dashboard.png';
import EditorMenuExplorer from '../../../assets/icons/editor_menu_explorer.svg?react';
import EditorMenuChat from '../../../assets/icons/editor_menu_chat.svg?react';
import EditorMenuPrettier from '../../../assets/icons/editor_menu_prettier.svg?react';
import EditorBottomOn from '../../../assets/icons/editor_bottom_on.svg?react';

interface SideBarProps {
	onSidePanelChange: (panel: string | null) => void;
	activePanel?: string | null;
}

const SideBar: React.FC<SideBarProps> = ({ onSidePanelChange, activePanel }) => {
	return (
		<Container>
			<Logo>
				<img src={logoDashboard} alt="logo" />
			</Logo>
			<SidebarIcon
				$active={activePanel === 'files'}
				onClick={() => onSidePanelChange(activePanel === 'files' ? null : 'files')}>
				<EditorMenuExplorer />
			</SidebarIcon>
			<SidebarIcon
				$active={activePanel === 'chat'}
				onClick={() => onSidePanelChange(activePanel === 'chat' ? null : 'chat')}>
				<EditorMenuChat />
			</SidebarIcon>
			<SidebarIcon
				$active={activePanel === 'settings'}
				onClick={() => onSidePanelChange(activePanel === 'settings' ? null : 'settings')}>
				<EditorMenuPrettier />
			</SidebarIcon>
			<ThemeToggle>
				<EditorBottomOn />
			</ThemeToggle>
		</Container>
	);
};

export default SideBar;

import styled from 'styled-components';
import { PanelType } from '../../../pages/IDE';
import { IconButton } from '@components/IDE/SideBar/IconButton/IconButton';
import FileIcon from '@assets/icons/editor_menu_explorer.svg?react';
import ChatIcon from '@assets/icons/editor_menu_chat.svg?react';
import LogoImage from '@assets/logos/logo_dashboard.png';

const SidebarContainer = styled.div`
	width: 5rem;
	min-width: 5rem;
	background-color: #333;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const NavButtonList = styled.nav`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const Logo = styled.div`
	width: 100%;
	height: 7rem;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1rem;
	margin-bottom: 1rem;
`;

const LogoImg = styled.img`
	padding: 2rem 0;
	margin-bottom: 1rem;
	border-bottom: 1px solid #fff;
`;

export interface SidebarProps {
	openPanel: PanelType;
	onPanelToggle: (panel: 'files' | 'chat') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ openPanel, onPanelToggle }) => {
	return (
		<SidebarContainer>
			<Logo>
				<LogoImg src={LogoImage} alt="Logo" />
			</Logo>
			<NavButtonList>
				<IconButton $isActive={openPanel === 'files'} onClick={() => onPanelToggle('files')} icon={<FileIcon />} />
				<IconButton $isActive={openPanel === 'chat'} onClick={() => onPanelToggle('chat')} icon={<ChatIcon />} />
			</NavButtonList>
		</SidebarContainer>
	);
};

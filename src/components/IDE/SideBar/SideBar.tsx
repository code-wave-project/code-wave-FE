import { IconButton } from '@components/IDE/SideBar/IconButton/IconButton';
import FileIcon from '@assets/icons/editor_menu_explorer.svg?react';
import ChatIcon from '@assets/icons/editor_menu_chat.svg?react';
import LogoImage from '@assets/logos/logo_dashboard.png';
import SettingsIcon from '@assets/icons/editor_menu_prettier.svg?react';
import { SidebarContainer, NavButtonList, Logo, LogoImg } from './SideBar.styles';
import { SidebarProps } from './SideBar.d';

export const Sidebar: React.FC<SidebarProps> = ({ openPanel, onPanelToggle }) => {
	return (
		<SidebarContainer>
			<Logo>
				<LogoImg src={LogoImage} alt="Logo" />
			</Logo>
			<NavButtonList>
				<IconButton $isActive={openPanel === 'files'} onClick={() => onPanelToggle('files')} icon={<FileIcon />} />
				<IconButton $isActive={openPanel === 'chat'} onClick={() => onPanelToggle('chat')} icon={<ChatIcon />} />
				<IconButton
					$isActive={openPanel === 'CodeStyle'}
					onClick={() => onPanelToggle('CodeStyle')}
					icon={<SettingsIcon />}
				/>
			</NavButtonList>
		</SidebarContainer>
	);
};

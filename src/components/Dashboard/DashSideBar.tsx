import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '@components/Dashboard/DashSideBar.style';

import DashMenu from '@components/Dashboard/DashMenu';
import Logo from '@assets/logos/logo_dashboard_side.svg';
import LightMode from '@assets/icons/theme_light.svg';
import DarkMode from '@/assets/icons/theme_dark.svg';

import MenuIcon from '@assets/icons/dashboard_menu_project.svg?react';
import RecentIcon from '@assets/icons/dashboard_menu_recent.svg?react';

interface DashSideBarProps {
	selectedMenu: 'all' | 'recent';
	setSelectedMenu: (menu: 'all' | 'recent') => void;
}

function DashSideBar({ selectedMenu, setSelectedMenu }: DashSideBarProps) {
	const navigate = useNavigate();
	// 다크 모드 상태
	const [isDarkMode, setIsDarkMode] = useState(false);

	// 다크 모드 적용
	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.style.filter = 'invert(100%) hue-rotate(180deg)';
			document.documentElement.style.webkitFilter = 'invert(100%) hue-rotate(180deg)';
		} else {
			document.documentElement.style.filter = '';
			document.documentElement.style.webkitFilter = '';
		}
	}, [isDarkMode]);

	const handleNavLinkClick = (path: string): void => {
		navigate(path);
	};

	return (
		<>
			<S.DashSideBar>
				<S.TopSpace>
					<S.Logo src={Logo} alt="CodeWave" onClick={() => handleNavLinkClick('/')} />
					<S.Line />
					<S.SelectSpace>
						<DashMenu
							icon={MenuIcon}
							title="모든 프로젝트"
							selected={selectedMenu === 'all'}
							onClick={() => setSelectedMenu('all')}
						/>
						<DashMenu
							icon={RecentIcon}
							title="최근 프로젝트"
							selected={selectedMenu === 'recent'}
							onClick={() => setSelectedMenu('recent')}
						/>
					</S.SelectSpace>
				</S.TopSpace>
				<S.Mode
					src={isDarkMode ? DarkMode : LightMode}
					alt={isDarkMode ? '다크 모드' : '라이트 모드'}
					onClick={() => setIsDarkMode(prev => !prev)}
				/>
			</S.DashSideBar>
		</>
	);
}
export default DashSideBar;

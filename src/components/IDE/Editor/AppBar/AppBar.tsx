import React, { useState, useRef } from 'react';
import {
	AppBarContainer,
	LeftSection,
	RightSection,
	HomeButton,
	ProfileSection,
	ProfileCircle,
	DropdownMenu,
	MenuItem,
} from './AppBar.styles';
import HomeIcon from '@/assets/icons/editor_home.svg?react';
import DropdownIcon from '@/assets/icons/icon_dropdown.svg?react';
import { useOnClickOutside } from '@/hooks/common/useOnClickOutside';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '@/hooks/auth/useLogout';

export const AppBar: React.FC = () => {
	const navigate = useNavigate();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const { logout, isLoading } = useLogout();

	useOnClickOutside(dropdownRef, () => setIsDropdownOpen(false));

	const handleProfileClick = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const handleLogout = () => {
		setIsDropdownOpen(false);
		logout();
	};

	return (
		<AppBarContainer>
			<LeftSection>
				<HomeButton
					onClick={() => {
						navigate('/dashboard');
					}}>
					<HomeIcon />
				</HomeButton>
			</LeftSection>
			<RightSection>
				<ProfileSection ref={dropdownRef} onClick={handleProfileClick}>
					<ProfileCircle />
					<DropdownIcon />
					{isDropdownOpen && (
						<DropdownMenu>
							<MenuItem>User1</MenuItem>
							<MenuItem onClick={handleLogout} disabled={isLoading}>
								{isLoading ? '로그아웃 중...' : '로그아웃'}
							</MenuItem>
						</DropdownMenu>
					)}
				</ProfileSection>
			</RightSection>
		</AppBarContainer>
	);
};

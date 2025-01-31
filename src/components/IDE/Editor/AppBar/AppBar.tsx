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
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

export const AppBar: React.FC = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useOnClickOutside(dropdownRef, () => setIsDropdownOpen(false));

	const handleProfileClick = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const handleLogout = () => {
		// 로그아웃 로직 구현
		setIsDropdownOpen(false);
	};

	return (
		<AppBarContainer>
			<LeftSection>
				<HomeButton>
					<HomeIcon />
				</HomeButton>
			</LeftSection>
			<RightSection>
				<ProfileSection ref={dropdownRef} onClick={handleProfileClick}>
					<ProfileCircle />
					<DropdownIcon />
					{isDropdownOpen && (
						<DropdownMenu>
							<MenuItem onClick={handleLogout}>로그아웃</MenuItem>
						</DropdownMenu>
					)}
				</ProfileSection>
			</RightSection>
		</AppBarContainer>
	);
};

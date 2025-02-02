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
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

export const AppBar: React.FC = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();

	useOnClickOutside(dropdownRef, () => setIsDropdownOpen(false));

	const handleProfileClick = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const handleLogout = async () => {
		try {
			const { error } = await supabase.auth.signOut();
			if (error) throw error;

			navigate('/login'); // 로그인 페이지로 리다이렉션
		} catch (error) {
			console.error('로그아웃 중 오류 발생:', error);
		}
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

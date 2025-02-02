import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as S from '@components/Dashboard/Header.style';

import UserIcon from '@assets/icons/icon_user.svg';
import Dropdown from '@assets/icons/icon_dropdown.svg';
import EditIcon from '@assets/icons/project_edit.svg';
import LogoutIcon from '@assets/icons/user_logout.svg';

function Header() {
	const navigate = useNavigate();
	const location = useLocation();
	const [isDropdownVisible, setDropdownVisible] = useState(false);

	const handleNavLinkClick = (path: string): void => {
		navigate(path);
	};

	const handleLogoutClick = () => {
		localStorage.removeItem('accessToken');
		navigate('/');
	};

	const handleMenuClick = () => {
		setDropdownVisible(!isDropdownVisible);
	};

	const closeMenuClick = () => {
		setDropdownVisible(false);
	};

	useEffect(() => {
		setDropdownVisible(false);
	}, [location]);

	return (
		<>
			<S.Header>
				<S.Group onClick={handleMenuClick}>
					<S.UserIcon src={UserIcon} alt="유저" />
					<S.Dropdown src={Dropdown} alt="드롭다운" />
				</S.Group>

				{isDropdownVisible && (
					<>
						<S.Background onClick={closeMenuClick} />
						<S.DropdownContainer $isVisible={isDropdownVisible}>
							<S.DropdownItem onClick={() => handleNavLinkClick('/profile')} $isLogOut={false}>
								<S.UserIcon src={UserIcon} alt="프로필" />
								user
								<S.Icon src={EditIcon} alt="프로필 수정" />
							</S.DropdownItem>
							<S.DropdownItem onClick={() => handleLogoutClick()} $isLogOut={true}>
								<S.Icon src={LogoutIcon} alt="로그아웃" />
								로그아웃
							</S.DropdownItem>
						</S.DropdownContainer>
					</>
				)}
			</S.Header>
		</>
	);
}
export default Header;

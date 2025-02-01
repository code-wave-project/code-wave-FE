import styled from 'styled-components';
import { theme } from '@styles/theme';

interface VisibleProps {
	$isVisible: boolean;
}

interface LogOutProps {
	$isLogOut: boolean;
}

export const Header = styled.div`
	width: 100%;
	height: 72px;
	display: flex;
	align-items: center;
	background-color: ${theme.COLOR.GRAY100};
	padding: 0 48px;
`;

export const Group = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
	cursor: pointer;
`;

export const UserIcon = styled.img`
	width: 32px;
`;

export const Dropdown = styled.img`
	width: 24px;
`;

export const DropdownContainer = styled.div<VisibleProps>`
	z-index: 2500;
	position: absolute;
	text-align: center;
	justify-content: center;
	align-items: flex-start;
	top: 60px;
	gap: 16px;
	padding: 16px;
	display: ${props => (props.$isVisible ? 'flex' : 'none')};
	flex-direction: column;
	background-color: ${theme.COLOR.WHITE};
	border: 1px solid ${theme.COLOR.BLUE500};
	border-radius: 10px;
`;

export const DropdownItem = styled.div<LogOutProps>`
	width: 100%;
	cursor: pointer;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 4px;

	color: ${props => (props.$isLogOut ? theme.COLOR.PINK500 : theme.COLOR.GRAY600)};
	font-feature-settings:
		'liga' off,
		'clig' off;
	font-size: 16px;
	font-weight: 400;
	line-height: normal;
`;

export const Background = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: none;
	top: 0;
	left: 0;
	z-index: 2000;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Icon = styled.img`
	width: 24px;
`;

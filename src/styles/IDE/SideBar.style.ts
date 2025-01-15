import styled from 'styled-components';
import { COLOR } from '../../const/color';

interface SidebarIconProps {
	$active?: boolean;
}

export const Container = styled.div`
	width: 140px;
	background-color: ${COLOR.WHITE};
	border-right: 4px solid ${COLOR.GRAY200};
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Logo = styled.div`
	height: 140px;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	img {
		width: 48px;
		padding-bottom: 24px;
		border-bottom: 1px solid ${COLOR.GRAY200};
	}
`;

export const SidebarIcon = styled.div<SidebarIconProps>`
	width: 100%;
	height: 80px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-left: 4px solid ${props => (props.$active ? COLOR.BLUE500 : 'transparent')};
	cursor: pointer;
	color: ${props => (props.$active ? COLOR.BLUE500 : COLOR.GRAY500)};

	&:hover {
		color: ${COLOR.BLUE500};
	}

	svg {
		width: 48px;
		height: 48px;
	}
`;

export const ThemeToggle = styled(SidebarIcon)`
	margin-top: auto;
	margin-bottom: 20px;
`;

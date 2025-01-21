import styled from 'styled-components';
import { COLOR } from '../../const/color';

interface SidebarIconProps {
	$active?: boolean;
}

export const Container = styled.div`
	width: 8rem;
	min-width: 8rem;
	background-color: ${COLOR.WHITE};
	border-right: 4px solid ${COLOR.GRAY100};
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Logo = styled.div`
	width: 100%;
	height: 140px;
	display: flex;
	justify-content: center;
	align-items: center;
	img {
		width: 40px;
		padding-bottom: 24px;
		border-bottom: 1px solid ${COLOR.GRAY200};
	}
`;

export const SidebarIcon = styled.div<SidebarIconProps>`
	width: 100%;
	height: 60px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-left: 4px solid ${props => (props.$active ? COLOR.BLUE500 : 'transparent')};
	cursor: pointer;
	color: ${props => (props.$active ? COLOR.BLUE500 : COLOR.GRAY500)};

	transition: color 0.2s ease-in-out;

	&:hover {
		color: ${props => (props.$active ? COLOR.BLUE500 : COLOR.BLUE300)};
	}

	svg {
		width: 32px;
		height: 32px;
	}
`;

export const ThemeToggle = styled(SidebarIcon)`
	margin-top: auto;
	margin-bottom: 20px;
`;

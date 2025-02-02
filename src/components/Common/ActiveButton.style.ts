import styled from 'styled-components';
import { theme } from '@styles/theme';
interface ButtonProps {
	$isActive: boolean;
	$isLarge: boolean;
}

export const ButtonContainer = styled.div<ButtonProps>`
	width: ${props => (props.$isLarge ? '220px' : '160px')};
	padding: 15px 0;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	border: ${props => (props.$isActive ? `1px solid ${theme.COLOR.WHITE}` : `1px solid ${theme.COLOR.BLUE500}`)};
	background: ${props => (props.$isActive ? theme.COLOR.BLUE500 : theme.COLOR.WHITE)};
	cursor: pointer;
	pointer-events: ${props => (props.$isActive ? 'auto' : 'none')};

	color: ${props => (props.$isActive ? theme.COLOR.WHITE : theme.COLOR.BLUE500)};
	font-size: 16px;
	font-weight: 500;
`;

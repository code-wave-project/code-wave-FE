import styled from 'styled-components';
import { theme } from '@styles/theme';

interface ButtonProps {
	$isLarge: boolean;
}

export const ButtonContainer = styled.div<ButtonProps>`
	width: ${props => (props.$isLarge ? '220px' : '160px')};
	padding: 15px 0;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	border: 1px solid ${theme.COLOR.BLUE500};
	background: ${theme.COLOR.WHITE};
	cursor: pointer;

	color: ${theme.COLOR.BLUE500};
	font-size: 16px;
	font-weight: 500;
`;

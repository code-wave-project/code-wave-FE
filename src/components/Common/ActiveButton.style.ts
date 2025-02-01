import styled from 'styled-components';
import { COLOR } from '@/const/color';

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
	border: ${props => (props.$isActive ? `1px solid ${COLOR.WHITE}` : `1px solid ${COLOR.BLUE500}`)};
	background: ${props => (props.$isActive ? COLOR.BLUE500 : COLOR.WHITE)};
	cursor: pointer;
	pointer-events: ${props => (props.$isActive ? 'auto' : 'none')};

	color: ${props => (props.$isActive ? COLOR.WHITE : COLOR.BLUE500)};
	font-size: 16px;
	font-weight: 500;
`;

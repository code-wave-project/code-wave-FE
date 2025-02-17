import styled from 'styled-components';
import { theme } from '@styles/theme';

interface InputTextProps {
	$isInvalid: boolean;
}

export const Input = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export const LabelSpace = styled.div`
	display: flex;
	align-items: flex-start;
`;

export const Label = styled.div`
	color: ${theme.COLOR.GRAY700};
	font-size: 14px;
	font-weight: 500;
`;

export const Essential = styled.div`
	color: ${theme.COLOR.BLUE500};
	font-size: 16px;
	font-weight: 400;
`;

export const InputText = styled.input<InputTextProps>`
	width: 336px;
	padding: 8px;
	margin-top: -8px;

	font-family: 'Pretendard';
	font-size: 14px;
	font-weight: 400;
	color: ${theme.COLOR.GRAY700};
	border-bottom: ${props =>
		props.$isInvalid ? `1px solid ${theme.COLOR.PINK500}` : `1px solid ${theme.COLOR.GRAY300}`};
	outline: none;
	background: ${theme.COLOR.WHITE};

	&:focus {
		border-bottom: ${props =>
			props.$isInvalid ? `1px solid ${theme.COLOR.PINK500}` : `1px solid ${theme.COLOR.GRAY300}`};
	}
`;

export const Warn = styled.div`
	color: ${theme.COLOR.PINK500};
	font-size: 10px;
	font-weight: 400;
`;

import styled from 'styled-components';
import { theme } from '@styles/theme';

export const Space = styled.div`
	width: 100vw;
	height: 100dvh;
	display: flex;
	justify-content: center;
	align-items: flex-end;
	padding-bottom: 80px;

	position: absolute;
	top: 0;
	left: 0;
`;

export const ToastContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 16px 12px;
	background-color: ${theme.COLOR.WHITE};
	border-radius: 20px;
	box-shadow: 0 4px 13px 0 ${theme.COLOR.FILTER};

	color: ${theme.COLOR.GRAY600};
	font-size: 12px;
	font-weight: 500;
`;

export const Logo = styled.img`
	width: 20px;
`;

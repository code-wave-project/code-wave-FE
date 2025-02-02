import styled from 'styled-components';
import { theme } from '@styles/theme';

export const ModalWrap = styled.div`
	border-radius: 16px;
	width: 192px;
	padding: 32px 16px;
	z-index: 2;
	background-color: ${theme.COLOR.WHITE};
	border: 2px solid ${theme.COLOR.BLUE500};
`;

export const ModalSpace = styled.div`
	width: 100vw;
	height: 100dvh;
	display: flex;
	justify-content: center;
	align-items: center;

	position: absolute;
	top: 0;
	left: 0;
`;

export const ModalBackground = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: ${theme.COLOR.FILTER};
	top: 0;
	left: 0;
	z-index: 1;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
`;

export const Logo = styled.img`
	width: 48px;
`;

export const Text = styled.div`
	color: ${theme.COLOR.BLUE500};
	font-size: 16px;
	font-weight: 500;
`;

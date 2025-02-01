import styled from 'styled-components';
import { COLOR } from '@/const/color';

export const ModalWrap = styled.div`
	border-radius: 16px;
	padding: 32px;
	z-index: 2;
	background-color: ${COLOR.WHITE};
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
	background-color: rgba(127, 130, 149, 0.3);
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
	gap: 32px;
`;

export const TextGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export const Title = styled.div`
	color: ${COLOR.GRAY700};
	font-size: 16px;
	font-weight: 500;
`;

export const ButtonGroup = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
`;

export const DescriptionGroup = styled.div`
	display: flex;
	align-items: center;
	gap: 29px;

	font-size: 14px;
`;

export const Label = styled.div`
	width: 49px;
	color: ${COLOR.GRAY700};
	font-weight: 500;
`;

export const Text = styled.div`
	color: ${COLOR.GRAY600};
	font-weight: 400;
	text-transform: uppercase;
`;

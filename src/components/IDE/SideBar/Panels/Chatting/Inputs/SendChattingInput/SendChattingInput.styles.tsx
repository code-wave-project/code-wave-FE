import { COLOR } from '@/const/color';
import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0.5rem;
	background-color: ${COLOR.GRAY100};
	padding: 0 0.5rem;
`;

export const SendInput = styled.input`
	width: 100%;
	height: 100%;
	outline: none;
	border: none;
	padding: 0;
	background-color: transparent;
`;

export const SendIconContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 3rem;
	height: 2rem;
	background-color: transparent;
	padding-left: 0.5rem;
`;

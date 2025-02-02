import styled from 'styled-components';
import { theme } from '@styles/theme';

export const DashSideBar = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 32px 20px;
	width: 240px;
	height: 100dvh;
	background-color: ${theme.COLOR.WHITE};
	border-right: 3px solid ${theme.COLOR.GRAY100};
`;

export const Logo = styled.img`
	width: 200px;
	cursor: pointer;
`;

export const TopSpace = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

export const Line = styled.div`
	margin-top: 16px;
	width: 100%;
	height: 2px;
	background-color: ${theme.COLOR.GRAY200};
`;

export const SelectSpace = styled.div`
	display: flex;
	flex-direction: column;
	gap: 11px;
	margin-left: -20px;

	font-size: 16px;
	line-height: normal;
	text-transform: uppercase;
`;

export const Mode = styled.img`
	width: 48px;
	padding-left: 12px;
	cursor: pointer;
`;

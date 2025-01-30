import styled from 'styled-components';
import { COLOR } from '@/const/color';

export const Dashboard = styled.div`
	display: flex;
	width: 100vw;
`;

export const Space = styled.div`
	width: calc(100vw - 240px);
	background-color: ${COLOR.GRAY100};
`;

export const TopSpace = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	padding: 32px 39px 32px 48px;
`;

export const Title = styled.div`
	color: ${COLOR.GRAY700};
	font-size: 32px;
	font-weight: 700;
	line-height: normal;
`;

export const ButtonSpace = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

export const Button = styled.div`
	color: ${COLOR.BLUE500};
	font-feature-settings:
		'liga' off,
		'clig' off;
	font-size: 16px;
	font-weight: 400;
	line-height: normal;
	cursor: pointer;
`;

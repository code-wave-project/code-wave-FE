import styled from 'styled-components';
import { COLOR } from '@/const/color';

export const Dashboard = styled.div`
	display: flex;
	width: 100vw;
	height: 100vh;
	overflow-y: hidden;
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

export const ProjectSpace = styled.div`
	display: flex;
	padding: 0 39px 30px 48px;
	width: calc(100vw - 240px);
	height: calc(100vh - 174px);
	overflow-y: scroll;
	flex-wrap: wrap;
	row-gap: 24px;
	column-gap: 16px;
`;

export const NonProject = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	width: 100%;
	height: 100%;

	color: ${COLOR.GRAY500};
	font-feature-settings:
		'liga' off,
		'clig' off;
	font-size: 16px;
	font-weight: 400;
`;

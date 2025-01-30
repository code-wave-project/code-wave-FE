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

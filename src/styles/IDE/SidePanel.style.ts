import styled from 'styled-components';
import { COLOR } from '../../const/color';

export const Container = styled.div`
	width: 315px;
	background-color: ${COLOR.WHITE};
	border-right: 1px solid ${COLOR.GRAY200};
	display: flex;
	flex-direction: column;
`;

export const Header = styled.div`
	padding: 24px 24px 16px 24px;
	background-color: ${COLOR.WHITE};
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 18px;
	font-weight: 400;
`;

export const Content = styled.div`
	flex: 1;
	overflow-y: auto;
	padding: 10px;
`;

export const CloseButton = styled.span`
	font-size: 16px;
	cursor: pointer;

	&:hover {
		color: ${COLOR.GRAY700};
	}
`;

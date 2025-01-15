import styled from 'styled-components';
import { COLOR } from '../../../const/color';

export const TreeContainer = styled.div`
	height: 100%;

	ul {
		height: 100%;
	}
`;

export const TreeNodeWrapper = styled.div<{ depth: number }>`
	display: flex;
	align-items: center;
	height: 24px;
	padding-left: ${props => props.depth * 20}px;

	&:hover {
		background-color: ${COLOR.GRAY100};
	}
`;

export const NodeContent = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	width: 100%;

	&:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
`;

export const ActionButtons = styled.div`
	display: flex;
	align-items: center;
	margin-left: auto;
	margin-right: 20px;
	gap: 8px;
`;

export const ActionButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	background: transparent;
	border: none;
	padding: 0;
	border-radius: 8px;
	cursor: pointer;
	color: inherit;

	svg {
		width: 24px;
		height: 24px;
	}

	&:hover {
		background: ${COLOR.GRAY200};
	}
`;

export const NodeIcon = styled.div<{ isOpen?: boolean }>`
	display: flex;
	align-items: center;
	transform: rotate(${props => (props.isOpen ? '0deg' : '-90deg')});
`;

export const NodeText = styled.span`
	user-select: none;
	font-size: 18px;
`;

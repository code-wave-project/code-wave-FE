import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

export const ChattingHeader = styled.div`
	height: 48px;
	background-color: #252526;
	font-size: 16px;
	font-weight: 600;
	background-color: #fff;
	flex-shrink: 0;
`;

export const ChattingContent = styled.div`
	flex: 1;
	overflow: hidden;
	background-color: #fff111;
`;

export const ChattingInput = styled.div`
	height: 48px;
	background-color: #fff;
`;

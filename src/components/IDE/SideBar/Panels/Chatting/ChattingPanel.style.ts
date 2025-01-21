import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

export const ChattingHeader = styled.div`
	height: 4rem;
	background-color: #252526;
	font-size: 16px;
	padding: 0 1rem 1rem 1rem;
	border-bottom: 3px solid #fff;
`;

export const ChattingContent = styled.div`
	flex: 1;
	overflow: hidden;
`;

export const ChattingInput = styled.div`
	border-top: 3px solid #fff;
	height: 5rem;
	padding: 1rem;
`;

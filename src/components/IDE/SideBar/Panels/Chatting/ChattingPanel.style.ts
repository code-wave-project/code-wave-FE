import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

export const ChattingHeader = styled.div`
	background-color: ${({ theme }) => theme.COLOR.WHITE};
	font-size: 1rem;
	padding: 0 1rem;
`;

export const ChattingContent = styled.div`
	flex: 1;
	overflow: hidden;
	padding: 0 1rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const ChattingInput = styled.div`
	border-top: 3px solid ${({ theme }) => theme.COLOR.GRAY200};
	height: 5rem;
	padding: 1rem;
`;

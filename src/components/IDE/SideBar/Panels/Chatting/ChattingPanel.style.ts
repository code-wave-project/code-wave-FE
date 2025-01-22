import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

export const ChattingHeader = styled.div`
	height: 4rem;
	background-color: ${({ theme }) => theme.COLOR.WHITE};
	font-size: 16px;
	padding: 0 1rem 1rem 1rem;
	border-bottom: 3px solid ${({ theme }) => theme.COLOR.GRAY200};
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

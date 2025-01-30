import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

export const EditorContainer = styled.div`
	flex: 1;
	overflow: hidden;
	margin-top: 0.5rem;
`;

export const EmptyContainer = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.COLOR.GRAY100};
`;

export const EmptyText = styled.div`
	color: ${({ theme }) => theme.COLOR.GRAY500};
	font-size: 0.875rem;
`;

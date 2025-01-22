import styled from 'styled-components';

export const PanelContainer = styled.div`
	width: 20rem;
	background-color: ${({ theme }) => theme.COLOR.WHITE};
	height: 100%;
	border-right: 3px solid ${({ theme }) => theme.COLOR.GRAY200};
	transition: transform 0.2s ease;
	display: flex;
	flex-direction: column;
`;

export const PanelHeader = styled.div`
	height: 3rem;
	padding: 1rem;
	background-color: ${({ theme }) => theme.COLOR.WHITE};
	font-size: 1rem;
	font-weight: 600;
	color: ${({ theme }) => theme.COLOR.GRAY700};
	flex-shrink: 0;
`;

export const PanelContent = styled.div`
	flex: 1;
	overflow: hidden;
`;

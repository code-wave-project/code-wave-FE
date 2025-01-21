import styled from 'styled-components';

export const PanelContainer = styled.div`
	width: 20rem;
	background-color: #252526;
	height: 100%;
	border-left: 3px solid #fff;
	border-right: 3px solid #fff;
	transition: transform 0.2s ease;
	display: flex;
	flex-direction: column;
`;

export const PanelHeader = styled.div`
	height: 3rem;
	padding: 1rem;
	background-color: #252526;
	font-size: 1rem;
	font-weight: 600;
	color: #fff;
	flex-shrink: 0;
`;

export const PanelContent = styled.div`
	flex: 1;
	overflow: hidden;
`;

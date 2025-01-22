import styled from 'styled-components';

export const TabBar = styled.div`
	display: flex;
	background-color: ${({ theme }) => theme.COLOR.WHITE};
	border-bottom: 3px solid ${({ theme }) => theme.COLOR.GRAY200};
	height: 2.5rem;
	overflow-x: auto;

	&::-webkit-scrollbar {
		height: 0;
		width: 0;
	}
`;

export const Tab = styled.div<{ isActive: boolean }>`
	display: flex;
	align-items: center;
	padding: 0 16px;
	min-width: 120px;
	max-width: 200px;
	height: 100%;
	cursor: pointer;
	background-color: ${({ isActive, theme }) => (isActive ? theme.COLOR.GRAY200 : theme.COLOR.WHITE)};

	&:hover {
		background-color: ${({ isActive, theme }) => (isActive ? theme.COLOR.GRAY200 : theme.COLOR.GRAY100)};
	}
`;

export const TabTitle = styled.span`
	flex: 1;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size: 0.875rem;
	color: ${({ theme }) => theme.COLOR.GRAY700};
`;

export const CloseButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 1rem;
	height: 1rem;
	margin-left: 8px;
	border: none;
	cursor: pointer;
	padding: 0;
	transform: rotate(45deg);
	color: ${({ theme }) => theme.COLOR.GRAY500};

	&:hover {
		svg {
			width: 1rem;
			height: 1rem;
			border-radius: 50%;
			background-color: ${({ theme }) => theme.COLOR.GRAY300};
		}
	}
`;

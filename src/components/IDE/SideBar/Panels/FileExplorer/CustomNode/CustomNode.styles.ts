import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	align-items: center;
	height: 2rem;
	padding-inline-end: 0.5rem;
	cursor: pointer;
	position: relative;

	&:hover {
		background-color: ${({ theme }) => theme.COLOR.GRAY100};

		.action-buttons {
			display: flex;
		}
	}
`;

export const ToggleButton = styled.div<{ isOpen?: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2rem;
	height: 2rem;
	color: ${({ theme }) => theme.COLOR.GRAY500};
	cursor: pointer;

	svg {
		transform: rotate(${({ isOpen }) => (isOpen ? '0deg' : '-90deg')});
		transition: transform 0.2s ease;
	}
`;

export const Label = styled.div`
	color: ${({ theme }) => theme.COLOR.GRAY700};
	flex: 1;
`;

export const ActionButtons = styled.div`
	display: none;
	align-items: center;
	margin-left: auto;
`;

export const ActionButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2rem;
	height: 2rem;
	background: none;
	border: none;
	cursor: pointer;
	padding: 0;
	color: ${({ theme }) => theme.COLOR.GRAY500};

	&:hover {
		background-color: ${({ theme }) => theme.COLOR.GRAY200};
		color: ${({ theme }) => theme.COLOR.GRAY700};
	}

	svg {
		width: 1.5rem;
		height: 1.5rem;

		path {
			fill: ${({ theme }) => theme.COLOR.GRAY500};
		}
	}
`;

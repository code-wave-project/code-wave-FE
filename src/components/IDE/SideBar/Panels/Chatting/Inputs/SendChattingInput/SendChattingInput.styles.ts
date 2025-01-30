import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0.5rem;
	background-color: ${({ theme }) => theme.COLOR.GRAY100};
	padding: 0 0.5rem;
`;

export const SendInput = styled.input`
	width: 100%;
	height: 100%;
	outline: none;
	border: none;
	padding: 0;
	background-color: transparent;
`;

export const SendIconContainer = styled.div<{ hasMessage: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 3rem;
	height: 2rem;
	background-color: transparent;
	cursor: ${({ hasMessage }) => (hasMessage ? 'pointer' : 'default')};

	:hover {
		border-radius: 0.5rem;
		background-color: ${({ hasMessage, theme }) => (hasMessage ? theme.COLOR.GRAY200 : 'transparent')};
	}

	svg {
		width: 1.5rem;
		height: 1.5rem;
		path {
			fill: ${({ hasMessage, theme }) => (hasMessage ? theme.COLOR.BLUE500 : theme.COLOR.GRAY400)};
		}
	}
`;

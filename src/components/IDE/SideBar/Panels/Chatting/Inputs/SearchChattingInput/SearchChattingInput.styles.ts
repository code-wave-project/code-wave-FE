import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0.5rem;
	padding: 0 0.5rem;
	background-color: ${({ theme }) => theme.COLOR.GRAY100};
`;

export const SearchInput = styled.input`
	width: 100%;
	height: 100%;
	outline: none;
	border: none;
	background-color: transparent;
`;

export const LeadingIcon = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2rem;
	height: 2rem;
	background-color: transparent;
	padding-right: 0.5rem;
`;

export const TrailingIconList = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const TrailingIcon = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2rem;
	height: 2rem;
	background-color: transparent;
	cursor: pointer;

	:hover {
		border-radius: 0.5rem;
		background-color: ${({ theme }) => theme.COLOR.GRAY200};
	}

	svg {
		width: 1.5rem;
		height: 1.5rem;
	}
`;

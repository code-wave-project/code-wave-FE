import styled from 'styled-components';

export const AppBar = styled.div`
	display: flex;
	align-items: center;
	height: 4rem;
	padding: 0 1rem;
	background-color: ${({ theme }) => theme.COLOR.WHITE};
	border-bottom: 3px solid ${({ theme }) => theme.COLOR.GRAY200};
`;

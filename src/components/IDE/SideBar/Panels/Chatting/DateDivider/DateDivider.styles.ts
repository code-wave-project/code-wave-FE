import styled from 'styled-components';

export const DividerContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0.5rem 0;
	width: 100%;
`;

export const DividerContent = styled.div`
	background-color: ${({ theme }) => theme.COLOR.WHITE};
	padding: 0.5rem 1rem;
	border-radius: 1rem;
	font-size: 0.75rem;
	color: ${({ theme }) => theme.COLOR.GRAY600};
`;

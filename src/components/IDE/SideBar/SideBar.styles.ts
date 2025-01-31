import styled from 'styled-components';

export const SidebarContainer = styled.div`
	width: 5rem;
	min-width: 5rem;
	background-color: ${({ theme }) => theme.COLOR.WHITE};
	display: flex;
	flex-direction: column;
	align-items: center;
	border-right: 3px solid ${({ theme }) => theme.COLOR.GRAY200};
`;

export const NavButtonList = styled.nav`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const Logo = styled.div`
	width: 100%;
	height: 7rem;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1rem;
	margin-bottom: 1rem;
`;

export const LogoImg = styled.img`
	padding: 2rem 0;
	margin-bottom: 1rem;
	border-bottom: 2px solid ${({ theme }) => theme.COLOR.GRAY200};
`;

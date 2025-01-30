import styled from 'styled-components';

export const AppBarContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 4rem;
	padding: 0 1rem;
	background-color: ${({ theme }) => theme.COLOR.WHITE};
	border-bottom: 1px solid ${({ theme }) => theme.COLOR.GRAY200};
`;

export const LeftSection = styled.div`
	display: flex;
	align-items: center;
`;

export const RightSection = styled.div`
	display: flex;
	align-items: center;
`;

export const HomeButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2rem;
	height: 2rem;
	border: none;
	background: none;
	cursor: pointer;
	color: ${({ theme }) => theme.COLOR.GRAY600};

	&:hover {
		color: ${({ theme }) => theme.COLOR.GRAY700};
	}

	svg {
		width: 1.5rem;
		height: 1.5rem;
	}
`;

export const ProfileSection = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	cursor: pointer;
	gap: 0.5rem;

	svg {
		width: 1.5rem;
		height: 1.5rem;
	}
`;

export const ProfileCircle = styled.div`
	width: 2rem;
	height: 2rem;
	border-radius: 50%;
	background-color: ${({ theme }) => theme.COLOR.GRAY300};
`;

export const DropdownMenu = styled.div`
	position: absolute;
	top: 100%;
	right: 0;
	margin-top: 0.5rem;
	background-color: ${({ theme }) => theme.COLOR.WHITE};
	border: 1px solid ${({ theme }) => theme.COLOR.GRAY200};
	border-radius: 0.5rem;
	box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.1);
	min-width: 10rem;
	z-index: 1000;
`;

export const MenuItem = styled.button`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	width: 100%;
	padding: 0.5rem 1rem;
	border: none;
	background: none;
	cursor: pointer;
	color: ${({ theme }) => theme.COLOR.GRAY700};
	font-size: 0.875rem;

	svg {
		width: 1.5rem;
		height: 1.5rem;
	}

	&:hover {
		background-color: ${({ theme }) => theme.COLOR.GRAY100};
		color: ${({ theme }) => theme.COLOR.GRAY700};
	}
`;

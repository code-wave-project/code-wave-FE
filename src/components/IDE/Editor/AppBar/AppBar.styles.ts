import styled from 'styled-components';

export const AppBarContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 48px;
	padding: 0 16px;
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
	width: 32px;
	height: 32px;
	border: none;
	background: none;
	cursor: pointer;
	color: ${({ theme }) => theme.COLOR.GRAY600};

	&:hover {
		color: ${({ theme }) => theme.COLOR.GRAY700};
	}

	svg {
		width: 24px;
		height: 24px;
	}
`;

export const ProfileSection = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	cursor: pointer;
	gap: 8px;

	svg {
		width: 16px;
		height: 16px;
	}
`;

export const ProfileCircle = styled.div`
	width: 32px;
	height: 32px;
	border-radius: 50%;
	background-color: ${({ theme }) => theme.COLOR.GRAY300};
`;

export const DropdownMenu = styled.div`
	position: absolute;
	top: 100%;
	right: 0;
	margin-top: 8px;
	background-color: ${({ theme }) => theme.COLOR.WHITE};
	border: 1px solid ${({ theme }) => theme.COLOR.GRAY200};
	border-radius: 8px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	min-width: 160px;
	z-index: 1000;
`;

export const MenuItem = styled.button`
	display: flex;
	align-items: center;
	gap: 8px;
	width: 100%;
	padding: 8px 16px;
	border: none;
	background: none;
	cursor: pointer;
	color: ${({ theme }) => theme.COLOR.GRAY700};
	font-size: 0.875rem;

	svg {
		width: 16px;
		height: 16px;
	}

	&:hover {
		background-color: ${({ theme }) => theme.COLOR.GRAY100};
		color: ${({ theme }) => theme.COLOR.GRAY700};
	}
`;

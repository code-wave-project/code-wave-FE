import styled from 'styled-components';

export const Button = styled.button<{ $isActive: boolean }>`
	width: 100%;
	height: 5rem;
	background: ${props => (props.$isActive ? props.theme.COLOR.BLUE200 : 'none')};
	padding: 1rem;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 0.3s ease-in-out;

	color: ${props => (props.$isActive ? props.theme.COLOR.BLUE500 : props.theme.COLOR.GRAY500)};

	border-left: 4px solid ${props => (props.$isActive ? props.theme.COLOR.BLUE500 : 'transparent')};

	&:hover {
		color: ${props => props.theme.COLOR.BLUE500};
	}

	svg {
		width: 2rem;
		height: 2rem;

		path {
			fill: currentColor;
			stroke: currentColor;
		}
	}
`;

import styled from 'styled-components';

const Button = styled.button<{ $isActive: boolean }>`
	width: 100%;
	height: 5rem;
	background: ${props => (props.$isActive ? 'rgba(255, 255, 255, 0.2)' : 'none')};
	padding: 1rem;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;

	border-left: 4px solid ${props => (props.$isActive ? '#fff' : 'transparent')};

	&:hover {
		background-color: rgba(255, 255, 255, 0.1);
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

export interface IconButtonProps {
	$isActive: boolean;
	onClick: () => void;
	icon: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({ $isActive, onClick, icon }) => {
	return (
		<Button $isActive={$isActive} onClick={onClick}>
			{icon}
		</Button>
	);
};

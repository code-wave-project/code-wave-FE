import * as S from '@components/Common/ActiveButton.style';

interface ButtonProps {
	onClick?: React.MouseEventHandler<HTMLDivElement>;
	text: string;
	isActive: boolean;
	isLarge: boolean;
}

function ActiveButton({ onClick, text, isActive, isLarge }: ButtonProps) {
	return (
		<>
			<S.ButtonContainer onClick={onClick} $isActive={isActive} $isLarge={isLarge}>
				{text}
			</S.ButtonContainer>
		</>
	);
}
export default ActiveButton;

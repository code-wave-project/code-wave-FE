import * as S from '@components/Common/Button.style';

interface ButtonProps {
	onClick?: React.MouseEventHandler<HTMLDivElement>;
	text: string;
	isLarge: boolean;
}

function Button({ onClick, text, isLarge }: ButtonProps) {
	return (
		<>
			<S.ButtonContainer onClick={onClick} $isLarge={isLarge}>
				{text}
			</S.ButtonContainer>
		</>
	);
}
export default Button;

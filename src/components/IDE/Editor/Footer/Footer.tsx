import styled from 'styled-components';
import LintIcon from '@/assets/icons/editor_error.svg?react';
import ErrorIcon from '@/assets/icons/chat_reset.svg?react';
import TerminalIcon from '@/assets/icons/editor_terminal.svg?react';

const FooterContainer = styled.div`
	display: flex;
	padding: 0 1rem;
	justify-content: flex-end;
	align-items: center;
	height: 2.5rem;
	border-top: 3px solid ${({ theme }) => theme.COLOR.GRAY200};
	background-color: ${({ theme }) => theme.COLOR.WHITE};
`;

const FooterButtonContainer = styled.div`
	display: flex;
	gap: 1rem;
`;

const FooterButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2rem;
	height: 2rem;
	border: none;
`;

const Footer: React.FC = () => {
	return (
		<FooterContainer>
			<FooterButtonContainer>
				<FooterButton>
					1
					<LintIcon />
				</FooterButton>
				<FooterButton>
					2
					<ErrorIcon />
				</FooterButton>
				<FooterButton>
					<TerminalIcon />
				</FooterButton>
			</FooterButtonContainer>
		</FooterContainer>
	);
};

export default Footer;

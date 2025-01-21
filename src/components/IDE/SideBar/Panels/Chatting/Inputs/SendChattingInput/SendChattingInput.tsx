import React from 'react';
import SendIcon from '@/assets/icons/chat_sand_disable.svg?react';
import { Container, SendInput, SendIconContainer } from './SendChattingInput.styles';

export const SendChattingInput: React.FC = () => {
	return (
		<Container>
			<SendInput placeholder="메시지 보내기" />
			<SendIconContainer>
				<SendIcon />
			</SendIconContainer>
		</Container>
	);
};

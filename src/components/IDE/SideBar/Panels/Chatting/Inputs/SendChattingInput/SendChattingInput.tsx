import React, { useState } from 'react';
import SendIcon from '@/assets/icons/chat_sand_disable.svg?react';
import { Container, SendInput, SendIconContainer } from './SendChattingInput.styles';

export const SendChattingInput: React.FC = () => {
	const [message, setMessage] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.value);
	};

	return (
		<Container>
			<SendInput placeholder="메시지 보내기" value={message} onChange={handleChange} />
			<SendIconContainer hasMessage={Boolean(message)}>
				<SendIcon />
			</SendIconContainer>
		</Container>
	);
};

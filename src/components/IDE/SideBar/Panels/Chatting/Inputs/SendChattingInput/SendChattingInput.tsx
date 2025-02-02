import React, { useState } from 'react';
import SendIcon from '@/assets/icons/chat_sand_disable.svg?react';
import { Container, SendInput, SendIconContainer } from './SendChattingInput.styles';
import { useChat } from '@/contexts/ChatContext';

export const SendChattingInput: React.FC = () => {
	const [message, setMessage] = useState('');
	const { sendMessage } = useChat();

	const handleSendMessage = () => {
		if (message.trim()) {
			sendMessage(message);
			setMessage('');
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleSendMessage();
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.value);
	};

	return (
		<Container>
			<SendInput placeholder="메시지 보내기" value={message} onChange={handleChange} onKeyPress={handleKeyPress} />
			<SendIconContainer hasMessage={Boolean(message)} onClick={handleSendMessage}>
				<SendIcon />
			</SendIconContainer>
		</Container>
	);
};

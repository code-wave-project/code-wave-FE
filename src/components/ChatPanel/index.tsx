import React, { useState } from 'react';
import { ChatPanelProps } from './types';
import '../../styles/components/ChatPanel.css';

interface Message {
	id: string;
	userId: string;
	text: string;
	timestamp: Date;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ collaborators, onUserJoin, onUserLeave }) => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [newMessage, setNewMessage] = useState('');

	const handleSendMessage = (e: React.FormEvent) => {
		e.preventDefault();
		if (!newMessage.trim()) return;

		const message: Message = {
			id: Date.now().toString(),
			userId: 'current-user', // 실제 사용자 ID로 대체 필요
			text: newMessage,
			timestamp: new Date(),
		};

		setMessages(prev => [...prev, message]);
		setNewMessage('');
	};

	return (
		<div className="chat-panel">
			<div className="collaborators-list">
				<h3>Collaborators</h3>
				{collaborators.map(user => (
					<div key={user.id} className="collaborator">
						{user.name} - {user.status}
					</div>
				))}
			</div>

			<div className="chat-messages">
				{messages.map(message => (
					<div key={message.id} className="message">
						<span className="user">{message.userId}</span>
						<span className="text">{message.text}</span>
					</div>
				))}
			</div>

			<form onSubmit={handleSendMessage} className="message-input">
				<input
					type="text"
					value={newMessage}
					onChange={e => setNewMessage(e.target.value)}
					placeholder="Type a message..."
				/>
				<button type="submit">Send</button>
			</form>
		</div>
	);
};

export default ChatPanel;

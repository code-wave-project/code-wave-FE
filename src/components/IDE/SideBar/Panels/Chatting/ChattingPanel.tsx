import { ChattingBubble } from './ChattingBubble/ChattingBubble';
import { ChattingContent, ChattingHeader, ChattingInput, Container } from './ChattingPanel.style';
import { SendChattingInput } from './Inputs/SendChattingInput/SendChattingInput';
import { ChatMessage } from './ChattingPanel.d';
import { DateDivider } from './DateDivider/DateDivider';
import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { format } from 'date-fns';
import { supabase } from '@/lib/supabase';

export const ChattingPanel: React.FC<{ projectId: string }> = () => {
	const { messages: chatMessages } = useChat();
	const [currentUserId, setCurrentUserId] = useState<string | null>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [chatMessages]); // 메시지가 변경될 때마다 스크롤

	useEffect(() => {
		// 현재 로그인한 사용자의 ID를 가져옴
		const getCurrentUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			setCurrentUserId(user?.id || null);
		};
		getCurrentUser();
	}, []);

	// Supabase 메시지를 UI 메시지 형식으로 변환
	const formattedMessages: ChatMessage[] = chatMessages.map(msg => ({
		id: msg.id,
		message: msg.content,
		isMe: msg.user_id === currentUserId,
		timestamp: format(new Date(msg.created_at), 'HH:mm'),
		date: format(new Date(msg.created_at), 'yyyy-MM-dd'),
		username: msg.user_id, // TODO: 사용자 목
	}));

	return (
		<Container>
			<ChattingHeader></ChattingHeader>
			<ChattingContent>
				{formattedMessages.map((message, index) => {
					// 이전 메시지가 있고, 같은 사용자의 메시지인 경우 유저네임을 숨김
					const showUsername =
						index === 0 ||
						formattedMessages[index - 1].username !== message.username ||
						formattedMessages[index - 1].isMe !== message.isMe;

					// 다음 메시지가 없거나, 현재 메시지와 다음 메시지의 타임스탬프가 다른 경우에만 타임스탬프 표시
					const showTimestamp =
						index === formattedMessages.length - 1 || formattedMessages[index + 1].timestamp !== message.timestamp;

					// 날짜가 바뀌는 경우 또는 첫 메시지인 경우 날짜 구분선 표시
					const showDateDivider = index === 0 || message.date !== formattedMessages[index - 1]?.date;

					return (
						<React.Fragment key={message.id}>
							{showDateDivider && <DateDivider date={message.date} />}
							<ChattingBubble
								message={message.message}
								isMe={message.isMe}
								timestamp={message.timestamp}
								username={message.username}
								showUsername={showUsername}
								showTimestamp={showTimestamp}
							/>
						</React.Fragment>
					);
				})}
				<div ref={messagesEndRef} /> {/* 스크롤 타겟 요소 */}
			</ChattingContent>
			<ChattingInput>
				<SendChattingInput />
			</ChattingInput>
		</Container>
	);
};

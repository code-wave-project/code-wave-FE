import { ChattingBubble } from './ChattingBubble/ChattingBubble';
import { ChattingContent, ChattingHeader, ChattingInput, Container } from './ChattingPanel.style';
import { SendChattingInput } from './Inputs/SendChattingInput/SendChattingInput';
import { ChatMessage } from './ChattingPanel.d';
import { DateDivider } from './DateDivider/DateDivider';
import React, { useEffect, useState } from 'react';

export const ChattingPanel: React.FC = () => {
	const [messages, setMessages] = useState<ChatMessage[]>([]);

	// 임시 데이터 - 실제로는 API나 웹소켓에서 받아올 예정
	useEffect(() => {
		const dummyMessages: ChatMessage[] = [
			{
				id: '1',
				message: '안녕하세요!',
				isMe: false,
				timestamp: '12:00',
				date: '2024-01-17',
				username: 'USER02',
			},
			{
				id: '2',
				message: '이건 상대방 채팅입니다.',
				isMe: false,
				timestamp: '12:00',
				date: '2024-01-17',
				username: 'USER02',
			},
			{
				id: '3',
				message: '네, 안녕하세요!',
				isMe: true,
				timestamp: '13:02',
				date: '2025-01-22',
				username: 'ME',
			},
		];

		setMessages(dummyMessages);
	}, []);

	return (
		<Container>
			<ChattingHeader></ChattingHeader>
			<ChattingContent>
				{messages.map((message, index) => {
					// 이전 메시지가 있고, 같은 사용자의 메시지인 경우 유저네임을 숨김
					const showUsername =
						index === 0 ||
						messages[index - 1].username !== message.username ||
						messages[index - 1].isMe !== message.isMe;

					// 다음 메시지가 없거나, 현재 메시지와 다음 메시지의 타임스탬프가 다른 경우에만 타임스탬프 표시
					const showTimestamp = index === messages.length - 1 || messages[index + 1].timestamp !== message.timestamp;

					// 날짜가 바뀌는 경우 또는 첫 메시지인 경우 날짜 구분선 표시
					const showDateDivider = index === 0 || message.date !== messages[index - 1]?.date;

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
			</ChattingContent>
			<ChattingInput>
				<SendChattingInput />
			</ChattingInput>
		</Container>
	);
};

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import ChatSearch from '../../../../assets/icons/chat_search.svg?react';
import ChatSend from '../../../../assets/icons/chat_send_disable.svg?react';
import ChatUp from '../../../../assets/icons/chat_up.svg?react';
import ChatDown from '../../../../assets/icons/chat_down.svg?react';
import ChatReset from '../../../../assets/icons/chat_reset.svg?react';
import {
	Container,
	Header,
	SearchContainer,
	SearchWrapper,
	SearchInputWrapper,
	SearchIcon,
	ClearButton,
	NavButtonsContainer,
	NavButton,
	ChatContainer,
	InputContainer,
	ChatInput,
	SendButton,
	MessageContainer,
	UserId,
	MessageRow,
	MessageBubble,
	TimeStamp,
	DateDivider,
	DateText,
	HighlightSpan,
	SearchInput,
} from '../../../../styles/IDE/Panel/ChatPanel.style';

interface HighlightedTextProps {
	text: string;
	messageIndex: number;
	isMine: boolean;
	fullMessage: string;
}

interface Message {
	id: string;
	message: string;
	timestamp: string;
	date: string;
	userId: string;
	isMine: boolean;
}

const ChatPanel: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState<Message[]>([
		{
			id: '1',
			userId: 'ME',
			message:
				'채팅은 오른쪽 상단의 버튼으로도 조정이 됩니다. 왼쪽 버튼은 사이드 바가 켜지고, 꺼지고 아래쪽 버튼은 터미널이 켜지고 꺼집니다. 맞춰서 UI도 수정해봤어요',
			timestamp: '12:00',
			date: '2025-01-14',
			isMine: true,
		},
		{
			id: '2',
			userId: 'ME',
			message: '터미널은 오른쪽 하단에 있는 터미널 버튼으로도 키고 끌 수 있어요',
			timestamp: '12:00',
			date: '2025-01-14',
			isMine: true,
		},
		{
			id: '3',
			userId: 'USER02',
			message: '검색은 내 채팅은 색반전\n상대방 채팅은 강조로\n터미널\n이런식으로요',
			timestamp: '12:01',
			date: '2025-01-15',
			isMine: false,
		},
		{
			id: '4',
			userId: 'USER02',
			message: '검색은 내 채팅은 색반전\n상대방 채팅은 강조로\n터미널\n이런식으로요',
			timestamp: '12:01',
			date: '2025-01-15',
			isMine: false,
		},
		{
			id: '5',
			userId: 'USER03',
			message: '검색은 내 채팅은 색반전\n상대방 채팅은 강조로\n터미널\n이런식으로요',
			timestamp: '12:01',
			date: '2025-01-15',
			isMine: false,
		},
		{
			id: '6',
			userId: 'USER02',
			message: '검색은 내 채팅은 색반전\n상대방 채팅은 강조로\n터미널\n이런식으로요',
			timestamp: '12:01',
			date: '2025-01-15',
			isMine: false,
		},
		{
			id: '7',
			userId: 'USER02',
			message: '검색은 내 채팅은 색반전\n상대방 채팅은 강조로\n터미널\n이런식으로요',
			timestamp: '12:01',
			date: '2025-01-15',
			isMine: false,
		},
		{
			id: '8',
			userId: 'ME',
			message: '검색은 내 채팅은 색반전\n상대방 채팅은 강조로\n터미널\n이런식으로요',
			timestamp: '12:02',
			date: '2025-01-15',
			isMine: true,
		},
	]);
	const [currentMatchIndex, setCurrentMatchIndex] = useState(-1);

	// 검색 결과 계산
	const { totalMatches, messageMatches } = useMemo(() => {
		if (!searchQuery.trim()) {
			return { totalMatches: 0, messageMatches: [] };
		}

		let total = 0;
		const matches = messages.map(msg => {
			const regex = new RegExp(searchQuery, 'gi');
			const count = (msg.message.match(regex) || []).length;
			const startIndex = total;
			total += count;
			return { count, startIndex };
		});

		return { totalMatches: total, messageMatches: matches };
	}, [messages, searchQuery]);

	// 검색 결과 이동
	const navigateSearch = (direction: 'prev' | 'next') => {
		if (totalMatches === 0) return;

		if (direction === 'next') {
			setCurrentMatchIndex(prev => (prev + 1) % totalMatches);
		} else {
			setCurrentMatchIndex(prev => (prev - 1 + totalMatches) % totalMatches);
		}
	};

	// 검색 결과 초기화
	useEffect(() => {
		setCurrentMatchIndex(totalMatches > 0 ? 0 : -1);
	}, [searchQuery, totalMatches]);

	// 검색 결과 하이라이트
	const HighlightedText: React.FC<HighlightedTextProps> = ({ text, messageIndex, isMine, fullMessage }) => {
		if (!searchQuery.trim()) return <>{text}</>;

		const parts = [];
		const regex = new RegExp(`(${searchQuery})`, 'gi');
		let lastIndex = 0;
		let matchIndex = messageMatches[messageIndex].startIndex;

		const previousMatches =
			fullMessage.slice(0, fullMessage.indexOf(text)).match(new RegExp(searchQuery, 'gi'))?.length || 0;
		matchIndex += previousMatches;

		let match;
		while ((match = regex.exec(text)) !== null) {
			const matchText = match[0];
			const startIndex = match.index;

			if (lastIndex !== startIndex) {
				parts.push(text.slice(lastIndex, startIndex));
			}

			parts.push(
				<HighlightSpan key={`highlight-${matchIndex}`} isMine={isMine} isActive={matchIndex === currentMatchIndex}>
					{matchText}
				</HighlightSpan>,
			);

			lastIndex = startIndex + matchText.length;
			matchIndex++;
		}

		if (lastIndex < text.length) {
			parts.push(text.slice(lastIndex));
		}

		return <>{parts}</>;
	};

	// 날짜 표시 형식을 변환하는 함수
	const getDisplayDate = (dateString: string) => {
		const date = new Date(dateString);
		const today = new Date();
		const yesterday = new Date(today);
		yesterday.setDate(yesterday.getDate() - 1);

		// 날짜를 YYYY-MM-DD 형식으로 변환하는 함수
		const formatToDateString = (date: Date) => {
			return date.toISOString().split('T')[0];
		};

		if (dateString === formatToDateString(today)) {
			return '오늘';
		} else if (dateString === formatToDateString(yesterday)) {
			return '어제';
		}

		// 1월 1일과 같은 형식으로 반환
		return `${date.getMonth() + 1}월 ${date.getDate()}일`;
	};

	const renderMessages = () => {
		let currentDate = '';

		return messages.map((msg, index) => {
			const showDateDivider = currentDate !== msg.date;
			const showTimestamp =
				index === messages.length - 1 ||
				msg.timestamp !== messages[index + 1]?.timestamp ||
				msg.userId !== messages[index + 1]?.userId;

			const showUserId =
				!msg.isMine &&
				(index === 0 || messages[index - 1]?.userId !== msg.userId || messages[index - 1]?.date !== msg.date);

			if (showDateDivider) {
				currentDate = msg.date;
			}

			return (
				<React.Fragment key={msg.id}>
					{showDateDivider && (
						<DateDivider>
							<DateText>{getDisplayDate(msg.date)}</DateText>
						</DateDivider>
					)}
					<MessageContainer isMine={msg.isMine}>
						{showUserId && <UserId>{msg.userId}</UserId>}
						<MessageRow isMine={msg.isMine}>
							<MessageBubble isMine={msg.isMine}>
								{msg.message.split('\n').map((line, i) => (
									<React.Fragment key={i}>
										<HighlightedText text={line} messageIndex={index} isMine={msg.isMine} fullMessage={msg.message} />
										{i !== msg.message.split('\n').length - 1 && <br />}
									</React.Fragment>
								))}
							</MessageBubble>
							{showTimestamp && <TimeStamp>{msg.timestamp}</TimeStamp>}
						</MessageRow>
					</MessageContainer>
				</React.Fragment>
			);
		});
	};

	// 메시지 전송 함수
	const handleSendMessage = (message: string) => {
		if (!message.trim()) return;

		const newMessage: Message = {
			id: Date.now().toString(), // 유니크한 ID 생성
			message: message.trim(),
			timestamp: new Date().toLocaleTimeString('ko-KR', {
				hour: '2-digit',
				minute: '2-digit',
			}),
			date: new Date().toISOString().split('T')[0],
			userId: 'Me', // 실제 사용자 ID로 대체 필요
			isMine: true,
		};

		setMessages(prev => [...prev, newMessage]);
		setMessage(''); // 입력창 초기화
	};

	// Enter 키 처리
	const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement> & { isComposing?: boolean }) => {
		// Enter가 아니면 무시
		if (e.key !== 'Enter') return;
		// Shift + Enter면 무시
		if (e.shiftKey) return;
		// 한글 입력 중이면 무시
		if (e.nativeEvent.isComposing) return;

		e.preventDefault();
		const currentMessage = e.currentTarget.value.replace(/\n/g, '');
		if (!currentMessage.trim()) return; // 빈 메시지면 무시

		setMessage('');
		handleSendMessage(currentMessage);
	}, []);

	return (
		<Container>
			<Header>
				<SearchContainer>
					<SearchWrapper>
						<SearchInputWrapper>
							<SearchIcon>
								<ChatSearch />
							</SearchIcon>
							<SearchInput value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="채팅 검색" />
						</SearchInputWrapper>
						{searchQuery && (
							<ClearButton
								onClick={() => {
									setSearchQuery('');
									setCurrentMatchIndex(-1);
								}}>
								<ChatReset />
							</ClearButton>
						)}
					</SearchWrapper>
					{searchQuery && (
						<NavButtonsContainer>
							<NavButton onClick={() => navigateSearch('prev')}>
								<ChatUp />
							</NavButton>
							<NavButton onClick={() => navigateSearch('next')}>
								<ChatDown />
							</NavButton>
						</NavButtonsContainer>
					)}
				</SearchContainer>
			</Header>
			<ChatContainer>{renderMessages()}</ChatContainer>

			<InputContainer>
				<ChatInput
					value={message}
					onChange={e => setMessage(e.target.value)}
					placeholder="메시지 보내기"
					rows={1}
					onKeyDown={handleKeyDown}
					onInput={e => {
						const target = e.target as HTMLTextAreaElement;
						target.style.height = 'auto';
						const newHeight = Math.min(target.scrollHeight, 96);
						target.style.height = `${newHeight}px`;
					}}
				/>
				<SendButton disabled={!message} onClick={() => handleSendMessage(message)}>
					<ChatSend />
				</SendButton>
			</InputContainer>
		</Container>
	);
};

export default ChatPanel;

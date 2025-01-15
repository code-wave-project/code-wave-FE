import React, { useState, useMemo, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ChatSearch from '../../../../assets/icons/chat_search.svg?react';
import ChatSend from '../../../../assets/icons/chat_send_disable.svg?react';
import ChatUp from '../../../../assets/icons/chat_up.svg?react';
import ChatDown from '../../../../assets/icons/chat_down.svg?react';
import ChatReset from '../../../../assets/icons/chat_reset.svg?react';
import { COLOR } from '../../../../const/color';

interface ChatMessage {
	id: string;
	userId: string;
	message: string;
	timestamp: string;
	date: string;
	isMine: boolean;
}

const ChatPanel: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState<ChatMessage[]>([
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
	]);
	const [currentMatchIndex, setCurrentMatchIndex] = useState(-1);
	const chatContainerRef = useRef<HTMLDivElement>(null);

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

	useEffect(() => {
		setCurrentMatchIndex(totalMatches > 0 ? 0 : -1);
	}, [searchQuery, totalMatches]);

	const navigateSearch = (direction: 'prev' | 'next') => {
		if (totalMatches === 0) return;

		if (direction === 'next') {
			setCurrentMatchIndex(prev => (prev + 1) % totalMatches);
		} else {
			setCurrentMatchIndex(prev => (prev - 1 + totalMatches) % totalMatches);
		}
	};

	const HighlightedText: React.FC<{
		text: string;
		messageIndex: number;
		isMine: boolean;
		fullMessage: string;
	}> = ({ text, messageIndex, isMine, fullMessage }) => {
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

	const renderMessages = () => {
		let currentDate = '';

		return messages.map((msg, index) => {
			const showDateDivider = currentDate !== msg.date;
			if (showDateDivider) {
				currentDate = msg.date;
				return (
					<React.Fragment key={msg.id}>
						<DateDivider>
							<DateText>{getDisplayDate(msg.date)}</DateText>
						</DateDivider>
						<MessageContainer isMine={msg.isMine}>
							{!msg.isMine && <UserId>{msg.userId}</UserId>}
							<MessageRow isMine={msg.isMine}>
								<MessageBubble isMine={msg.isMine}>
									{msg.message.split('\n').map((line, i) => (
										<React.Fragment key={i}>
											<HighlightedText text={line} messageIndex={index} isMine={msg.isMine} fullMessage={msg.message} />
											{i !== msg.message.split('\n').length - 1 && <br />}
										</React.Fragment>
									))}
								</MessageBubble>
								<TimeStamp>{msg.timestamp}</TimeStamp>
							</MessageRow>
						</MessageContainer>
					</React.Fragment>
				);
			}
			return (
				<MessageContainer key={msg.id} isMine={msg.isMine}>
					{!msg.isMine && <UserId>{msg.userId}</UserId>}
					<MessageRow isMine={msg.isMine}>
						<MessageBubble isMine={msg.isMine}>
							{msg.message.split('\n').map((line, i) => (
								<React.Fragment key={i}>
									<HighlightedText text={line} messageIndex={index} isMine={msg.isMine} fullMessage={msg.message} />
									{i !== msg.message.split('\n').length - 1 && <br />}
								</React.Fragment>
							))}
						</MessageBubble>
						<TimeStamp>{msg.timestamp}</TimeStamp>
					</MessageRow>
				</MessageContainer>
			);
		});
	};

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
			<ChatContainer ref={chatContainerRef}>{renderMessages()}</ChatContainer>

			<InputContainer>
				<ChatInput value={message} onChange={e => setMessage(e.target.value)} placeholder="채팅을 쓰면 이렇게 활성화" />
				<SendButton disabled={!message}>
					<ChatSend />
				</SendButton>
			</InputContainer>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	background: #ffffff;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 0px 16px 16px 16px;
	min-height: 48px;
	overflow: hidden;
	border-bottom: 4px solid ${COLOR.GRAY100};
`;

const SearchContainer = styled.div`
	position: relative;
	flex: 1;
	display: flex;
	align-items: center;
	gap: 8px;
	min-width: 0;
`;

const SearchWrapper = styled.div`
	display: flex;
	align-items: center;
	padding: 8px 12px;
	gap: 8px;
	background: ${COLOR.GRAY100};
	flex: 1;
	border-radius: 8px;
	min-width: 0;
`;

const SearchInputWrapper = styled.div`
	display: flex;
	align-items: center;
	flex: 1;
	min-width: 0;
`;

const SearchIcon = styled.div`
	color: ${COLOR.GRAY500};
	display: flex;
	align-items: center;
	margin-right: 8px;
`;

const SearchInput = styled.input`
	border: none;
	background: transparent;
	flex: 1;
	outline: none;
	font-size: 14px;
	color: ${COLOR.GRAY700};
	min-width: 0;
	width: 100%;

	&::placeholder {
		color: ${COLOR.GRAY500};
	}
`;

const ChatContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	overflow-y: auto;
	padding: 0px 16px;
	gap: 8px;
`;

const EmptyState = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	color: ${COLOR.GRAY500};
`;

const EmptyDescription = styled.p`
	font-size: 14px;
	color: ${COLOR.GRAY500};
	text-align: center;
	margin: 0;
`;

const InputContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 16px;
	border-top: 4px solid ${COLOR.GRAY100};
`;

const ChatInput = styled.input`
	flex: 1;
	border: none;
	background: ${COLOR.GRAY100};
	border-radius: 8px;
	padding: 12px;
	margin-right: 8px;
	outline: none;
	font-size: 14px;

	&::placeholder {
		color: ${COLOR.GRAY500};
	}
`;

const SendButton = styled.button<{ disabled: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 8px;

	background: none;
	border: none;
	padding: 8px;
	cursor: ${props => (props.disabled ? 'default' : 'pointer')};

	&:hover {
		svg {
			color: ${COLOR.BLUE500};
		}
	}

	svg {
		color: ${props => (props.disabled ? COLOR.GRAY500 : COLOR.BLUE400)};
	}
`;

const MessageContainer = styled.div<{ isMine: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: ${props => (props.isMine ? 'flex-end' : 'flex-start')};
	width: 100%;
	gap: 4px;
`;

const MessageRow = styled.div<{ isMine: boolean }>`
	display: flex;
	align-items: flex-end;
	gap: 8px;
	flex-direction: ${props => (props.isMine ? 'row-reverse' : 'row')};
`;

const UserId = styled.span`
	font-size: 12px;
	color: ${COLOR.GRAY500};
	margin-left: 8px;
`;

const MessageBubble = styled.div<{ isMine: boolean }>`
	background: ${props => (props.isMine ? COLOR.BLUE500 : COLOR.GRAY100)};
	color: ${props => (props.isMine ? COLOR.WHITE : COLOR.GRAY700)};
	padding: 8px 12px;
	border-radius: 12px;
	word-break: break-word;
	line-height: 1.4;
`;

const TimeStamp = styled.span`
	font-size: 12px;
	color: ${COLOR.GRAY500};
	margin: 0 8px;
	white-space: nowrap;
`;

const DateDivider = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	margin: 16px 0 0 0;

	&::before {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		height: 1px;
		background: ${COLOR.GRAY200};
		z-index: 0;
	}
`;

const DateText = styled.span`
	background: white;
	padding: 0 12px;
	font-size: 14px;
	color: ${COLOR.GRAY500};
	z-index: 1;
`;

const HighlightSpan = styled.span<{ isMine: boolean; isActive: boolean }>`
	background: ${props => (props.isMine ? COLOR.WHITE : COLOR.GRAY400)};
	color: ${props => (props.isMine ? COLOR.BLUE500 : props.isActive ? COLOR.BLACK : COLOR.GRAY700)};
	${props =>
		props.isActive &&
		`
		outline: 2px solid ${props.isMine ? COLOR.BLUE300 : COLOR.GRAY300};
	`}
`;

const NavButtonsContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

const NavButton = styled.button`
	border: none;
	background: transparent;
	padding: 2px 0px;
	color: ${COLOR.GRAY600};
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;

	svg {
		width: 24px;
		height: 24px;
	}

	&:hover:not(:disabled) {
		color: ${COLOR.GRAY700};
		background-color: ${COLOR.GRAY100};
		border-radius: 8px;
	}

	&:disabled {
		color: ${COLOR.GRAY400};
		cursor: default;
	}
`;

const ClearButton = styled.button`
	border: none;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${COLOR.GRAY500};
	font-size: 14px;
	cursor: pointer;
	padding: 0;

	&:hover {
		background: ${COLOR.GRAY300};
	}
`;

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

export default ChatPanel;

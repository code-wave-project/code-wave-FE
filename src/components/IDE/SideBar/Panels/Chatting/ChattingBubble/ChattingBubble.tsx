import React from 'react';
import { BubbleContainer, Username, MessageRow, BubbleContent, MessageText, Timestamp } from './ChattingBubble.styles';
import { ChattingBubbleProps } from './ChattingBubble.d';

export const ChattingBubble: React.FC<ChattingBubbleProps> = ({
	message,
	isMe,
	timestamp,
	username,
	showUsername = true,
	showTimestamp = true,
}) => {
	return (
		<BubbleContainer isMe={isMe}>
			{!isMe && showUsername && <Username>User</Username>}
			<MessageRow isMe={isMe}>
				<BubbleContent isMe={isMe}>
					<MessageText>{message}</MessageText>
				</BubbleContent>
				{showTimestamp && <Timestamp>{timestamp}</Timestamp>}
			</MessageRow>
		</BubbleContainer>
	);
};

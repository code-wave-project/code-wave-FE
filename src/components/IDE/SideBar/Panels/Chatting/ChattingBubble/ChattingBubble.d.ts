export interface ChattingBubbleProps {
	message: string;
	isMe: boolean;
	timestamp: string;
	username: string;
	showUsername?: boolean;
	showTimestamp?: boolean;
}

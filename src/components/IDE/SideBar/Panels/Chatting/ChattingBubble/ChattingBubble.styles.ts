import styled, { css } from 'styled-components';

export const BubbleContainer = styled.div<{ isMe: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: ${({ isMe }) => (isMe ? 'flex-end' : 'flex-start')};
	width: 100%;
`;

export const MessageContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Username = styled.span`
	font-size: 0.875rem;
	color: ${({ theme }) => theme.COLOR.GRAY600};
	margin-bottom: 0.25rem;
	padding-left: 0.5rem;
`;

export const MessageRow = styled.div<{ isMe: boolean }>`
	display: flex;
	align-items: flex-end;
	gap: 0.5rem;
	flex-direction: ${({ isMe }) => (isMe ? 'row-reverse' : 'row')};
`;

export const BubbleContent = styled.div<{ isMe: boolean }>`
	padding: 0.625rem 0.75rem;
	border-radius: 0.875rem;
	${({ isMe, theme }) =>
		isMe
			? css`
					background-color: ${theme.COLOR.BLUE500};
					color: ${theme.COLOR.WHITE};
				`
			: css`
					background-color: ${theme.COLOR.GRAY100};
					color: ${theme.COLOR.GRAY700};
				`}
`;

export const MessageText = styled.p`
	margin: 0;
	font-size: 0.875rem;
	line-height: 1.4;
	white-space: pre-wrap;
	word-break: break-word;
`;

export const Timestamp = styled.span`
	font-size: 0.75rem;
	color: ${({ theme }) => theme.COLOR.GRAY500};
	flex-shrink: 0;
`;

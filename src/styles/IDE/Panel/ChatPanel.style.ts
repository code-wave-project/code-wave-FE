import styled from 'styled-components';
import { COLOR } from '../../../const/color';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: calc(100vh - 81px);
	background: #ffffff;
	overflow: hidden;
`;

export const Header = styled.div`
	height: 64px;
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 0 16px 16px 16px;
	flex-shrink: 0;
	border-bottom: 4px solid ${COLOR.GRAY100};
`;

export const SearchContainer = styled.div`
	position: relative;
	flex: 1;
	display: flex;
	align-items: center;
	gap: 8px;
	min-width: 0;
`;

export const SearchWrapper = styled.div`
	display: flex;
	align-items: center;
	padding: 8px 12px;
	gap: 8px;
	background: ${COLOR.GRAY100};
	flex: 1;
	border-radius: 8px;
	min-width: 0;
`;

export const SearchInputWrapper = styled.div`
	display: flex;
	align-items: center;
	flex: 1;
	min-width: 0;
`;

export const SearchIcon = styled.div`
	color: ${COLOR.GRAY500};
	display: flex;
	align-items: center;
	margin-right: 8px;
`;

export const SearchInput = styled.input`
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

export const ChatContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	flex: 1;
	overflow-y: auto;
	min-height: 0;
	padding: 0 16px 32px 16px;

	/* 스크롤바 스타일링 */
	&::-webkit-scrollbar {
		width: 8px;
	}

	&::-webkit-scrollbar-track {
		background: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background: ${COLOR.GRAY200};
		border-radius: 4px;
	}

	&::-webkit-scrollbar-thumb:hover {
		background: ${COLOR.GRAY300};
	}
`;

export const InputContainer = styled.div`
	padding: 16px;
	flex-shrink: 0;
	border-top: 4px solid ${COLOR.GRAY100};
	display: flex;
	align-items: center;
	gap: 8px;
`;

export const ChatInput = styled.textarea`
	flex: 1;
	border: none;
	background: ${COLOR.GRAY100};
	border-radius: 8px;
	padding: 12px;
	margin-right: 8px;
	outline: none;
	font-size: 14px;
	resize: none;
	min-height: 40px;
	max-height: 96px; // 4줄 기준 (24px * 4)
	line-height: 20px;
	overflow-y: auto;
	font-family: inherit;

	&::placeholder {
		color: ${COLOR.GRAY500};
	}

	/* 스크롤바 스타일링 */
	&::-webkit-scrollbar {
		width: 4px;
	}

	&::-webkit-scrollbar-track {
		background: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background: ${COLOR.GRAY300};
		border-radius: 2px;
	}
`;

export const SendButton = styled.button<{ disabled: boolean }>`
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
			color: ${props => (props.disabled ? COLOR.GRAY500 : COLOR.BLUE500)};
		}
	}

	svg {
		color: ${props => (props.disabled ? COLOR.GRAY500 : COLOR.BLUE400)};
	}
`;

export const MessageContainer = styled.div<{ isMine: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: ${props => (props.isMine ? 'flex-end' : 'flex-start')};
	width: 100%;
	gap: 4px;
`;

export const MessageRow = styled.div<{ isMine: boolean }>`
	display: flex;
	align-items: flex-end;
	gap: 8px;
	flex-direction: ${props => (props.isMine ? 'row-reverse' : 'row')};
`;

export const UserId = styled.span`
	font-size: 12px;
	color: ${COLOR.GRAY500};
	margin-left: 8px;
`;

export const MessageBubble = styled.div<{ isMine: boolean }>`
	background: ${props => (props.isMine ? COLOR.BLUE500 : COLOR.GRAY100)};
	color: ${props => (props.isMine ? COLOR.WHITE : COLOR.GRAY700)};
	padding: 8px 12px;

	border-radius: 12px;
	word-break: break-word;
	line-height: 1.4;
`;

export const TimeStamp = styled.span`
	font-size: 12px;
	color: ${COLOR.GRAY500};
	margin: 0 8px;
	white-space: nowrap;
`;

export const DateDivider = styled.div`
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

export const DateText = styled.span`
	background: white;
	padding: 0 12px;
	font-size: 14px;
	color: ${COLOR.GRAY500};
	z-index: 1;
`;

export const HighlightSpan = styled.span<{ isMine: boolean; isActive: boolean }>`
	background: ${props => (props.isMine ? COLOR.WHITE : COLOR.GRAY400)};
	color: ${props => (props.isMine ? COLOR.BLUE500 : props.isActive ? COLOR.BLACK : COLOR.GRAY700)};
	${props =>
		props.isActive &&
		`
		outline: 2px solid ${props.isMine ? COLOR.BLUE300 : COLOR.GRAY300};
	`}
`;

export const NavButtonsContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

export const NavButton = styled.button`
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

export const ClearButton = styled.button`
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

import type { ChattingPanelProps } from './ChattingPanel.d';
import { ChattingContent, ChattingHeader, ChattingInput, Container } from './ChattingPanel.style';
import { ChatSearchInput } from './ChatSearchInput/ChatSearchInput';

export const ChattingPanel: React.FC<ChattingPanelProps> = () => {
	return (
		<Container>
			<ChattingHeader>
				<ChatSearchInput value="" onChange={() => {}} />
			</ChattingHeader>
			<ChattingContent />
			<ChattingInput />
		</Container>
	);
};

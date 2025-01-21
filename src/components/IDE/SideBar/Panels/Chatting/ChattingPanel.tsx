import type { ChattingPanelProps } from './ChattingPanel.d';
import { ChattingContent, ChattingHeader, ChattingInput, Container } from './ChattingPanel.style';
import { SearchChattingInput } from './Inputs/SearchChattingInput/SearchChattingInput';
import { SendChattingInput } from './Inputs/SendChattingInput/SendChattingInput';

export const ChattingPanel: React.FC<ChattingPanelProps> = () => {
	return (
		<Container>
			<ChattingHeader>
				<SearchChattingInput />
			</ChattingHeader>
			<ChattingContent />
			<ChattingInput>
				<SendChattingInput />
			</ChattingInput>
		</Container>
	);
};

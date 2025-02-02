import React from 'react';
import { ChattingPanel } from './Chatting/ChattingPanel';
import { PanelContainer, PanelHeader, PanelContent } from './Panel.styles';
import { PanelProps } from './Panel.d';
import { FileExplorePanel } from './FileExplorer/FileExplorePanel';
import { ChatProvider } from '@/contexts/ChatContext';

export const Panel: React.FC<PanelProps> = ({ openPanel }) => {
	const projectId = '59457cf3-5741-4bbc-a463-5077fb3c350b';

	if (!openPanel) return null;

	return (
		<PanelContainer>
			<PanelHeader>
				{openPanel === 'files' && '파일 탐색기'}
				{openPanel === 'chat' && '채팅'}
				{openPanel === 'CodeStyle' && '코드 스타일'}
			</PanelHeader>
			<PanelContent>
				{openPanel === 'files' && <FileExplorePanel />}
				{openPanel === 'chat' && (
					<ChatProvider projectId={projectId}>
						<ChattingPanel projectId={projectId} />
					</ChatProvider>
				)}
			</PanelContent>
		</PanelContainer>
	);
};

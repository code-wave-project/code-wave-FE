import styled from 'styled-components';
import { PanelType } from '../../../../pages/IDE';
import { ChattingPanel } from './Chatting/ChattingPanel';

const PanelContainer = styled.div`
	min-width: 240px;
	max-width: 360px;
	background-color: #252526;
	height: 100%;
	border-right: 1px solid #3c3c3c;
	transition: transform 0.2s ease;
	display: flex;
	flex-direction: column;
`;

const PanelHeader = styled.div`
	height: 48px;
	padding: 16px;
	background-color: #252526;
	font-size: 16px;
	font-weight: 600;
	color: #fff;
	flex-shrink: 0;
`;

const PanelContent = styled.div`
	flex: 1;
	overflow: hidden;
	padding: 0 16px 16px 16px;
`;

export interface PanelProps {
	openPanel: PanelType;
}

export const Panel: React.FC<PanelProps> = ({ openPanel }) => {
	if (!openPanel) return null;

	return (
		<PanelContainer>
			<PanelHeader>
				{openPanel === 'files' && '파일 탐색기'}
				{openPanel === 'chat' && '채팅'}
			</PanelHeader>
			<PanelContent>
				{openPanel === 'files' && <div>파일 탐색기</div>}
				{openPanel === 'chat' && <ChattingPanel />}
			</PanelContent>
		</PanelContainer>
	);
};

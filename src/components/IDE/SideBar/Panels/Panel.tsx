import styled from 'styled-components';
import { PanelType } from '../../../../pages/IDE';

const PanelContainer = styled.div`
	min-width: 240px;
	max-width: 360px;
	background-color: #252526;
	height: 100%;
	border-right: 1px solid #3c3c3c;
	transition: transform 0.2s ease;
`;

const PanelContent = styled.div`
	padding: 16px;
	color: #fff;
`;

export interface PanelProps {
	openPanel: PanelType;
}

export const Panel: React.FC<PanelProps> = ({ openPanel }) => {
	if (!openPanel) return null;

	return (
		<PanelContainer>
			<PanelContent>
				{openPanel === 'files' && <div>파일 탐색기</div>}
				{openPanel === 'chat' && <div>채팅</div>}
			</PanelContent>
		</PanelContainer>
	);
};

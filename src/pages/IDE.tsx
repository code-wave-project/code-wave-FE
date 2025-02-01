import { useState } from 'react';
import styled from 'styled-components';
import { Sidebar } from '@/components/IDE/SideBar/SideBar';
import { Panel } from '@components/IDE/SideBar/Panels/Panel';
import { Editor } from '@/components/IDE/Editor/Editor';

export type PanelType = 'files' | 'chat' | 'CodeStyle' | null;

const OuterContainer = styled.div`
	width: 100%;
	height: 100vh;
	overflow-x: auto;
	overflow-y: scroll;
`;

const Container = styled.div<{ hasPanel: boolean }>`
	display: flex;
	height: 100%;
	min-height: 45rem;
	min-width: ${({ hasPanel }) => (hasPanel ? '1324px' : '1024px')};
`;

const SidebarContainer = styled.div`
	display: flex;
	flex-shrink: 0;
`;

const MainContent = styled.div<{ hasPanel: boolean }>`
	height: 100%;
	flex: 1;
	min-width: ${({ hasPanel }) => (hasPanel ? '724px' : '600px')};
	transition: min-width 0.2s ease;
`;

export interface IDEProps {
	initialPanel?: PanelType;
}

const IDE: React.FC<IDEProps> = ({ initialPanel = null }) => {
	const [openPanel, setOpenPanel] = useState<PanelType>(initialPanel);

	const handlePanelToggle = (panel: 'files' | 'chat' | 'CodeStyle' | null) => {
		const newPanel = openPanel === panel ? null : panel;
		setOpenPanel(newPanel);
	};

	return (
		<OuterContainer>
			<Container hasPanel={Boolean(openPanel)}>
				<SidebarContainer>
					<Sidebar openPanel={openPanel} onPanelToggle={handlePanelToggle} />
					<Panel openPanel={openPanel} />
				</SidebarContainer>
				<MainContent hasPanel={Boolean(openPanel)}>
					<Editor />
				</MainContent>
			</Container>
		</OuterContainer>
	);
};

export default IDE;

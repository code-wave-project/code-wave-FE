import { useState } from 'react';
import styled from 'styled-components';
import { Sidebar } from '@/components/IDE/SideBar/SideBar';
import { Panel } from '@components/IDE/SideBar/Panels/Panel';

export type PanelType = 'files' | 'chat' | null;

const Container = styled.div`
	display: flex;
	height: 100vh;
`;

const MainContent = styled.div`
	flex-grow: 1;
	background-color: #1e1e1e;
	height: 100%;
`;

export interface IDEProps {
	initialPanel?: PanelType;
	onPanelChange?: (panel: PanelType) => void;
}

const IDE: React.FC<IDEProps> = ({ initialPanel = null, onPanelChange }) => {
	const [openPanel, setOpenPanel] = useState<PanelType>(initialPanel);

	const handlePanelToggle = (panel: 'files' | 'chat') => {
		const newPanel = openPanel === panel ? null : panel;
		setOpenPanel(newPanel);
		onPanelChange?.(newPanel);
	};

	return (
		<Container>
			<Sidebar openPanel={openPanel} onPanelToggle={handlePanelToggle} />
			<Panel openPanel={openPanel} />
			<MainContent>{/* 메인 IDE 컨텐츠 영역 */}</MainContent>
		</Container>
	);
};

export default IDE;

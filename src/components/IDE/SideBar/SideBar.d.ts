import { PanelType } from '../../../pages/IDE';

export interface SidebarProps {
	openPanel: PanelType;
	onPanelToggle: (panel: 'files' | 'chat' | 'CodeStyle' | null) => void;
}

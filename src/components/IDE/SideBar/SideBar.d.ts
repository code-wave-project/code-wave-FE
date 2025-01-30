import { PanelType } from '../../../pages/IDE';

export interface SidebarProps {
	openPanel: PanelType;
	onPanelToggle: (panel: 'files' | 'chat') => void;
}

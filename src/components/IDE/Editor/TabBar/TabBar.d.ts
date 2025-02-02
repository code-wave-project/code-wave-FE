import { TabType } from '../Editor.d';

export interface TabBarProps {
	tabs: TabType[];
	activeTabId: string | null;
	onTabClick: (tabId: string) => void;
	removeTab: (tabId: string) => void;
}

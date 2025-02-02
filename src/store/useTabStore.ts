import { create } from 'zustand';

interface Tab {
	id: string;
	title: string;
	path: string;
	content: string;
	isModified: boolean;
}

interface TabState {
	tabs: Tab[];
	activeTabId: string | null;
	addTab: (tab: Omit<Tab, 'id' | 'isModified'>) => void;
	removeTab: (id: string) => void;
	setActiveTab: (id: string) => void;
	updateTabContent: (id: string, content: string) => void;
	setTabModified: (id: string, isModified: boolean) => void;
}

export const useTabStore = create<TabState>(set => ({
	tabs: [],
	activeTabId: null,

	addTab: newTab => {
		set(state => {
			const existingTab = state.tabs.find(tab => tab.path === newTab.path);
			if (existingTab) {
				return { ...state, activeTabId: existingTab.id };
			}

			const id = crypto.randomUUID();
			const tab = { ...newTab, id, isModified: false };
			return {
				tabs: [...state.tabs, tab],
				activeTabId: id,
			};
		});
	},

	removeTab: id => {
		set(state => {
			const currentIndex = state.tabs.findIndex(tab => tab.id === id);
			const newTabs = state.tabs.filter(tab => tab.id !== id);

			// 탭이 모두 삭제된 경우
			if (newTabs.length === 0) {
				return {
					tabs: [],
					activeTabId: null,
				};
			}

			// 현재 활성 탭이 삭제되는 경우에만 새로운 활성 탭을 선택
			if (state.activeTabId === id) {
				// 삭제되는 탭이 마지막 탭인 경우 이전 탭을, 아니면 다음 탭을 선택
				const newActiveTabId =
					currentIndex === state.tabs.length - 1 ? newTabs[currentIndex - 1].id : newTabs[currentIndex].id;

				return {
					tabs: newTabs,
					activeTabId: newActiveTabId,
				};
			}

			// 활성 탭이 아닌 탭이 삭제되는 경우 활성 탭 유지
			return {
				tabs: newTabs,
				activeTabId: state.activeTabId,
			};
		});
	},

	setActiveTab: id => {
		set({ activeTabId: id });
	},

	updateTabContent: (id, content) => {
		set(state => ({
			tabs: state.tabs.map(tab => (tab.id === id ? { ...tab, content } : tab)),
		}));
	},

	setTabModified: (id: string, isModified: boolean) => {
		set(state => ({
			tabs: state.tabs.map(tab => (tab.id === id ? { ...tab, isModified } : tab)),
		}));
	},
}));

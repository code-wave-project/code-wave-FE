import React, { useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';
import { Container, EditorContainer } from './Editor.styles';
import { EditorProps, TabType } from './Editor.d';
import { TabBar } from './TabBar/TabBar';
import { AppBar } from './AppBar/AppBar';
import Footer from './Footer/Footer';

export const Editor: React.FC<EditorProps> = ({ onSave }) => {
	const [tabs, setTabs] = useState<TabType[]>([
		{
			id: '1',
			title: 'index.html',
			path: 'index.html',
			content: 'html',
		},
		{
			id: '2',
			title: 'style.css',
			path: 'style.css',
			content: 'css',
		},
		{
			id: '3',
			title: 'script.js',
			path: 'script.js',
			content: 'js',
		},
	]);
	const [activeTabId, setActiveTabId] = useState<string | null>(null);
	const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
	const monacoEl = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (monacoEl.current) {
			editorRef.current = monaco.editor.create(monacoEl.current, {
				automaticLayout: true,
				minimap: { enabled: false },
				scrollBeyondLastLine: false,
			});

			editorRef.current.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
				const activeTab = tabs.find(tab => tab.id === activeTabId);
				if (activeTab && onSave) {
					onSave(activeTab.path, editorRef.current?.getValue() || '');
				}
			});
		}

		return () => {
			editorRef.current?.dispose();
		};
	}, []);

	useEffect(() => {
		if (activeTabId && editorRef.current) {
			const activeTab = tabs.find(tab => tab.id === activeTabId);
			if (activeTab) {
				editorRef.current.setValue(activeTab.content);

				const extension = activeTab.path.split('.').pop() || '';
				const language = getLanguageFromExtension(extension);
				monaco.editor.setModelLanguage(editorRef.current.getModel()!, language);
			}
		}
	}, [activeTabId]);

	const closeTab = (tabId: string, event: React.MouseEvent) => {
		event.stopPropagation();
		setTabs(prev => prev.filter(tab => tab.id !== tabId));
		if (activeTabId === tabId) {
			setActiveTabId(tabs[tabs.length - 2]?.id || null);
		}
	};

	const getLanguageFromExtension = (extension: string): string => {
		const languageMap: { [key: string]: string } = {
			js: 'javascript',
			jsx: 'javascript',
			ts: 'typescript',
			tsx: 'typescript',
			html: 'html',
			css: 'css',
			json: 'json',
			md: 'markdown',
		};
		return languageMap[extension] || 'plaintext';
	};

	return (
		<Container>
			<AppBar />
			<TabBar tabs={tabs} activeTabId={activeTabId} onTabClick={setActiveTabId} onTabClose={closeTab} />
			<EditorContainer ref={monacoEl} />
			<Footer />
		</Container>
	);
};

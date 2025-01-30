import React, { useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import { Container, EditorContainer, EmptyContainer, EmptyText } from './Editor.styles';
import { EditorProps, TabType } from './Editor.d';
import { TabBar } from './TabBar/TabBar';
import { AppBar } from './AppBar/AppBar';
import Footer from './Footer/Footer';

// Monaco Editor 웹 워커 설정
self.MonacoEnvironment = {
	getWorker(_, label) {
		if (label === 'json') {
			return new jsonWorker();
		}
		if (label === 'css' || label === 'scss' || label === 'less') {
			return new cssWorker();
		}
		if (label === 'html' || label === 'handlebars' || label === 'razor') {
			return new htmlWorker();
		}
		if (label === 'typescript' || label === 'javascript') {
			return new tsWorker();
		}
		return new editorWorker();
	},
};

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
			title: 'index.py',
			path: 'index.py',
			content: 'python',
		},
	]);
	const [activeTabId, setActiveTabId] = useState<string | null>(null);
	const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
	const monacoEl = useRef<HTMLDivElement>(null);

	// 모나코 에디터 생성
	useEffect(() => {
		// 활성 탭이 없거나 이미 에디터가 생성된 경우 건너뛰기
		if (!activeTabId || !monacoEl.current || editorRef.current) {
			return;
		}

		// 모나코 에디터 생성
		editorRef.current = monaco.editor.create(monacoEl.current, {
			automaticLayout: true,
			theme: 'vs',
			minimap: { enabled: false },
			scrollBeyondLastLine: false,
			value: '',
			language: 'plaintext',
		});

		// 저장 단축키 설정
		editorRef.current.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
			const activeTab = tabs.find(tab => tab.id === activeTabId);
			if (activeTab && onSave) {
				onSave(activeTab.path, editorRef.current?.getValue() || '');
			}
		});

		return () => {
			editorRef.current?.dispose();
			editorRef.current = null;
		};
	}, [activeTabId]); // activeTabId가 변경될 때마다 체크

	useEffect(() => {
		if (activeTabId && editorRef.current) {
			const activeTab = tabs.find(tab => tab.id === activeTabId);
			if (activeTab) {
				editorRef.current.setValue(activeTab.content);

				const extension = activeTab.path.split('.').pop() || '';
				const language = getLanguageFromExtension(extension); // 확장자에 따라 언어 설정
				const model = editorRef.current.getModel(); // 현재 모델 가져오기
				if (model) {
					monaco.editor.setModelLanguage(model, language); // 모델 언어 설정
				} else {
					const newModel = monaco.editor.createModel(activeTab.content, language); // 새 모델 생성
					editorRef.current.setModel(newModel); // 새 모델 설정
				}
			}
		}
	}, [activeTabId]);

	const closeTab = (tabId: string, event: React.MouseEvent) => {
		event.stopPropagation();
		setTabs(prev => prev.filter(tab => tab.id !== tabId));
		if (activeTabId === tabId) {
			setActiveTabId(null);
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
			py: 'python',
		};
		return languageMap[extension] || 'plaintext';
	};

	return (
		<Container>
			<AppBar />
			<TabBar tabs={tabs} activeTabId={activeTabId} onTabClick={setActiveTabId} onTabClose={closeTab} />
			{activeTabId ? (
				<EditorContainer ref={monacoEl} />
			) : (
				<EmptyContainer>
					<EmptyText>선택된 파일이 없습니다</EmptyText>
				</EmptyContainer>
			)}
			<Footer />
		</Container>
	);
};

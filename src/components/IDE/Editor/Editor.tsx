import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import { Container, EditorContainer, EmptyContainer, EmptyText } from './Editor.styles';
import { EditorProps } from './Editor.d';
import { TabBar } from './TabBar/TabBar';
import { AppBar } from './AppBar/AppBar';
import { useTabStore } from '@/store/useTabStore';
import { useFileStore } from '@/store/useFileStore';
// import Footer from './Footer/Footer';

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
	const { tabs, activeTabId, setActiveTab, removeTab } = useTabStore();
	const { updateFileContent } = useFileStore();
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
				// 현재 모델 가져오기
				const currentModel = editorRef.current.getModel();

				// 새로운 모델 생성 전에 이전 모델 dispose
				if (currentModel) {
					currentModel.dispose();
				}

				// 새 모델 생성 및 설정
				const extension = activeTab.path.split('.').pop() || '';
				const language = getLanguageFromExtension(extension);
				const newModel = monaco.editor.createModel(activeTab.content, language);
				editorRef.current.setModel(newModel);
			}
		}

		// cleanup 함수에서 모델 dispose
		return () => {
			const model = editorRef.current?.getModel();
			if (model) {
				model.dispose();
			}
		};
	}, [activeTabId, tabs]);

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

	// 저장 핸들러 추가
	const handleSave = () => {
		if (!editorRef.current || !activeTabId) return;

		const activeTab = tabs.find(tab => tab.id === activeTabId);
		if (!activeTab) return;

		const content = editorRef.current.getValue();
		updateFileContent(activeTab.path, content);
	};

	// 키보드 단축키 이벤트 리스너 추가
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === 's') {
				e.preventDefault();
				handleSave();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [activeTabId, tabs]);

	// 에디터 설정에 저장 명령 추가
	useEffect(() => {
		if (!editorRef.current) return;

		editorRef.current.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
			handleSave();
		});
	}, [activeTabId, tabs]);

	return (
		<Container>
			<AppBar />
			<TabBar tabs={tabs} activeTabId={activeTabId} onTabClick={setActiveTab} removeTab={removeTab} />
			{activeTabId === null ? (
				<EmptyContainer>
					<EmptyText>선택된 파일이 없습니다</EmptyText>
				</EmptyContainer>
			) : (
				<EditorContainer ref={monacoEl} />
			)}
		</Container>
	);
};

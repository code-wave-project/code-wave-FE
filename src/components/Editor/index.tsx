import { useEffect, useRef } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';
import { User } from '../../types';
import '../../styles/components/Editor.css';
import * as monaco from 'monaco-editor';

interface EditorProps {
  file: string | null;
  collaborators: User[];
  onContentChange: (content: string) => void;
}

// 테마 설정을 상수로 분리
const EDITOR_THEME = {
  base: 'vs' as const,
  inherit: true,
  rules: [
    { token: 'comment', foreground: '6A9955' },
    { token: 'keyword', foreground: '569CD6' },
    { token: 'string', foreground: 'CE9178' },
    { token: 'number', foreground: 'B5CEA8' },
    { token: 'type', foreground: '4EC9B0' }
  ],
  colors: {
    'editor.background': '#ffffff',
    'editor.foreground': '#333333',
    'editor.lineHighlightBackground': '#f5f5f5',
    'editor.lineHighlightBorder': '#f5f5f5',
    'editorLineNumber.foreground': '#999999',
    'editorIndentGuide.background': '#e8e8e8',
    'editorIndentGuide.activeBackground': '#999999',
    'editor.selectionBackground': '#add6ff',
    'editor.inactiveSelectionBackground': '#e5ebf1',
  }
};

// 테마 설정을 초기화하는 함수
const initializeEditorTheme = () => {
  monaco.editor.defineTheme('customLightTheme', EDITOR_THEME);
  monaco.editor.setTheme('customLightTheme');
};

const CodeEditor: React.FC<EditorProps> = ({ file, collaborators }) => {
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<Monaco | null>(null);

  useEffect(() => {
    if (!file) return;

    // Yjs 문서 생성
    const doc = new Y.Doc();
    
    // WebSocket 연결 (실제 서버 URL로 변경 필요)
    const wsProvider = new WebsocketProvider(
      'ws://localhost:1234',
      file,
      doc
    );

    // 에디터가 준비되면 YJS binding 설정
    if (editorRef.current) {
      const binding = new MonacoBinding(
        doc.getText('monaco'),
        editorRef.current.getModel(),
        new Set([editorRef.current]),
        wsProvider.awareness
      );
    }

    return () => {
      wsProvider.destroy();
    };
  }, [file]);

  useEffect(() => {
    if (!monacoRef.current) return;
    
    // 테마 초기화
    initializeEditorTheme();
  }, []);

  return (
    <Editor
      height="calc(100vh - 105px)"
      defaultLanguage="javascript"
      theme="vs"
      onMount={(editor, monaco) => {
        editorRef.current = editor;
        monacoRef.current = monaco;
      }}
    />
  );
};

export default CodeEditor; 
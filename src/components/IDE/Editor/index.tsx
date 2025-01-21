import { useRef } from 'react';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import { editor } from 'monaco-editor';

interface EditorProps {
	language?: string;
	defaultValue?: string;
	onChange?: (value: string | undefined) => void;
}

const Editor: React.FC<EditorProps> = ({ language = 'javascript', defaultValue = '', onChange }) => {
	const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

	const handleEditorDidMount: OnMount = editor => {
		editorRef.current = editor;
	};

	return (
		<MonacoEditor
			language={language}
			defaultValue={defaultValue}
			onChange={onChange}
			onMount={handleEditorDidMount}
			width="100%"
			theme="vs"
			options={{
				minimap: { enabled: true },
				fontSize: 14,
				wordWrap: 'on',
				automaticLayout: true,
				lineNumbers: 'on',
				scrollBeyondLastLine: false,
				folding: true,
			}}
		/>
	);
};

export default Editor;

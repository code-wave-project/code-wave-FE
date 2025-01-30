export interface TabType {
	id: string;
	title: string;
	path: string;
	content: string;
}

export interface EditorProps {
	onSave: (path: string, content: string) => void;
}

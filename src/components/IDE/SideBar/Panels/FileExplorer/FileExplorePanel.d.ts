export type FileType = 'file' | 'folder';

export interface CustomData {
	fileType: FileType;
	path: string;
	content: string;
}

import { create } from 'zustand';
import { NodeModel } from '@minoru/react-dnd-treeview';
import { CustomData } from '@/components/IDE/SideBar/Panels/FileExplorer/FileExplorePanel.d';

interface FileState {
	files: NodeModel<CustomData>[];
	addFile: (parentId: string, fileName: string) => boolean;
	addFolder: (parentId: string, folderName: string) => boolean;
	updateFiles: (newFiles: NodeModel<CustomData>[]) => void;
	deleteFile: (id: string) => void;
	updateFileContent: (path: string, content: string) => void;
}

export const useFileStore = create<FileState>((set, get) => ({
	files: [
		{
			id: '1',
			parent: '0',
			droppable: true,
			text: 'src',
			data: {
				fileType: 'folder',
				path: '/src',
				content: '',
			},
		},
		{
			id: '2',
			parent: '1',
			droppable: false,
			text: 'index.html',
			data: {
				fileType: 'file',
				path: '/src/index.html',
				content:
					'<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>',
			},
		},
	],

	addFile: (parentId: string, fileName: string) => {
		const state = get();
		const parentNode = state.files.find(file => file.id === parentId);
		const parentPath = parentNode?.data?.path || '';

		// 같은 부모 아래에 같은 이름의 파일이나 폴더가 있는지 확인
		const isDuplicate = state.files.some(file => file.parent === parentId && file.text === fileName);

		if (isDuplicate) {
			alert('같은 이름의 파일이 이미 존재합니다.');
			return false;
		}

		const newId = crypto.randomUUID();
		const newFile: NodeModel<CustomData> = {
			id: newId,
			parent: parentId,
			droppable: false,
			text: fileName,
			data: {
				fileType: 'file',
				path: `${parentPath}/${fileName}`,
				content: '', // 새 파일은 빈 내용으로 시작
			},
		};

		set(state => ({
			files: [...state.files, newFile],
		}));
		return true;
	},

	addFolder: (parentId: string, folderName: string) => {
		const state = get();
		const parentNode = state.files.find(file => file.id === parentId);
		const parentPath = parentNode?.data?.path || '';

		// 같은 부모 아래에 같은 이름의 파일이나 폴더가 있는지 확인
		const isDuplicate = state.files.some(file => file.parent === parentId && file.text === folderName);

		if (isDuplicate) {
			alert('같은 이름의 폴더가 이미 존재합니다.');
			return false;
		}

		const newId = crypto.randomUUID();
		const newFolder: NodeModel<CustomData> = {
			id: newId,
			parent: parentId,
			droppable: true,
			text: folderName,
			data: {
				fileType: 'folder',
				path: `${parentPath}/${folderName}`,
				content: '',
			},
		};

		set(state => ({
			files: [...state.files, newFolder],
		}));
		return true;
	},

	updateFiles: (newFiles: NodeModel<CustomData>[]) => {
		set({ files: newFiles });
	},

	deleteFile: (id: string) => {
		set(state => ({
			files: state.files.filter(file => file.id !== id && file.parent !== id),
		}));
	},

	updateFileContent: (path: string, content: string) => {
		set(state => ({
			files: state.files.map(file => (file.data?.path === path ? { ...file, data: { ...file.data, content } } : file)),
		}));
	},
}));

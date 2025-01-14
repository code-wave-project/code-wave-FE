import { create } from 'zustand';
import { FileStructure } from '../types';

interface FileStore {
  files: FileStructure[];
  activeFile: string | null;
  setFiles: (files: FileStructure[]) => void;
  addFile: (newFile: FileStructure) => void;
  deleteFile: (fileId: string) => void;
  updateFileContent: (filePath: string, content: string) => void;
  setActiveFile: (filePath: string) => void;
}

export const useFileStore = create<FileStore>((set) => ({
  files: [
    {
      id: '1',
      name: 'src',
      type: 'directory',
      path: '/src'
    },
    {
      id: '2',
      name: 'index.tsx',
      type: 'file',
      path: '/src/index.tsx',
      content: 'console.log("Hello World!");'
    },
    {
      id: '3',
      name: 'styles',
      type: 'directory',
      path: '/src/styles'
    },
    {
      id: '4',
      name: 'app.css',
      type: 'file',
      path: '/src/styles/app.css',
      content: '.app { color: blue; }'
    }
  ],
  activeFile: null,
  
  setFiles: (files) => set({ files }),
  
  addFile: (newFile) => set((state) => ({
    files: [...state.files, newFile]
  })),
  
  deleteFile: (path) => set((state) => ({
    files: state.files.filter((file) => !file.path.startsWith(path))
  })),
  
  updateFileContent: (filePath, content) => set((state) => ({
    files: state.files.map(file =>
      file.path === filePath
        ? { ...file, content }
        : file
    )
  })),
  
  setActiveFile: (filePath) => set({ activeFile: filePath }),
})); 
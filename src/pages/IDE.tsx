import React, { useState, useEffect } from 'react';
import Editor from '../components/Editor';
import FileExplorer from '../components/FileExplorer';
import { useFileStore } from '../store/fileStore';
import { useCollaboratorStore } from '../store/collaboratorStore';
import PathBar from '../components/PathBar';
import SideBar from '../components/SideBar';
import AppBar from '../components/AppBar';

const IDE: React.FC = () => {
	const { files, addFile, deleteFile, updateFileContent } = useFileStore();

	const { collaborators, addCollaborator, removeCollaborator } = useCollaboratorStore();

	const [activeFile, setActiveFile] = useState<string | null>(null);
	const [openFiles, setOpenFiles] = useState<string[]>([]);
	const [activeTab, setActiveTab] = useState('files');
	const [isDarkMode, setIsDarkMode] = useState(() => {
		const savedTheme = localStorage.getItem('theme');
		return savedTheme === 'dark';
	});

	const renderSideContent = () => {
		switch (activeTab) {
			case 'files':
				return (
					<>
						<FileExplorer
							files={files}
							onFileSelect={handleFileSelect}
							onFileCreate={addFile}
							onFileDelete={deleteFile}
						/>
					</>
				);
			case 'chat':
				return <div className="chat-panel">채팅 패널</div>;
			case 'settings':
				return <div className="settings-panel">설정 패널</div>;
			default:
				return null;
		}
	};

	const handleThemeToggle = () => {
		setIsDarkMode(prev => !prev);
	};

	const handleFileClose = (filePath: string) => {
		setOpenFiles(prev => prev.filter(file => file !== filePath));
		if (activeFile === filePath) {
			setActiveFile(null);
		}
	};

	const handleFileSelect = (filePath: string) => {
		setActiveFile(filePath);
		if (!openFiles.includes(filePath)) {
			setOpenFiles(prev => [...prev, filePath]);
		}
	};

	return (
		<div className="ide-container">
			<SideBar activeTab={activeTab} onTabChange={setActiveTab} />
			<div className="sidebar">{renderSideContent()}</div>

			<div className="main-content">
				<AppBar currentPage="Current Page" />
				<PathBar
					openFiles={openFiles}
					activeFile={activeFile || undefined}
					onClose={handleFileClose}
					onSelect={setActiveFile}
				/>
				<Editor
					file={activeFile}
					collaborators={collaborators}
					onContentChange={content => {
						if (activeFile) {
							updateFileContent(activeFile, content);
						}
					}}
				/>
			</div>
		</div>
	);
};

export default IDE;

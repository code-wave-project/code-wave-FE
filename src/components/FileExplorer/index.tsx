import React, { useState, useEffect } from 'react';
import { Tree, DragLayerMonitorProps, NodeModel } from '@minoru/react-dnd-treeview';
import { FileExplorerProps, CustomNodeData } from './types';
import { CustomNode } from './CustomNode';
import { CustomDragPreview } from './CustomDragPreview';
import { FileStructure } from '../../types';
import '../../styles/components/FileExplorer.css';

const FileExplorer: React.FC<FileExplorerProps> = ({ files, onFileSelect, onFileCreate, onFileDelete }) => {
	const [treeData, setTreeData] = useState<NodeModel<CustomNodeData>[]>([]);

	useEffect(() => {
		// 파일 데이터를 트리 구조로 변환
		const convertToTreeData = (files: FileStructure[]): NodeModel<CustomNodeData>[] => {
			return files.map(file => {
				const pathParts = file.path.split('/').filter(Boolean);
				const parent = pathParts.length > 1 ? '/' + pathParts.slice(0, -1).join('/') : '/';

				return {
					id: file.path, // path를 id로 사용
					parent: parent,
					droppable: file.type === 'directory',
					text: file.name,
					data: {
						fileType: file.type,
						path: file.path,
						icon: file.type === 'directory' ? '📁' : getFileIcon(file.name),
					},
				};
			});
		};

		setTreeData(convertToTreeData(files));
	}, [files]);

	return (
		<div className="file-explorer">
			<div className="file-explorer-header">
				<h3>Explorer</h3>
				<div className="file-explorer-actions">
					<button
						onClick={() =>
							onFileCreate({
								id: Date.now().toString(),
								name: 'New Folder',
								type: 'directory',
								path: '/New Folder',
							})
						}
						className="action-button">
						<span className="icon">📁</span>
					</button>
					<button
						onClick={() =>
							onFileCreate({
								id: Date.now().toString(),
								name: 'new-file.txt',
								type: 'file',
								path: '/new-file.txt',
								content: '',
							})
						}
						className="action-button">
						<span className="icon">📄</span>
					</button>
				</div>
			</div>
			<div className="tree-container">
				<Tree<CustomNodeData>
					tree={treeData}
					rootId="/"
					render={(node, options) => (
						<CustomNode
							node={node}
							{...options}
							onDelete={onFileDelete}
							onSelect={() => {
								if (node.data?.fileType === 'file') {
									onFileSelect(node.data.path);
								}
							}}
						/>
					)}
					dragPreviewRender={(monitorProps: DragLayerMonitorProps<CustomNodeData>) => (
						<CustomDragPreview monitorProps={monitorProps} />
					)}
					onDrop={() => {}}
					classes={{
						root: 'tree-root',
						draggingSource: 'dragging-source',
						dropTarget: 'drop-target',
					}}
					sort={false}
					insertDroppableFirst={false}
					canDrop={(tree, { dragSource, dropTarget }) => {
						if (dragSource?.data?.fileType === 'file') {
							return dropTarget?.data?.fileType === 'directory';
						}
						return true;
					}}
				/>
			</div>
		</div>
	);
};

const getFileIcon = (fileName: string): string => {
	const extension = fileName.split('.').pop()?.toLowerCase();
	switch (extension) {
		case 'js':
		case 'jsx':
			return '📜';
		case 'ts':
		case 'tsx':
			return '📘';
		case 'css':
			return '🎨';
		case 'json':
			return '📋';
		case 'md':
			return '📝';
		default:
			return '📄';
	}
};

export default FileExplorer;

import React from 'react';
import { NodeModel, Tree } from '@minoru/react-dnd-treeview';
import { CustomData } from './FileExplorePanel.d';
import { Container } from './FileExplorePanel.style';
import { CustomNode } from './CustomNode/CustomNode';
import { useTabStore } from '@/store/useTabStore';
import { useFileStore } from '@/store/useFileStore';

export const FileExplorePanel: React.FC = () => {
	const { addTab } = useTabStore();
	const { files, addFile, addFolder, updateFiles } = useFileStore();

	const handleDrop = (newTree: NodeModel<CustomData>[]) => {
		updateFiles(newTree);
	};

	const canDrag = (node: NodeModel<CustomData> | undefined) => {
		if (!node) return false;
		return node.parent !== '0';
	};

	const handleAddFile = (parentId: string) => {
		const fileName = prompt('Enter file name:');
		if (fileName) {
			addFile(parentId, fileName);
		}
	};

	const handleAddFolder = (parentId: string) => {
		const folderName = prompt('Enter folder name:');
		if (folderName) {
			addFolder(parentId, folderName);
		}
	};

	const handleNodeClick = (node: NodeModel<CustomData>) => {
		if (!node.droppable) {
			addTab({
				title: node.text,
				path: node.data?.path || '',
				content: node.data?.content || '',
			});
		}
	};

	return (
		<Container>
			<Tree
				tree={files}
				rootId="0"
				render={(node, { depth, isOpen, onToggle }) => (
					<CustomNode
						node={node}
						depth={depth}
						isOpen={isOpen}
						onToggle={onToggle}
						onAddFile={handleAddFile}
						onAddFolder={handleAddFolder}
						onNodeClick={handleNodeClick}
					/>
				)}
				dragPreviewRender={monitorProps => <div>{monitorProps.item.text}</div>}
				onDrop={handleDrop}
				canDrag={canDrag}
			/>
		</Container>
	);
};

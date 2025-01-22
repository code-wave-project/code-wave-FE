import React, { useState } from 'react';
import { NodeModel, Tree } from '@minoru/react-dnd-treeview';
import { CustomData } from './FileExplorePanel.d';
import { Container } from './FileExplorePanel.style';
import { CustomNode } from './CustomNode/CustomNode';

export const FileExplorePanel: React.FC = () => {
	const [treeData, setTreeData] = useState<NodeModel<CustomData>[]>([
		{
			id: '1',
			parent: '0',
			droppable: true,
			text: 'src',
			data: {
				fileType: 'folder',
				path: '/src',
			},
		},
		{
			id: '2',
			parent: '1',
			droppable: false,
			text: 'App.tsx',
			data: {
				fileType: 'file',
				path: '/src/App.tsx',
			},
		},
		{
			id: '3',
			parent: '1',
			droppable: true,
			text: 'components',
			data: {
				fileType: 'folder',
				path: '/src/components',
			},
		},
	]);

	const handleDrop = (newTree: NodeModel<CustomData>[]) => {
		setTreeData(newTree);
	};

	const canDrag = (node: NodeModel<CustomData> | undefined) => {
		if (!node) return false;
		return node.parent !== '0';
	};

	const handleAddFile = (parentId: string) => {
		console.log('Add file to:', parentId);
	};

	const handleAddFolder = (parentId: string) => {
		console.log('Add folder to:', parentId);
	};

	return (
		<Container>
			<Tree
				tree={treeData}
				rootId="0"
				render={(node, { depth, isOpen, onToggle }) => (
					<CustomNode
						node={node}
						depth={depth}
						isOpen={isOpen}
						onToggle={onToggle}
						onAddFile={handleAddFile}
						onAddFolder={handleAddFolder}
					/>
				)}
				dragPreviewRender={monitorProps => <div>{monitorProps.item.text}</div>}
				onDrop={handleDrop}
				canDrag={canDrag}
			/>
		</Container>
	);
};

import React, { useState } from 'react';
import { NodeModel, RenderParams, Tree } from '@minoru/react-dnd-treeview';
import {
	TreeContainer,
	TreeNodeWrapper,
	NodeContent,
	ActionButtons,
	ActionButton,
	NodeIcon,
	NodeText,
} from '../../../../styles/IDE/Panel/FileExplorePanel.style';

import IconDropDown from '../../../../assets/icons/icon_dropdown.svg?react';
import ExplorerNewFile from '../../../../assets/icons/explorer_new_file.svg?react';
import ExplorerNewFolder from '../../../../assets/icons/explorer_new_folder.svg?react';
const FileExplorePanel: React.FC = () => {
	const [treeData, setTreeData] = useState<NodeModel[]>([
		{
			id: 1,
			parent: 0,
			droppable: true,
			text: 'src',
		},
		{
			id: 2,
			parent: 1,
			droppable: false,
			text: 'App.tsx',
		},
		{
			id: 3,
			parent: 1,
			droppable: true,
			text: 'components',
		},
		{
			id: 4,
			parent: 3,
			droppable: false,
			text: 'Button',
		},
		{
			id: 5,
			parent: 3,
			droppable: false,
			text: 'Input',
		},
	]);

	const handleDrop = (newTree: NodeModel[]) => {
		setTreeData(newTree);
	};

	const handleAddFile = () => {
		const newId = Math.max(...treeData.map(node => Number(node.id))) + 1;
		setTreeData([
			...treeData,
			{
				id: newId,
				parent: 1,
				droppable: false,
				text: `NewFile${newId}.tsx`,
			},
		]);
	};

	const handleAddFolder = () => {
		const newId = Math.max(...treeData.map(node => Number(node.id))) + 1;
		setTreeData([
			...treeData,
			{
				id: newId,
				parent: 1,
				droppable: true,
				text: `NewFolder${newId}`,
			},
		]);
	};

	const renderNode = (node: NodeModel, options: RenderParams) => {
		return (
			<TreeNodeWrapper depth={options.depth}>
				<NodeContent onClick={options.onToggle}>
					{node.droppable ? (
						<NodeIcon isOpen={options.isOpen}>
							<IconDropDown />
						</NodeIcon>
					) : null}
					<NodeText>{node.text}</NodeText>
					{treeData[0]?.id === node.id && (
						<ActionButtons>
							<ActionButton
								onClick={e => {
									e.stopPropagation();
									handleAddFolder();
								}}>
								<ExplorerNewFolder />
							</ActionButton>
							<ActionButton
								onClick={e => {
									e.stopPropagation();
									handleAddFile();
								}}>
								<ExplorerNewFile />
							</ActionButton>
						</ActionButtons>
					)}
				</NodeContent>
			</TreeNodeWrapper>
		);
	};

	return (
		<TreeContainer>
			<Tree tree={treeData} rootId={0} render={renderNode} onDrop={handleDrop} />
		</TreeContainer>
	);
};

export default FileExplorePanel;

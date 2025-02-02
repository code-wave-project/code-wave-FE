import React from 'react';
import { NodeModel } from '@minoru/react-dnd-treeview';
import { CustomData } from '../FileExplorePanel.d';
import { Container, Label, ToggleButton, ActionButtons, ActionButton } from './CustomNode.styles';
import DropdownIcon from '@/assets/icons/icon_dropdown.svg?react';
import AddFileIcon from '@/assets/icons/explorer_new_file.svg?react';
import AddFolderIcon from '@/assets/icons/explorer_new_folder.svg?react';

interface CustomNodeProps {
	node: NodeModel<CustomData>;
	depth: number;
	isOpen: boolean;
	onToggle: (id: string) => void;
	onAddFile?: (parentId: string) => void;
	onAddFolder?: (parentId: string) => void;
	onNodeClick?: (node: NodeModel<CustomData>) => void;
}

export const CustomNode: React.FC<CustomNodeProps> = ({
	node,
	depth,
	isOpen,
	onToggle,
	onAddFile,
	onAddFolder,
	onNodeClick,
}) => {
	const indent = depth * 24;
	const isRoot = node.parent === '0';

	const handleClick = (e: React.MouseEvent) => {
		if (node.droppable) {
			// 폴더를 클릭했을 때 토글
			e.stopPropagation();
			onToggle(node.id as string);
		} else {
			// 파일을 클릭했을 때 탭 추가
			onNodeClick?.(node);
		}
	};

	const handleAddFile = (e: React.MouseEvent) => {
		e.stopPropagation();
		onAddFile?.(node.id as string);
	};

	const handleAddFolder = (e: React.MouseEvent) => {
		e.stopPropagation();
		onAddFolder?.(node.id as string);
	};

	return (
		<Container style={{ paddingInlineStart: indent }} onClick={handleClick}>
			{node.droppable && (
				<ToggleButton isOpen={isOpen}>
					<DropdownIcon />
				</ToggleButton>
			)}
			<Label>{node.text}</Label>
			{isRoot && (
				<ActionButtons className="action-buttons">
					<ActionButton onClick={handleAddFile} title="Add File">
						<AddFileIcon />
					</ActionButton>
					<ActionButton onClick={handleAddFolder} title="Add Folder">
						<AddFolderIcon />
					</ActionButton>
				</ActionButtons>
			)}
		</Container>
	);
};

import React from 'react';
import { NodeModel } from '@minoru/react-dnd-treeview';
import { CustomData } from '../FileExplorePanel.d';
import { Container, Label, ToggleButton, ActionButtons, ActionButton } from './CustomNode.styles';
import DropdownIcon from '@/assets/icons/icon_dropdown.svg?react';
import AddFileIcon from '@/assets/icons/explorer_new_file.svg?react';
import AddFolderIcon from '@/assets/icons/explorer_new_folder.svg?react';
import DeleteIcon from '@/assets/icons/project_delete.svg?react';
import { useFileStore } from '@/store/useFileStore';
import { useTabStore } from '@/store/useTabStore';

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
	const { deleteFile } = useFileStore();
	const { tabs, removeTab } = useTabStore();
	const indent = depth * 24;
	const isRoot = node.parent === '0';

	const handleDelete = (e: React.MouseEvent) => {
		e.stopPropagation();

		if (window.confirm(`'${node.text}'를 삭제하시겠습니까?`)) {
			// 열려있는 탭 중에 삭제되는 파일이나 폴더 내의 파일이 있다면 탭도 함께 삭제
			tabs.forEach(tab => {
				if (tab.path.startsWith(node.data?.path || '')) {
					removeTab(tab.id);
				}
			});

			deleteFile(node.id as string);
		}
	};

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
			<ActionButtons className="action-buttons">
				{isRoot ? (
					<>
						<ActionButton onClick={handleAddFile} title="Add File">
							<AddFileIcon />
						</ActionButton>
						<ActionButton onClick={handleAddFolder} title="Add Folder">
							<AddFolderIcon />
						</ActionButton>
					</>
				) : (
					<>
						<ActionButton onClick={handleDelete} title="Delete">
							<DeleteIcon />
						</ActionButton>
					</>
				)}
			</ActionButtons>
		</Container>
	);
};

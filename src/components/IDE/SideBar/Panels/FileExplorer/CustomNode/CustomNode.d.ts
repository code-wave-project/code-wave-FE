import { NodeModel } from '@minoru/react-dnd-treeview';
import { CustomData } from '../FileExplorePanel.d';

export interface CustomNodeProps {
	node: NodeModel<CustomData>;
	depth: number;
	isOpen: boolean;
	onToggle: (id: string) => void;
}

import React from 'react';
import { DragLayerMonitorProps } from '@minoru/react-dnd-treeview';
import { CustomNodeData } from './types';
import '../../styles/components/CustomDragPreview.css';

interface CustomDragPreviewProps {
	monitorProps: DragLayerMonitorProps<CustomNodeData>;
}

export const CustomDragPreview: React.FC<CustomDragPreviewProps> = ({ monitorProps }) => {
	return (
		<div key={monitorProps.item.id} className="drag-preview">
			<span className="icon">{monitorProps.item.data?.icon}</span>
			<span className="text">{monitorProps.item.text}</span>
		</div>
	);
};

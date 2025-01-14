import { FileStructure } from '../../types'
import { NodeModel } from '@minoru/react-dnd-treeview'

export interface FileExplorerProps {
  files: FileStructure[];
  onFileSelect: (filePath: string) => void;
  onFileCreate: (file: FileStructure) => void;
  onFileDelete: (fileId: string) => void;
}

export type CustomNodeData = {
  fileType: 'file' | 'directory';
  path: string;
  icon: string;
};

export type CustomNodeModel = NodeModel<CustomNodeData>;
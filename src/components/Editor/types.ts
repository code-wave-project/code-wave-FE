import { User } from '../../types';

export interface EditorProps {
	file: string | null;
	collaborators: User[];
}

import { User } from '../../types';

export interface ChatPanelProps {
	collaborators: User[];
	onUserJoin: (user: User) => void;
	onUserLeave: (userId: string) => void;
}

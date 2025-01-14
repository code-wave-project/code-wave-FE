import { create } from 'zustand';
import { User } from '../types';

interface CollaboratorStore {
	collaborators: User[];
	addCollaborator: (user: User) => void;
	removeCollaborator: (userId: string) => void;
}

export const useCollaboratorStore = create<CollaboratorStore>(set => ({
	collaborators: [
		{ id: '1', name: 'User 1', status: 'online' },
		{ id: '2', name: 'User 2', status: 'offline' },
	],

	addCollaborator: user =>
		set(state => ({
			collaborators: [...state.collaborators, user],
		})),

	removeCollaborator: userId =>
		set(state => ({
			collaborators: state.collaborators.filter(user => user.id !== userId),
		})),
}));

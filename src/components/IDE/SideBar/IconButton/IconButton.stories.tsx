import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import FileIcon from '../../../../assets/icons/editor_menu_explorer.svg?react';

const meta = {
	title: 'Components/Sidebar/IconButton',
	component: IconButton,
	parameters: {
		layout: 'centered',
		backgrounds: {
			default: 'dark',
			values: [{ name: 'dark', value: '#1e1e1e' }],
		},
		pseudoStates: {
			hover: true,
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof IconButton>;

export const WithFileIcon: Story = {
	args: {
		icon: <FileIcon />,
		$isActive: false,
		onClick: () => console.log('IconButton clicked'),
	},
};

export const Active: Story = {
	args: {
		icon: <FileIcon />,
		$isActive: true,
		onClick: () => console.log('IconButton clicked'),
	},
};

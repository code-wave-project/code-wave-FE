import { ReactNode } from 'react';

export interface IconButtonProps {
	$isActive: boolean;
	onClick: () => void;
	icon: ReactNode;
}

import { Button } from './IconButton.style';
import type { IconButtonProps } from './IconButton.d';

export const IconButton: React.FC<IconButtonProps> = ({ $isActive, onClick, icon }) => {
	return (
		<Button $isActive={$isActive} onClick={onClick}>
			{icon}
		</Button>
	);
};

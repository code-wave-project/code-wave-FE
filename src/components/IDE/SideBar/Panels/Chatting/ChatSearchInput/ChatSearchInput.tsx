import SearchIcon from '../../../../../../assets/icons/search.svg?react';
import CloseIcon from '../../../../../../assets/icons/close.svg?react';
import { SearchContainer } from './ChatSearchInput.style';
import type { ChatSearchInputProps } from './ChatSearchInput.d';

export const ChatSearchInput: React.FC<ChatSearchInputProps> = ({ value, onChange, onClear }) => {
	const handleClear = () => {
		onChange('');
		onClear?.();
	};

	return <SearchContainer></SearchContainer>;
};

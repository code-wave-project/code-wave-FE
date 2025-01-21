import React from 'react';
import SearchIcon from '@/assets/icons/chat_search.svg?react';
import ResetIcon from '@/assets/icons/chat_reset.svg?react';
import ChatUpIcon from '@/assets/icons/chat_up.svg?react';
import ChatDownIcon from '@/assets/icons/chat_down.svg?react';
import { Container, SearchInput, LeadingIcon, TrailingIconList, TrailingIcon } from './SearchChattingInput.styles';

export const SearchChattingInput: React.FC = () => {
	return (
		<Container>
			<LeadingIcon>
				<SearchIcon />
			</LeadingIcon>
			<SearchInput placeholder="검색" />
			<TrailingIconList>
				<TrailingIcon>
					<ResetIcon />
				</TrailingIcon>
				<TrailingIcon>
					<ChatUpIcon />
				</TrailingIcon>
				<TrailingIcon>
					<ChatDownIcon />
				</TrailingIcon>
			</TrailingIconList>
		</Container>
	);
};

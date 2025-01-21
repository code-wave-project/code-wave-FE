import { COLOR } from '@/const/color';
import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0.5rem;
	padding: 0 0.5rem;
	background-color: ${COLOR.GRAY100};
`;

export const SearchInput = styled.input`
	width: 100%;
	height: 100%;
	outline: none;
	border: none;
	background-color: transparent;
	padding-left: 0.5rem;
`;

export const LeadingIcon = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2rem;
	height: 2rem;
	background-color: transparent;
`;

export const TrailingIconList = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const TrailingIcon = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2rem;
	height: 2rem;
	background-color: transparent;

	svg {
		width: 1.5rem;
		height: 1.5rem;
	}
`;

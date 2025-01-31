import styled from 'styled-components';
import { COLOR } from '@/const/color';

interface SelectedProps {
	$isSelected: boolean;
}

export const DashMenu = styled.div`
	display: flex;
	gap: 16px;
	align-items: center;
	cursor: pointer;
`;

export const SelectBar = styled.div<SelectedProps>`
	width: 4px;
	height: 43px;
	background-color: ${props => (props.$isSelected ? COLOR.BLUE500 : COLOR.WHITE)};
`;

export const MenuGroup = styled.div<SelectedProps>`
	display: flex;
	align-items: center;
	gap: 4px;

	font-weight: ${props => (props.$isSelected ? '500' : '400')};
	color: ${props => (props.$isSelected ? COLOR.BLUE500 : COLOR.GRAY600)};
`;

import styled from 'styled-components';
import { theme } from '@styles/theme';

export const ProjectCard = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	width: 254px;
	height: 204px;
	padding: 24px 32px 16px;
	border-radius: 16px;
	background-color: ${theme.COLOR.WHITE};
	line-height: normal;
	cursor: pointer;
`;

export const Title = styled.div`
	color: ${theme.COLOR.GRAY700};
	font-size: 16px;
	font-weight: 500;

	width: 190px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`;

export const Text = styled.div`
	color: ${theme.COLOR.GRAY600};
	font-size: 14px;
	font-weight: 400;

	width: 190px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`;

export const Group = styled.div`
	display: flex;
	align-items: center;
	gap: 14px;
`;

export const GroupTitle = styled.div`
	width: 46px;
	color: ${theme.COLOR.GRAY700};
	font-size: 12px;
	font-weight: 400;
`;

export const GroupText = styled.div`
	color: ${theme.COLOR.GRAY600};
	font-size: 12px;
	font-weight: 400;

	width: max-content;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`;

export const SubGroup = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
`;

export const HideGroup = styled.div`
	display: flex;
	align-items: center;
	gap: 2px;
`;

export const Copy = styled.div`
	color: ${theme.COLOR.BLUE500};
	font-size: 12px;
	font-weight: 500;
	text-decoration-line: underline;
	text-decoration-style: solid;
	text-underline-position: from-font;
`;

export const HideIcon = styled.img`
	width: 12px;
	cursor: pointer;
`;

export const SelectGroup = styled.div`
	display: flex;
	width: 100%;
	justify-content: flex-end;
	align-items: center;
	gap: 8px;
`;

export const Icon = styled.img`
	width: 24px;
	cursor: pointer;
`;

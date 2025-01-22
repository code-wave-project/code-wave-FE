import React from 'react';
import { DividerContainer, DividerContent } from './DateDivider.styles';

interface DateDividerProps {
	date: string;
}

const formatDateDivider = (dateString: string): string => {
	const today = new Date();
	const messageDate = new Date(dateString);

	// 날짜만 비교하기 위해 시간을 00:00:00으로 설정
	const todayStr = today.toISOString().split('T')[0];
	const messageDateStr = messageDate.toISOString().split('T')[0];

	// 어제 날짜 계산
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);
	const yesterdayStr = yesterday.toISOString().split('T')[0];

	if (messageDateStr === todayStr) {
		return '오늘';
	} else if (messageDateStr === yesterdayStr) {
		return '어제';
	} else {
		return messageDate.toLocaleDateString('ko-KR', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	}
};

export const DateDivider: React.FC<DateDividerProps> = ({ date }) => {
	const formattedDate = formatDateDivider(date);

	console.log(formattedDate);

	return (
		<DividerContainer>
			<DividerContent>{formattedDate}</DividerContent>
		</DividerContainer>
	);
};

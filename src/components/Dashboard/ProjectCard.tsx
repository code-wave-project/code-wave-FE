import { useState } from 'react';
import * as S from '@components/Dashboard/ProjectCard.style';

import HideIcon from '@assets/icons/password_hide.svg';
import ShowIcon from '@assets/icons/password_show.svg';
import EditIcon from '@assets/icons/project_edit.svg';
import DeleteIcon from '@assets/icons/project_delete.svg';
import ToastMessage from '@components/Common/ToastMessage';

interface ProjectCardProps {
	title: string;
	text: string;
	user: string;
	date: string;
	member: string;
	inviteCode: string;
	onEdit?: () => void;
	onDelete?: () => void;
}

function ProjectCard({ title, text, user, date, member, inviteCode, onEdit, onDelete }: ProjectCardProps) {
	const [isHidden, setIsHidden] = useState(true);
	const [isToastVisible, setIsToastVisible] = useState(false);

	const toggleHidden = () => {
		setIsHidden(prev => !prev);
	};

	const handleCopy = () => {
		if (!isHidden) {
			navigator.clipboard
				.writeText(inviteCode)
				.then(() => {
					setIsToastVisible(true);
					setTimeout(() => {
						setIsToastVisible(false);
					}, 1500);
				})
				.catch(err => {
					console.error('복사 실패:', err);
				});
		}
	};

	return (
		<>
			<S.ProjectCard>
				<S.Title>{title}</S.Title>
				<S.Text>{text}</S.Text>
				<S.Group>
					<S.GroupTitle>개설자</S.GroupTitle>
					<S.GroupText>{user}</S.GroupText>
				</S.Group>
				<S.Group>
					<S.GroupTitle>개설 일자</S.GroupTitle>
					<S.GroupText>{date}</S.GroupText>
				</S.Group>
				<S.Group>
					<S.GroupTitle>팀원</S.GroupTitle>
					<S.GroupText>{member}</S.GroupText>
				</S.Group>
				<S.Group>
					<S.GroupTitle>초대코드</S.GroupTitle>
					<S.SubGroup>
						<S.HideGroup>
							<S.GroupText>{isHidden ? '******' : inviteCode}</S.GroupText>
							{!isHidden && <S.Copy onClick={handleCopy}>복사</S.Copy>}
						</S.HideGroup>
						<S.HideIcon
							src={isHidden ? HideIcon : ShowIcon}
							alt={isHidden ? '비밀번호 보기' : '비밀번호 숨기기'}
							onClick={toggleHidden}
						/>
					</S.SubGroup>
				</S.Group>
				<S.SelectGroup>
					<S.Icon src={EditIcon} alt="프로젝트 수정하기" onClick={() => onEdit?.()} />
					<S.Icon src={DeleteIcon} alt="프로젝트 삭제하기" onClick={() => onDelete?.()} />
				</S.SelectGroup>
			</S.ProjectCard>

			{isToastVisible && <ToastMessage text="초대코드가 복사되었습니다! 팀원에게 초대 코드를 공유하세요." />}
		</>
	);
}

export default ProjectCard;

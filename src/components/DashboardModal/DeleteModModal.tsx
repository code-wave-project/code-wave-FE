import { useState } from 'react';
import * as S from '@components/DashboardModal/Modal.style';

import InputText from '@components/Common/InputText';
import ActiveButton from '@components/Common/ActiveButton';
import Button from '@components/Common/Button';

import { useDeleteProject } from '@/hooks/dashboard/useDeleteProject';

interface DeleteModProps {
	onClose?: React.MouseEventHandler<HTMLDivElement>;
	project: {
		projectId: number;
		title: string;
		initiator: string;
		createdAt: string;
		member?: string;
	};
}

const DeleteModModal = ({ onClose, project }: DeleteModProps) => {
	const [projectName, setProjectName] = useState('');
	const [isProjectNameValid, setIsProjectNameValid] = useState(false);
	const [warningMessage, setWarningMessage] = useState('프로젝트 삭제를 원하시면 해당 프로젝트의 이름을 입력하세요.');

	const { deleteProject, isLoading } = useDeleteProject();

	const handleInputChange = (value: string) => {
		const trimmedValue = value.trim();
		setProjectName(trimmedValue);

		if (trimmedValue.length === 0) {
			setWarningMessage('프로젝트 삭제를 원하시면 해당 프로젝트의 이름을 입력하세요.');
			setIsProjectNameValid(false);
		} else if (trimmedValue !== project.title) {
			setWarningMessage('프로젝트 이름이 일치하지 않습니다. 다시 확인하세요.');
			setIsProjectNameValid(false);
		} else {
			setWarningMessage('');
			setIsProjectNameValid(true);
		}
	};

	console.log(projectName);

	// const isFormValid = isProjectNameValid;

	const handleSubmit = (event: React.MouseEvent<HTMLDivElement>) => {
		if (!isProjectNameValid) {
			setWarningMessage('프로젝트 이름이 일치하지 않습니다. 다시 확인하세요.');
			return;
		}

		deleteProject(project.projectId, {
			onSuccess: () => {
				if (onClose) onClose(event);
			},
		});
	};

	return (
		<>
			<S.ModalBackground onClick={onClose} />
			<S.ModalSpace>
				<S.ModalWrap>
					<S.ModalContent>
						<S.TextGroup>
							<S.Title>프로젝트 삭제</S.Title>
							<S.DescriptionGroup>
								<S.Label>프로젝트</S.Label>
								<S.Text>{project.title}</S.Text>
							</S.DescriptionGroup>
							<S.DescriptionGroup>
								<S.Label>생성자</S.Label>
								<S.Text>{project.initiator}</S.Text>
							</S.DescriptionGroup>
							<S.DescriptionGroup>
								<S.Label>팀원</S.Label>
								<S.Text>{project?.member}</S.Text>
							</S.DescriptionGroup>
							<S.DescriptionGroup>
								<S.Label>생성일자</S.Label>
								<S.Text>{new Date(project.createdAt).toLocaleDateString()}</S.Text>
							</S.DescriptionGroup>
						</S.TextGroup>
						<S.TextGroup>
							<InputText
								label="프로젝트 삭제를 위해 프로젝트 이름을 입력하세요."
								placeholder="프로젝트 이름을 입력하세요."
								warningMsg={warningMessage}
								isEssential={true}
								onInputChange={handleInputChange}
							/>
						</S.TextGroup>
						<S.ButtonGroup>
							<ActiveButton
								onClick={handleSubmit}
								text={isLoading ? '삭제 중...' : '삭제'}
								isActive={isProjectNameValid && !isLoading}
								isLarge={false}
							/>
							<Button onClick={onClose} text="취소" isLarge={false} />
						</S.ButtonGroup>
					</S.ModalContent>
				</S.ModalWrap>
			</S.ModalSpace>
		</>
	);
};

export default DeleteModModal;

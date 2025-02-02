import { useState, useEffect } from 'react';
import * as S from '@components/DashboardModal/Modal.style';

import InputText from '@components/Common/InputText';
import ActiveButton from '@components/Common/ActiveButton';
import Button from '@components/Common/Button';

import { useUpsertProject } from '@/hooks/dashboard/useUpsertProject';

interface CreateModProps {
	onClose?: React.MouseEventHandler<HTMLDivElement>;
	isCreate: boolean;
	initialData?: {
		projectId?: number;
		title?: string;
		description: string;
	} | null;
}

const CreateModModal = ({ onClose, isCreate, initialData }: CreateModProps) => {
	const [projectName, setProjectName] = useState(initialData?.title || '');
	const [projectDescription, setProjectDescription] = useState(initialData?.description || '');
	const [isProjectNameValid, setIsProjectNameValid] = useState(false);

	const { upsertProject, isLoading } = useUpsertProject();

	useEffect(() => {
		setProjectName(initialData?.title || '');
		setProjectDescription(initialData?.description || '');
	}, [initialData]);

	const handleInputChange = (value: string, isEssential?: boolean) => {
		if (isEssential) {
			setProjectName(value);
			setIsProjectNameValid(value.trim().length > 0);
		} else {
			setProjectDescription(value);
		}
	};

	const isFormValid = isProjectNameValid;

	const handleSubmit = (event: React.MouseEvent<HTMLDivElement>) => {
		upsertProject(
			{
				projectId: initialData?.projectId, // 수정 시 ID 포함, 생성 시 생략
				projectName,
				projectDescription,
			},
			{
				onSuccess: () => {
					if (onClose) onClose(event);
				},
			},
		);
	};

	return (
		<>
			<S.ModalBackground onClick={onClose} />
			<S.ModalSpace>
				<S.ModalWrap>
					<S.ModalContent>
						<S.TextGroup>
							<S.Title>프로젝트</S.Title>
							<InputText
								label="프로젝트 이름"
								placeholder="프로젝트 이름을 입력하세요."
								warningMsg="프로젝트 이름은 필수 입력 사항입니다."
								isEssential={true}
								value={projectName}
								onInputChange={handleInputChange}
							/>
							<InputText
								label="프로젝트 설명"
								placeholder="프로젝트 설명을 입력하세요."
								value={projectDescription ?? ''}
								onInputChange={handleInputChange}
							/>
						</S.TextGroup>
						<S.ButtonGroup>
							<ActiveButton
								onClick={handleSubmit}
								text={isLoading ? (isCreate ? '생성 중...' : '수정 중...') : isCreate ? '생성' : '수정'}
								isActive={isFormValid && !isLoading}
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

export default CreateModModal;

import { useState } from 'react';
import * as S from '@components/DashboardModal/Modal.style';

import InputText from '@components/Common/InputText';
import ActiveButton from '@components/Common/ActiveButton';
import Button from '@components/Common/Button';

interface CreateModProps {
	onClose?: React.MouseEventHandler<HTMLDivElement>;
	isCreate: boolean;
	initialData?: {
		title?: string;
		text?: string;
	} | null;
}

const CreateModModal = ({ onClose, isCreate, initialData }: CreateModProps) => {
	const [projectName, setProjectName] = useState(initialData?.title || '');
	const [projectDescription, setProjectDescription] = useState(initialData?.text || '');
	const [isProjectNameValid, setIsProjectNameValid] = useState(false);

	const handleInputChange = (value: string, isEssential?: boolean) => {
		if (isEssential) {
			setProjectName(value);
			setIsProjectNameValid(value.trim().length > 0);
		} else {
			setProjectDescription(value);
		}
	};

	console.log(projectName, projectDescription);

	const isFormValid = isProjectNameValid;

	const handleSubmit = (event: React.MouseEvent<HTMLDivElement>) => {
		console.log('프로젝트 생성 또는 수정 버튼 클릭됨');

		if (onClose) {
			onClose(event);
		}
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
								onInputChange={handleInputChange}
							/>
							<InputText
								label="프로젝트 설명"
								placeholder="프로젝트 설명을 입력하세요."
								onInputChange={handleInputChange}
							/>
						</S.TextGroup>
						<S.ButtonGroup>
							<ActiveButton
								onClick={handleSubmit}
								text={isCreate ? '생성' : '수정'}
								isActive={isFormValid}
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

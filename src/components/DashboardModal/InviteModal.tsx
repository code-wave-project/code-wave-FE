import { useState } from 'react';
import * as S from '@components/DashboardModal/Modal.style';

import InputText from '@components/Common/InputText';
import ActiveButton from '@components/Common/ActiveButton';
import Button from '@components/Common/Button';

import { useJoinProject } from '@/hooks/dashboard/useJoinProject';

interface InviteModalProps {
	onClose?: React.MouseEventHandler<HTMLDivElement>;
}

const InviteModal = ({ onClose }: InviteModalProps) => {
	const [inviteCode, setInviteCode] = useState('');
	const [isinviteCodeValid, setIsInviteCodeValid] = useState(false);

	const { joinProject, isLoading } = useJoinProject();

	const handleInputChange = (value: string, isEssential?: boolean) => {
		if (isEssential) {
			setInviteCode(value);
			setIsInviteCodeValid(value.trim().length > 0);
		}
	};

	console.log(inviteCode);

	const isFormValid = isinviteCodeValid;

	const handleSubmit = (event: React.MouseEvent<HTMLDivElement>) => {
		if (!isFormValid || isLoading) return;

		joinProject(inviteCode, {
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
							<S.Title>프로젝트 참여</S.Title>
							<InputText
								label="초대 코드"
								placeholder="초대코드를 입력하세요."
								warningMsg="초대코드는 필수 입력 사항입니다."
								isEssential={true}
								onInputChange={handleInputChange}
							/>
						</S.TextGroup>
						<S.ButtonGroup>
							<ActiveButton
								onClick={handleSubmit}
								text={isLoading ? '참여 중...' : '참여'}
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

export default InviteModal;

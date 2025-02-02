// import * as S from '@/styles/pages/Profile.style';

import { useState } from 'react';
import styled from 'styled-components';
import logoHeader from '../assets/logos/logo_header.png';
import { useNavigate } from 'react-router-dom';
import UserIcon from '@assets/icons/icon_user.svg';

const OuterContainer = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.COLOR.GRAY100};
`;

const TermsTitle = styled.div`
	font-size: 1rem;
	font-weight: bold;
	color: ${({ theme }) => theme.COLOR.GRAY700};
	margin-bottom: 0.5rem;
	text-align: left;
`;

const ProfileBox = styled.div`
	width: 400px;
	padding: 2rem;
	padding-bottom: 4rem;
	background: ${({ theme }) => theme.COLOR.WHITE};
	border-radius: 1rem;
	display: flex;
	flex-direction: row;
	gap: 1rem;
	position: relative;
`;

const UserInputContainer = styled.div`
	text-align: center;
`;

const TitleContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
`;

const Title = styled.h2`
	font-size: 1.5rem;
	font-weight: bold;
	margin-bottom: 1.5rem;
	color: ${({ theme }) => theme.COLOR.GRAY700};
`;

const Logo = styled.img`
	width: auto;
	height: 2rem;
`;

const UserProfile = styled.img`
	width: 3rem;
	height: 3rem;
`;

const Input = styled.input<{ error?: boolean }>`
	width: 100%;
	padding: 0.5rem;
	margin-bottom: 1.5rem;
	border-bottom: 1px solid ${({ theme, value, error }) => (value || !error ? theme.COLOR.GRAY300 : theme.COLOR.PINK500)};
	font-size: 1rem;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	gap: 10px;
	margin-top: 2rem;
`;

const Button = styled.button<{ valiad?: boolean }>`
	width: 100%;
	height: 48px;
	padding: 0.5rem 1rem;
	background-color: ${({ valiad, theme }) => (valiad ? theme.COLOR.BLUE500 : theme.COLOR.WHITE)};
	color: ${({ valiad, theme }) => (valiad ? theme.COLOR.WHITE : theme.COLOR.BLUE500)};
	font-size: 1rem;
	font-weight: bold;
	border: 1px solid ${({ theme }) => theme.COLOR.BLUE500};
	border-radius: 0.5rem;
`;

const ResetPasswordButton = styled.button`
	padding: 0.8rem 0.5rem;
	background-color: ${({ theme }) => theme.COLOR.BLUE500};
	color: ${({ theme }) => theme.COLOR.WHITE};
	font-size: 0.8rem;
	border-radius: 10px;
	display: block;
`;

const DeleteAccount = styled.button`
	margin-top: 2rem;
	font-size: 0.8rem;
	color: ${({ theme }) => theme.COLOR.PINK500};
	background: none;
	border: none;
	cursor: pointer;
	text-decoration: underline;
	position: absolute;
	bottom: 1.5rem;
	left: 45%;
`;

const ErrorMessage = styled.div`
	color: ${({ theme }) => theme.COLOR.PINK500};
	font-size: 0.7rem;
	text-align: left;
	margin-top: -0.5rem;
	margin-bottom: 1rem;
`;

const DialogOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
`;

const Dialog = styled.div<{ deleteDialog?: boolean }>`
	width: 300px;
	background: ${({ theme }) => theme.COLOR.WHITE};
	padding: 1.5rem;
	border: 2px solid ${({ deleteDialog, theme }) => (deleteDialog ? theme.COLOR.PINK500 : theme.COLOR.BLUE500)};
	border-radius: 1rem;
	text-align: center;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const DialogTitle = styled.h3`
	font-size: 1.25rem;
	font-weight: bold;
	color: ${({ theme }) => theme.COLOR.GRAY700};
	margin-bottom: 1rem;
`;

const DialogMessage = styled.p`
	font-size: 1rem;
	color: ${({ theme }) => theme.COLOR.GRAY600};
	margin-bottom: 1.5rem;
`;

const DialogButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 1rem;
`;

const DialogButton = styled.button<{ outline?: boolean }>`
	width: 100%;
	height: 48px;
	padding: 0.5rem 1rem;
	background-color: ${({ outline, theme }) => (outline ? theme.COLOR.WHITE : theme.COLOR.BLUE500)};
	color: ${({ outline, theme }) => (outline ? theme.COLOR.BLUE500 : theme.COLOR.WHITE)};
	font-size: 1rem;
	font-weight: bold;
	border: 1px solid ${({ theme }) => theme.COLOR.BLUE500};
	border-radius: 0.5rem;
`;

const DeleteDialogButton = styled.button<{ outline?: boolean }>`
	width: 100%;
	height: 48px;
	padding: 0.5rem 1rem;
	background-color: ${({ outline, theme }) => (outline ? theme.COLOR.WHITE : theme.COLOR.PINK500)};
	color: ${({ outline, theme }) => (outline ? theme.COLOR.PINK500 : theme.COLOR.WHITE)};
	font-size: 1rem;
	font-weight: bold;
	border: 1px solid ${({ theme }) => theme.COLOR.PINK500};
	border-radius: 0.5rem;
`;

const Profile = () => {
	const navigate = useNavigate();

	const [name, setName] = useState('조희우');
	const [id, setId] = useState('user');
	const [email, setEmail] = useState('user@naver.com');
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	const [isButtonClick, setButtonClick] = useState(false);

	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
	const isValiad = !!(
		name &&
		id &&
		email &&
		(name != '조희우' || id != 'user' || email != 'user@naver.com') &&
		emailRegex.test(email)
	);

	const handleSave = () => {
		setButtonClick(true);
		if (isValiad) {
			setIsDialogOpen(true);
		}
	};

	const handleResetPassword = () => {
		navigate('/reset');
	};

	const handleCancel = () => {
		window.history.back();
	};

	const handleDelete = () => {
		setIsDeleteDialogOpen(true);
	};

	const handleDialogConfirm = () => {
		setIsDialogOpen(false);
		window.history.back();
	};

	const handleDialogCancel = () => {
		setIsDialogOpen(false);
		setIsDeleteDialogOpen(false);
	};
	
	const deleteDialogConfirm = () => {
		setIsDeleteDialogOpen(false);
		localStorage.removeItem('accessToken');
		navigate('/');
	};

	return (
		<OuterContainer>
			<TitleContainer>
				<Logo src={logoHeader} alt="Code Wave" />
				<Title>프로필 수정</Title>
			</TitleContainer>
			<ProfileBox>
				<UserProfile src={UserIcon} alt="프로필" />
				<UserInputContainer>
				<TermsTitle>이름</TermsTitle>
				<Input
					type="text"
					value={name}
					error={!isValiad && isButtonClick}
					onChange={e => setName(e.target.value)}
					placeholder="이름"
				/>
				{!name && <ErrorMessage>이름은 필수 입력 사항입니다.</ErrorMessage>}

				<TermsTitle>아이디</TermsTitle>
				<Input
					type="text"
					value={id}
					error={!isValiad && isButtonClick}
					onChange={e => setId(e.target.value)}
					placeholder="아이디"
				/>
				{!id && <ErrorMessage>아이디는 필수 입력 사항입니다.</ErrorMessage>}

				<TermsTitle>이메일</TermsTitle>
				<Input
					type="email"
					value={email}
					error={!isValiad && isButtonClick}
					onChange={e => setEmail(e.target.value)}
					placeholder="이메일"
				/>
				{!email && <ErrorMessage>이메일은 필수 입력 사항입니다.</ErrorMessage>}

				{!isValiad && isButtonClick && (
					<ErrorMessage>변경 사항이 없거나 입력 사항이 유효하지 않습니다. 다시 확인해주세요.</ErrorMessage>
				)}

				<TermsTitle>비밀번호</TermsTitle>
				<ResetPasswordButton onClick={handleResetPassword}>비밀번호 재설정</ResetPasswordButton>

				<ButtonContainer>
					<Button valiad={isValiad} onClick={handleSave}>
						수정
					</Button>
					<Button onClick={handleCancel}>취소</Button>
				</ButtonContainer>
				<DeleteAccount onClick={handleDelete}>계정 탈퇴</DeleteAccount>

				{isDialogOpen && (
					<DialogOverlay>
						<Dialog>
							<DialogTitle>프로필 수정</DialogTitle>
							<DialogMessage>프로필을 수정하시겠습니까?</DialogMessage>
							<DialogButtonContainer>
								<DialogButton onClick={handleDialogConfirm}>수정</DialogButton>
								<DialogButton outline onClick={handleDialogCancel}>
									취소
								</DialogButton>
							</DialogButtonContainer>
						</Dialog>
					</DialogOverlay>
				)}

				{isDeleteDialogOpen && (
					<DialogOverlay>
						<Dialog deleteDialog>
							<DialogTitle>계정 탈퇴</DialogTitle>
							<DialogMessage>코드웨이브를 탈퇴하시겠습니까?</DialogMessage>
							<DialogButtonContainer>
								<DeleteDialogButton onClick={deleteDialogConfirm}>탈퇴</DeleteDialogButton>
								<DeleteDialogButton outline onClick={handleDialogCancel}>
									취소
								</DeleteDialogButton>
							</DialogButtonContainer>
						</Dialog>
					</DialogOverlay>
				)}
				</UserInputContainer>
			</ProfileBox>
		</OuterContainer>
	);
};

export default Profile;

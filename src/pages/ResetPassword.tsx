// import * as S from '@/styles/pages/ResetPassword.style';

import { useState } from 'react';
import styled from 'styled-components';
import logoHeader from '../assets/logos/logo_header.png';
import passwordShow from '../assets/icons/password_show.svg';
import passwordHide from '../assets/icons/password_hide.svg';

const OuterContainer = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.COLOR.GRAY100};
`;

const ResetPasswordBox = styled.div`
	width: 400px;
	padding: 2rem;
	background: ${({ theme }) => theme.COLOR.WHITE};
	border-radius: 1rem;
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

const InputContainer = styled.div`
	position: relative;
	width: 100%;
`;

const Input = styled.input`
	width: 100%;
	padding: 0.5rem;
	margin-bottom: 1.5rem;
	border-bottom: 1px solid ${({ theme }) => theme.COLOR.GRAY300};
	font-size: 1rem;
`;

const PasswordShowButton = styled.button`
	position: absolute;
	top: 50%;
	right: 10px;
	transform: translateY(-100%);
	background: none;
	border: none;
	cursor: pointer;
`;

const Button = styled.button`
	width: 100%;
	height: 48px;
	background-color: ${({ disabled, theme }) => (disabled ? theme.COLOR.WHITE : theme.COLOR.BLUE500)};
	color: ${({ disabled, theme }) => (disabled ? theme.COLOR.BLUE500 : theme.COLOR.WHITE)};
	font-size: 1rem;
	font-weight: bold;
	margin-top: 1rem;
	border: 1px solid ${({ theme }) => theme.COLOR.BLUE500};
	border-radius: 0.5rem;
	border-radius: 10px;
	cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const Discription = styled.p`
	margin-bottom: 2rem;
	font-size: 1rem;
	color: ${({ theme }) => theme.COLOR.GRAY700};
`;

const ResetPassword = () => {
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
	const isValiad = password && confirmPassword && password === confirmPassword;

	const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setConfirmPassword(e.target.value);
	};

	return (
		<OuterContainer>
			<TitleContainer>
				<Logo src={logoHeader} />
				<Title>비밀번호 재설정</Title>
			</TitleContainer>
			<ResetPasswordBox>
				<Discription>비밀번호를 재설정하세요.</Discription>
				<InputContainer>
					<Input
						type={passwordVisible ? 'text' : 'password'}
						name="password"
						placeholder="비밀번호"
						value={password}
						onChange={e => {
							setPassword(e.target.value);
						}}
					/>
					<PasswordShowButton onClick={() => setPasswordVisible(!passwordVisible)}>
						<img src={passwordVisible ? passwordShow : passwordHide} />
					</PasswordShowButton>
				</InputContainer>
				<InputContainer>
					<Input
						type={confirmPasswordVisible ? 'text' : 'password'}
						placeholder="비밀번호 확인"
						value={confirmPassword}
						onChange={handleConfirmPasswordChange}
					/>
					<PasswordShowButton onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
						<img src={confirmPasswordVisible ? passwordShow : passwordHide} alt="비밀번호 보기" />
					</PasswordShowButton>
				</InputContainer>
				<Button disabled={!isValiad}>다음</Button>
			</ResetPasswordBox>
		</OuterContainer>
	);
};

export default ResetPassword;
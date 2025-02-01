// import * as S from '@/styles/pages/SignUp.style';

import { useState, useEffect } from 'react';
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

const SignupBox = styled.div`
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

const CheckboxLabel = styled.label`
	display: flex;
	align-items: center;
	font-size: 1rem;
	cursor: pointer;
	font-weight: Regular;
	color: ${({ theme }) => theme.COLOR.GRAY500};
	margin-bottom: 1rem;
`;

const CheckboxInput = styled.input`
	appearance: none;
	width: 20px;
	height: 20px;
	margin-right: 4px;
	border: 1px solid ${({ theme }) => theme.COLOR.GRAY300};
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: border-color 0.3s ease-in-out;

	&:checked {
		border-color: ${({ theme }) => theme.COLOR.BLUE500};
		background-color: ${({ theme }) => theme.COLOR.WHITE};
		position: relative;
	}

	&:checked::after {
		content: '';
		width: 12px;
		height: 12px;
		background-color: ${({ theme }) => theme.COLOR.BLUE500};
		border-radius: 50%;
		position: absolute;
	}
`;

const CustomHr = styled.hr`
	width: 50%;
	border: 1px solid ${({ theme }) => theme.COLOR.GRAY200};
	margin-bottom: 1rem;
`;

const Signup = () => {
	const [step, setStep] = useState(1);
	const [form, setForm] = useState({ name: '', id: '', email: '', password: '' });
	const [termsAccepted, setTermsAccepted] = useState(false);
	const [serviceTerms, setServiceTerms] = useState(false);
	const [privacyPolicy, setPrivacyPolicy] = useState(false);
	const [isStepOneValid, setIsStepOneValid] = useState(false);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

	useEffect(() => {
		const allChecked = serviceTerms && privacyPolicy;
		setIsStepOneValid(allChecked);
		setTermsAccepted(allChecked);
	}, [serviceTerms, privacyPolicy]);

	const handleToggleTerms = () => {
		const newChecked = !termsAccepted;
		setTermsAccepted(newChecked);
		setServiceTerms(newChecked);
		setPrivacyPolicy(newChecked);
	};

	const handleInformationChange = (e: { target: { name: string; value: string } }) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setConfirmPassword(e.target.value);
	};

	const isStepSecondValid = form.name && form.id && form.email;
	const isStepThirdValid = password && confirmPassword && password === confirmPassword;

	return (
		<OuterContainer>
			<TitleContainer>
				<Logo src={logoHeader} />
				<Title>회원가입</Title>
			</TitleContainer>
			<SignupBox>
				{step === 1 && (
					<>
						<CheckboxLabel>
							<CheckboxInput type="checkbox" checked={termsAccepted} onChange={handleToggleTerms} />
							약관 전체 동의
						</CheckboxLabel>
						<CustomHr />
						<CheckboxLabel>
							<CheckboxInput type="checkbox" checked={serviceTerms} onChange={() => setServiceTerms(!serviceTerms)} />
							코드웨이브 이용약관 동의
						</CheckboxLabel>

						<CheckboxLabel>
							<CheckboxInput
								type="checkbox"
								checked={privacyPolicy}
								onChange={() => setPrivacyPolicy(!privacyPolicy)}
							/>
							개인정보 수집 및 이용 동의
						</CheckboxLabel>
						<Button disabled={!isStepOneValid} onClick={() => setStep(2)}>
							다음
						</Button>
					</>
				)}
				{step === 2 && (
					<>
						<Input type="text" name="name" placeholder="이름" value={form.name} onChange={handleInformationChange} />
						<Input type="text" name="id" placeholder="아이디" value={form.id} onChange={handleInformationChange} />
						<Input
							type="email"
							name="email"
							placeholder="이메일"
							value={form.email}
							onChange={handleInformationChange}
						/>
						<Button disabled={!isStepSecondValid} onClick={() => setStep(3)}>
							다음
						</Button>
					</>
				)}
				{step === 3 && (
					<>
						<InputContainer>
							<Input
								type={passwordVisible ? 'text' : 'password'}
								name="password"
								placeholder="비밀번호"
								value={password}
								onChange={e => {
									setPassword(e.target.value);
									handleInformationChange(e);
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
						<Button
							disabled={!isStepThirdValid}
							onClick={() =>
								alert(`이메일: ${form.email}\n아이디: ${form.id}\n이름: ${form.name}\n비밀번호: ${form.password}`)
							}>
							회원 가입
						</Button>
					</>
				)}
			</SignupBox>
		</OuterContainer>
	);
};

export default Signup;

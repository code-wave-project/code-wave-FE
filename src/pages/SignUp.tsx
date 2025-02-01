import { useState, useEffect } from 'react';
import styled from 'styled-components';
import logoHeader from '../assets/logos/logo_header.png';
import passwordShow from '../assets/icons/password_show.svg';
import passwordHide from '../assets/icons/password_hide.svg';
import moreButton from '../assets/icons/more.svg';
import { useNavigate } from 'react-router-dom';

const OuterContainer = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.COLOR.GRAY100};
`;

const InnerContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const TermsTitle = styled.div`
	font-size: 1rem;
	font-weight: bold;
	color: ${({ theme }) => theme.COLOR.GRAY700};
	margin-bottom: 0.5rem;
	text-align: left;
`;

const Indicator = styled.div<{ isActive: number }>`
	display: flex;
	margin-right: 10px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 1rem 0 0 1rem;
	visibility: ${({ isActive }) => (isActive === 4 ? 'hidden' : 'visible')};
`;

const IndicatorTitle = styled.span<{ isActive: boolean }>`
	color: ${({ isActive, theme }) => (isActive ? theme.COLOR.BLUE500 : 'transparent')};
	font-size: 16px;
`;

const IndicatorStep = styled.div<{ isActive: boolean }>`
	width: 12px;
	height: 12px;
	border-radius: 50%;
	background-color: ${({ isActive, theme }) => (isActive ? theme.COLOR.BLUE500 : theme.COLOR.GRAY300)};
	transition: background-color 0.3s ease-in-out;
	display: inline-block;
`;

const StepContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	margin-bottom: 1rem;
	font-size: 1rem;
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

const ButtonContainer = styled.div`
	display: flex;
	gap: 1rem;
	margin-top: 1rem;
`;

const PreviousButton = styled.button`
	width: 100%;
	height: 48px;
	background-color: ${({ theme }) => theme.COLOR.WHITE};
	color: ${({ theme }) => theme.COLOR.BLUE500};
	font-size: 1rem;
	font-weight: bold;
	border: 1px solid ${({ theme }) => theme.COLOR.BLUE500};
	border-radius: 0.5rem;
	border-radius: 10px;
	cursor: pointer};
`;

const Button = styled.button<{ state: boolean }>`
	width: 100%;
	height: 48px;
	background-color: ${({ state, theme }) => (state ? theme.COLOR.BLUE500 : theme.COLOR.WHITE)};
	color: ${({ state, theme }) => (state ? theme.COLOR.WHITE : theme.COLOR.BLUE500)};
	font-size: 1rem;
	font-weight: bold;
	border: 1px solid ${({ theme }) => theme.COLOR.BLUE500};
	border-radius: 0.5rem;
	border-radius: 10px;
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

const MoreButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
`;

const TextHighLight = styled.p`
	margin-right: 5px;
	color: ${({ theme }) => theme.COLOR.BLUE500};
`;

const CustomHr = styled.hr`
	width: 50%;
	border: 1px solid ${({ theme }) => theme.COLOR.GRAY200};
	margin-bottom: 1rem;
`;

const ErrorMessage = styled.div`
	color: ${({ theme }) => theme.COLOR.PINK500};
	font-size: 0.7rem;
	text-align: left;
	margin-top: -0.5rem;
	margin-bottom: 1rem;
`;

const Signup = () => {
	const [step, setStep] = useState(1);
	const [form, setForm] = useState({ name: '', id: '', email: '', password: '' });
	const [termsAccepted, setTermsAccepted] = useState(false);
	const [serviceTerms, setServiceTerms] = useState(false);
	const [privacyPolicy, setPrivacyPolicy] = useState(false);
	const [isStepFirstValid, setIsFirstValid] = useState(false);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
	const navigate = useNavigate();

	const [firstButtonClick, setFirstButtonClick] = useState(false);
	const [secondButtonClick, setSecondButtonClick] = useState(false);
	const [thirdButtonClick, setThirdButtonClick] = useState(false);

	useEffect(() => {
		const allChecked = serviceTerms && privacyPolicy;
		setIsFirstValid(allChecked);
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

	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

	const isStepSecondValid = !!(form.name && form.id && form.email && emailRegex.test(form.email));
	const isStepThirdValid = !!(password && confirmPassword && password === confirmPassword);

	return (
		<OuterContainer>
			<Indicator isActive={step}>
				<StepContainer>
					<IndicatorTitle isActive={step === 1}>약관 동의</IndicatorTitle>
					<IndicatorStep isActive={step === 1} />
				</StepContainer>
				<StepContainer>
					<IndicatorTitle isActive={step === 2}>회원 정보</IndicatorTitle>
					<IndicatorStep isActive={step === 2} />
				</StepContainer>
				<StepContainer>
					<IndicatorTitle isActive={step === 3}>비밀 번호</IndicatorTitle>
					<IndicatorStep isActive={step === 3} />
				</StepContainer>
			</Indicator>

			<InnerContainer>
				<TitleContainer>
					<Logo src={logoHeader} />
					<Title>회원가입</Title>
				</TitleContainer>
				<SignupBox>
					{step === 1 && (
						<>
							<TermsTitle>이용 약관</TermsTitle>
							<CheckboxLabel>
								<CheckboxInput type="checkbox" checked={termsAccepted} onChange={handleToggleTerms} />
								약관 전체 동의
								<MoreButton>
									<img src={moreButton} />
								</MoreButton>
							</CheckboxLabel>

							<CustomHr />

							<CheckboxLabel>
								<CheckboxInput type="checkbox" checked={serviceTerms} onChange={() => setServiceTerms(!serviceTerms)} />
								<TextHighLight>필수</TextHighLight>코드웨이브 이용약관 동의
								<MoreButton>
									<img src={moreButton} />
								</MoreButton>
							</CheckboxLabel>

							<CheckboxLabel>
								<CheckboxInput
									type="checkbox"
									checked={privacyPolicy}
									onChange={() => setPrivacyPolicy(!privacyPolicy)}
								/>
								<TextHighLight>필수</TextHighLight>개인정보처리방침 동의
								<MoreButton>
									<img src={moreButton} />
								</MoreButton>
							</CheckboxLabel>

							{firstButtonClick && !isStepFirstValid && <ErrorMessage>약관에 동의해 주세요.</ErrorMessage>}

							<ButtonContainer>
								<PreviousButton onClick={() => navigate('/login')}>취소</PreviousButton>
								<Button
									state={isStepFirstValid}
									onClick={() => {
										if (!isStepFirstValid) {
											setFirstButtonClick(true);
										} else {
											setStep(2);
											setFirstButtonClick(false);
										}
									}}>
									다음
								</Button>
							</ButtonContainer>
						</>
					)}
					{step === 2 && (
						<>
							<InputContainer>
								<TermsTitle>이름</TermsTitle>
								<Input
									type="text"
									name="name"
									value={form.name}
									onChange={handleInformationChange}
									placeholder="이름"
								/>
								<TermsTitle>아이디</TermsTitle>
								<Input type="text" name="id" value={form.id} onChange={handleInformationChange} placeholder="아이디" />
								<TermsTitle>이메일</TermsTitle>
								<Input
									type="email"
									name="email"
									value={form.email}
									onChange={handleInformationChange}
									placeholder="이메일"
								/>
							</InputContainer>

							{secondButtonClick && !isStepSecondValid && <ErrorMessage>올바르지 않은 정보가 있습니다.</ErrorMessage>}

							<ButtonContainer>
								<PreviousButton onClick={() => setStep(1)}>이전</PreviousButton>
								<Button
									state={isStepSecondValid}
									onClick={() => {
										if (!isStepSecondValid) {
											setSecondButtonClick(true);
										} else {
											setStep(3);
											setSecondButtonClick(false);
										}
									}}>
									다음
								</Button>
							</ButtonContainer>
						</>
					)}
					{step === 3 && (
						<>
							<InputContainer>
								<TermsTitle>비밀번호</TermsTitle>
								<Input
									type={passwordVisible ? 'text' : 'password'}
									value={password}
									onChange={e => {
										setPassword(e.target.value);
										handleInformationChange(e);
									}}
									placeholder="비밀번호"
								/>
								<PasswordShowButton onClick={() => setPasswordVisible(prev => !prev)}>
									<img src={passwordVisible ? passwordHide : passwordShow} />
								</PasswordShowButton>
							</InputContainer>

							<InputContainer>
								<TermsTitle>비밀번호 확인</TermsTitle>
								<Input
									type={confirmPasswordVisible ? 'text' : 'password'}
									value={confirmPassword}
									onChange={handleConfirmPasswordChange}
									placeholder="비밀번호 확인"
								/>
								<PasswordShowButton onClick={() => setConfirmPasswordVisible(prev => !prev)}>
									<img src={confirmPasswordVisible ? passwordHide : passwordShow} />
								</PasswordShowButton>
							</InputContainer>

							{thirdButtonClick && !isStepThirdValid && <ErrorMessage>비밀번호를 확인해주세요.</ErrorMessage>}

							<ButtonContainer>
								<PreviousButton onClick={() => setStep(2)}>이전</PreviousButton>
								<Button
									state={isStepThirdValid}
									onClick={() => {
										if (!isStepThirdValid) {
											setThirdButtonClick(true);
										} else {
											setStep(4);
											setThirdButtonClick(false);
											form.password = password;
										}
									}}>
									회원가입
								</Button>
							</ButtonContainer>
						</>
					)}
					{step === 4 && (
						<>
							<p style={{ marginBottom: '1rem' }}>
								회원가입이 완료되었습니다.
								<br />
								로그인 화면으로 이동하여 로그인하세요.
							</p>

							<PreviousButton
								onClick={() => {
									navigate('/login');
								}}>
								로그인으로 이동
							</PreviousButton>
						</>
					)}
				</SignupBox>
			</InnerContainer>
		</OuterContainer>
	);
};

export default Signup;

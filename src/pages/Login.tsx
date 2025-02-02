// import * as S from '@/styles/pages/Login.style';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logoHeader from '../assets/logos/logo_header.png';
import logoGoogle from '../assets/icons/login_google.svg';
import logoKakao from '../assets/icons/login_kakao.svg';
import passwordShow from '../assets/icons/password_show.svg';
import passwordHide from '../assets/icons/password_hide.svg';
import { useSignIn } from '@/hooks/auth/useSignIn';

const OuterContainer = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.COLOR.GRAY100};
`;

const LoginBox = styled.div`
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

const Input = styled.input<{ loginError: boolean }>`
	width: 100%;
	padding: 0.5rem;
	margin-bottom: 1.5rem;
	border-bottom: 1px solid ${({ loginError, theme }) => (loginError ? theme.COLOR.PINK500 : theme.COLOR.GRAY300)};
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

const LoginOptions = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
	width: 100%;
`;

const CheckboxLabel = styled.label`
	display: flex;
	align-items: center;
	font-size: 1rem;
	cursor: pointer;
	font-weight: Regular;
	color: ${({ theme }) => theme.COLOR.GRAY500};
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

const FindAccount = styled.button`
	color: ${({ theme }) => theme.COLOR.GRAY500};
	font-size: 1rem;
	cursor: pointer;
`;

const LoginButton = styled.button`
	width: 100%;
	height: 48px;
	background-color: ${({ theme }) => theme.COLOR.BLUE500};
	color: ${({ theme }) => theme.COLOR.WHITE};
	font-size: 1rem;
	font-weight: bold;
	margin-top: 1rem;
	border: none;
	border-radius: 10px;
	cursor: pointer;
`;

const SNSTitle = styled.div`
	font-size: 1rem;
	color: #7f8295;
	margin-top: 2rem;
`;

const SNSContainer = styled.div`
	margin-top: 1rem;
	display: flex;
	justify-content: center;
	gap: 2rem;
`;

const SNSButton = styled.button`
	background: none;
	border: 1px solid ${({ theme }) => theme.COLOR.GRAY100};
	border-radius: 1rem;
	padding: 0.5rem;
	cursor: pointer;
	font-size: 1rem;
`;

const SignupButton = styled.button`
	width: 100%;
	height: 48px;
	border: 1px solid ${({ theme }) => theme.COLOR.BLUE500};
	border-radius: 0.5rem;
	background: none;
	font-weight: bold;
	color: ${({ theme }) => theme.COLOR.BLUE500};
	font-size: 1rem;
	margin-top: 2rem;
	cursor: pointer;
`;

const ErrorMessage = styled.div`
	color: ${({ theme }) => theme.COLOR.PINK500};
	font-size: 0.7rem;
	text-align: left;
	margin-top: -0.5rem;
	margin-bottom: 1rem;
`;

const Login = () => {
	const [rememberAccount, setRememberAccount] = useState(false);
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [userID, setUserID] = useState('');
	const [password, setPassword] = useState('');
	const { signIn, isLoading, error: signInError } = useSignIn();
	const navigate = useNavigate();

	// 테스트 계정
	// 	"email": "ex@naver.com",
	// 	"password": "123qwe!@#",
	// 	"name": "ex11"
	const handleLogin = async () => {
		try {
			await signIn({
				email: userID,
				password: password,
			});
		} catch (error) {
			console.error('Login failed:', error);
			if(error === 500){
				navigate('/errorServer');
			}
		}
	};

	return (
		<OuterContainer>
			<LoginBox>
				<TitleContainer>
					<Logo src={logoHeader} />
					<Title>로그인</Title>
				</TitleContainer>
				<InputContainer>
					<Input
						type="text"
						placeholder="아이디를 입력하세요"
						value={userID}
						onChange={e => setUserID(e.target.value)}
						onKeyDown={e => e.key === 'Enter' && handleLogin()}
						loginError={Boolean(signInError)}
					/>
					{signInError && <ErrorMessage>계정 또는 비밀번호를 다시 확인해주세요.</ErrorMessage>}
				</InputContainer>
				<InputContainer>
					<Input
						type={passwordVisible ? 'text' : 'password'}
						placeholder="비밀번호를 입력하세요"
						value={password}
						onChange={e => setPassword(e.target.value)}
						onKeyDown={e => e.key === 'Enter' && handleLogin()}
						loginError={Boolean(signInError)}
					/>
					<PasswordShowButton onClick={() => setPasswordVisible(!passwordVisible)}>
						<img src={passwordVisible ? passwordShow : passwordHide} />
					</PasswordShowButton>
				</InputContainer>
				<LoginOptions>
					<CheckboxLabel>
						<CheckboxInput
							type="checkbox"
							checked={rememberAccount}
							onChange={() => setRememberAccount(!rememberAccount)}
						/>
						로그인 유지
					</CheckboxLabel>
					<FindAccount onClick={() => navigate('/find')}>아이디/비밀번호</FindAccount>
				</LoginOptions>
				<LoginButton onClick={handleLogin} disabled={isLoading}>
					{isLoading ? '로그인 중...' : '로그인'}
				</LoginButton>
				<SNSTitle>SNS로 간편하게 로그인</SNSTitle>
				<SNSContainer>
					<SNSButton>
						<img src={logoGoogle} />
					</SNSButton>
					<SNSButton>
						<img src={logoKakao} />
					</SNSButton>
				</SNSContainer>
				<SignupButton onClick={() => navigate('/signup')}>회원가입</SignupButton>
			</LoginBox>
		</OuterContainer>
	);
};

export default Login;

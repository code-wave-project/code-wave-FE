// import * as S from '@/styles/pages/Error.style';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import errorLogo from '../assets/logos/logo_error.png';

const OuterContainer = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.COLOR.GRAY100};
`;

const ContentBox = styled.div`
	padding: 3rem;
	background: ${({ theme }) => theme.COLOR.WHITE};
	border-radius: 1rem;
	text-align: center;
`;

const Title = styled.h1`
	font-size: 1.5rem;
	font-weight: bold;
	color: ${({ theme }) => theme.COLOR.GRAY700};
`;

const Logo = styled.img`
	width: auto;
	height: 7rem;
	display: block;
	margin: 2rem auto;
`;

const Message = styled.p`
	font-size: 1rem;
	font-weight: bold;
	color: ${({ theme }) => theme.COLOR.BLUE500};
	margin-top: 2rem;
`;

const Description = styled.p`
	font-size: 1rem;
	color: ${({ theme }) => theme.COLOR.GRAY700};
	margin-top: 1rem;
	line-height: 1.5;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	gap: 10px;
	margin-top: 2rem;
`;

const Button = styled.button<{ outline?: boolean }>`
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

const ErrorPage = () => {
	const navigate = useNavigate();

	const goToHome = () => {
		navigate('/dashboard');
	};

	const goBack = () => {
		window.history.back();
	};

	return (
		<OuterContainer>
			<ContentBox>
				<Title>404 ERROR</Title>
				<Logo src={errorLogo} />
				<Message>죄송합니다. 페이지를 찾을 수 없습니다.</Message>
				<Description>
					존재하지 않는 주소를 입력하셨거나,
					<br />
					요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
				</Description>
				<ButtonContainer>
					<Button onClick={goToHome} outline>
						메인 화면으로
					</Button>
					<Button onClick={goBack}>이전 화면으로</Button>
				</ButtonContainer>
			</ContentBox>
		</OuterContainer>
	);
};

export default ErrorPage;

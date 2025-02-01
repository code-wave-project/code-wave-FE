import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logoHeader from '../assets/logos/logo_header.png';

interface TabsTriggerProps {
	active: boolean;
}

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

const RecoveryBox = styled.div`
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

const Input = styled.input<{ isEmpty: boolean }>`
	width: 100%;
	padding: 0.5rem;
	margin-bottom: 1.5rem;
	border-bottom: 1px solid ${({ theme, isEmpty }) => (isEmpty ? theme.COLOR.PINK500 : theme.COLOR.GRAY300)};
	font-size: 1rem;
`;

const Button = styled.button<{ state: boolean }>`
	width: 100%;
	height: 48px;
	background-color: ${({ state, theme }) => (state ? theme.COLOR.WHITE : theme.COLOR.BLUE500)};
	color: ${({ state, theme }) => (state ? theme.COLOR.BLUE500 : theme.COLOR.WHITE)};
	font-size: 1rem;
	font-weight: bold;
	margin-top: 1rem;
	border: 1px solid ${({ theme }) => theme.COLOR.BLUE500};
	border-radius: 0.5rem;
`;

const TabsContainer = styled.div`
	width: 100%;
`;

const TabsList = styled.div`
	display: flex;
	justify-content: space-between;
`;

const TabsTrigger = styled.button<TabsTriggerProps>`
	flex: 1;
	padding: 1rem;
	color: ${({ active, theme }) => (active ? theme.COLOR.BLUE500 : theme.COLOR.GRAY500)};
	cursor: pointer;
	border: none;
	text-align: center;
	font-size: 1rem;
	border-bottom: 2px solid ${({ active, theme }) => (active ? theme.COLOR.BLUE500 : 'transparent')};
`;

const Discription = styled.p`
	margin-top: 2rem;
	margin-bottom: 2rem;
	font-size: 1rem;
	color: ${({ theme }) => theme.COLOR.GRAY700};
`;

const ErrorMessage = styled.div`
	color: ${({ theme }) => theme.COLOR.PINK500};
	font-size: 0.7rem;
	text-align: left;
	margin-top: -0.5rem;
	margin-bottom: 1rem;
`;

const TextHighLight = styled.span`
	color: ${({ theme }) => theme.COLOR.BLUE500};
`;

const FindAccount = () => {
	const navigate = useNavigate();

	const [idInfo, setIdInfo] = useState({ name: '', email: '' });
	const [pwInfo, setPwInfo] = useState({ id: '', email: '' });
	const [activeTab, setActiveTab] = useState('find-id');
	const [findIDSuccess, setFindIDSuccess] = useState(false);
	const [findPWSuccess, setFindPWSuccess] = useState(false);

	const isFindIDValid = idInfo.name && idInfo.email;
	const isFindPWValid = pwInfo.id && pwInfo.email;
	const [isButtonClick, setButtonClick] = useState(false);

	const handleButtonClick = () => {
		switch (activeTab) {
			case 'find-id':
				if (isFindIDValid) {
					setFindIDSuccess(true);
				} else {
					setButtonClick(true);
				}
				break;
			case 'find-pw':
				if (isFindPWValid) {
					setFindPWSuccess(true);
				} else {
					setButtonClick(true);
				}
				break;
			default:
				setButtonClick(true);
				break;
		}
	};

	return (
		<OuterContainer>
			<TitleContainer>
				<Logo src={logoHeader} />
				<Title>계정찾기</Title>
			</TitleContainer>
			<RecoveryBox>
				{findIDSuccess ? (
					<div>
						해당 정보와 일치하는 아이디는
						<br />
						<TextHighLight>USER ID</TextHighLight> 입니다.
						<Button state={true} onClick={() => navigate('/login')}>
							로그인으로 이동
						</Button>
					</div>
				) : findPWSuccess ? (
					<div>
						<TextHighLight>USER01@GMAIL.COM</TextHighLight>
						<br />
						임시 비밀번호를 전송하였습니다.
						<Button state={true} onClick={() => navigate('/login')}>
							로그인으로 이동
						</Button>
					</div>
				) : (
					<TabsContainer>
						<TabsList>
							<TabsTrigger active={activeTab === 'find-id'} onClick={() => setActiveTab('find-id')}>
								아이디 찾기
							</TabsTrigger>
							<TabsTrigger active={activeTab === 'find-pw'} onClick={() => setActiveTab('find-pw')}>
								비밀번호 찾기
							</TabsTrigger>
						</TabsList>

						{activeTab === 'find-id' && (
							<div>
								<Discription>
									아이디를 잊어버리셨나요?
									<br />
									하단의 내용을 입력하여 아이디를 찾아보세요.
								</Discription>
								<TermsTitle>이름</TermsTitle>
								<Input
									placeholder="가입 시 사용한 이름을 입력하세요."
									value={idInfo.name}
									isEmpty={isButtonClick && !idInfo.name}
									onChange={e => setIdInfo({ ...idInfo, name: e.target.value })}
									onKeyDown={e => e.key === 'Enter' && handleButtonClick()}
								/>

								{isButtonClick && !idInfo.name && (
									<ErrorMessage>아이디 찾기를 위하여 가입 시 사용한 이름을 입력하세요.</ErrorMessage>
								)}

								<TermsTitle>이메일</TermsTitle>
								<Input
									placeholder="가입 시 사용한 이메일을 입력하세요."
									value={idInfo.email}
									isEmpty={isButtonClick && !idInfo.email}
									onChange={e => setIdInfo({ ...idInfo, email: e.target.value })}
									onKeyDown={e => e.key === 'Enter' && handleButtonClick()}
								/>

								{isButtonClick && !idInfo.email && (
									<ErrorMessage>아이디 찾기를 위하여 가입 시 사용한 이름을 입력하세요.</ErrorMessage>
								)}

								{isButtonClick && idInfo.email && !isFindIDValid && (
									<ErrorMessage>이메일 정보가 유효하지 않습니다.</ErrorMessage>
								)}

								<Button state={!isFindIDValid} onClick={handleButtonClick}>
									다음
								</Button>
							</div>
						)}

						{activeTab === 'find-pw' && (
							<div>
								<Discription>
									비밀번호를 잊어버리셨나요?
									<br />
									하단의 내용을 입력하여 비밀번호를 찾아보세요.
								</Discription>
								<TermsTitle>아이디</TermsTitle>
								<Input
									placeholder="가입 시 사용한 아이디를 입력하세요."
									value={pwInfo.id}
									isEmpty={isButtonClick && !pwInfo.id}
									onChange={e => setPwInfo({ ...pwInfo, id: e.target.value })}
									onKeyDown={e => e.key === 'Enter' && handleButtonClick()}
								/>

								{isButtonClick && !pwInfo.id && (
									<ErrorMessage>비밀번호 찾기를 위하여 가입 시 사용한 아이디를 입력하세요.</ErrorMessage>
								)}

								<TermsTitle>이메일</TermsTitle>
								<Input
									placeholder="가입 시 사용한 이메일을 입력하세요."
									value={pwInfo.email}
									isEmpty={isButtonClick && !pwInfo.email}
									onChange={e => setPwInfo({ ...pwInfo, email: e.target.value })}
									onKeyDown={e => e.key === 'Enter' && handleButtonClick()}
								/>

								{isButtonClick && !pwInfo.email && (
									<ErrorMessage>비밀번호 찾기를 위하여 가입 시 사용한 이메일을 입력하세요.</ErrorMessage>
								)}

								<Button state={!isFindPWValid} onClick={handleButtonClick}>
									다음
								</Button>
							</div>
						)}
					</TabsContainer>
				)}
			</RecoveryBox>
		</OuterContainer>
	);
};

export default FindAccount;

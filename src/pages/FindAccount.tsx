// import * as S from '@/styles/pages/FindAccount.style';

import { useState } from 'react';
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

const Input = styled.input`
	width: 100%;
	padding: 0.5rem;
	margin-bottom: 1.5rem;
	border-bottom: 1px solid ${({ theme }) => theme.COLOR.GRAY300};
	font-size: 1rem;
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

const FindAccount = () => {
	const [idInfo, setIdInfo] = useState({ name: '', email: '' });
	const [pwInfo, setPwInfo] = useState({ id: '', email: '' });
	const [activeTab, setActiveTab] = useState('find-id');
	const isFindIDValid = idInfo.name && idInfo.email;
	const isFindPWValid = pwInfo.id && pwInfo.email;

	const handleButtonClick = () => {
		alert('Click');
	};

	return (
		<OuterContainer>
			<TitleContainer>
				<Logo src={logoHeader} />
				<Title>계정찾기</Title>
			</TitleContainer>
			<RecoveryBox>
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
								onChange={e => setIdInfo({ ...idInfo, name: e.target.value })}
							/>
							<TermsTitle>이메일</TermsTitle>
							<Input
								placeholder="가입 시 사용한 이메일을 입력하세요."
								value={idInfo.email}
								onChange={e => setIdInfo({ ...idInfo, email: e.target.value })}
							/>
							<Button disabled={!isFindIDValid} onClick={handleButtonClick}>
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
								onChange={e => setPwInfo({ ...pwInfo, id: e.target.value })}
							/>
							<TermsTitle>이메일</TermsTitle>
							<Input
								placeholder="가입 시 사용한 이메일을 입력하세요."
								value={pwInfo.email}
								onChange={e => setPwInfo({ ...pwInfo, email: e.target.value })}
							/>
							<Button disabled={!isFindPWValid} onClick={handleButtonClick}>
								다음
							</Button>
						</div>
					)}
				</TabsContainer>
			</RecoveryBox>
		</OuterContainer>
	);
};

export default FindAccount;

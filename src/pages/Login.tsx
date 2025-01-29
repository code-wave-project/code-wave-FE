// import * as S from '@/styles/pages/Login.style';

import { useState } from 'react';
import styled from 'styled-components';

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
  background: ${({ theme }) => theme.COLOR.WHITE};;
  border-radius: 1rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.COLOR.GRAY700};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.COLOR.GRAY300};
  border-radius: 0.5rem;
  font-size: 1rem;
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
  margin-right: 10px;
`;

const FindAccount = styled.button`
  color: ${({ theme }) => theme.COLOR.BLUE500};
  font-size: 1rem;
  cursor: pointer;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 48px;
  background-color: ${({ theme }) => theme.COLOR.BLUE500};
  color: ${({ theme }) => theme.COLOR.WHITE};;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const SNSTitle = styled.div`
  font-size: 1rem;
  color: #7F8295;
  margin-top: 2rem;
`;

const SNSContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const SNSButton = styled.button`
  background: none;
  border: none;
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

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <OuterContainer>
      <LoginBox>
        <Title>로그인</Title>
        <Input type="text" placeholder="아이디를 입력하세요" />
        <Input type="password" placeholder="비밀번호를 입력하세요" />
        <LoginOptions>
            <CheckboxLabel>
              <CheckboxInput
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              로그인 유지
            </CheckboxLabel>
            <FindAccount>아이디/비밀번호 찾기</FindAccount>
        </LoginOptions>
        <LoginButton>로그인</LoginButton>
        <SNSTitle>SNS로 간편하게 로그인</SNSTitle>
        <SNSContainer>
          <SNSButton>🔵</SNSButton> {/* Google */}
          <SNSButton>⚫</SNSButton> {/* Kakao */}
        </SNSContainer>
        <SignupButton>회원가입</SignupButton>
      </LoginBox>
    </OuterContainer>
  );
};

export default Login;
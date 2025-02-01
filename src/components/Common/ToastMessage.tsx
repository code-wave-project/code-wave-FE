import * as S from '@components/Common/ToastMessage.style';

import Logo from '@assets/logos/logo_dashboard.png';

interface ToastProps {
	text: string;
}

function ToastMessage({ text }: ToastProps) {
	return (
		<>
			<S.Space>
				<S.ToastContainer>
					<S.Logo src={Logo} alt="토스트 메시지" />
					{text}
				</S.ToastContainer>
			</S.Space>
		</>
	);
}
export default ToastMessage;

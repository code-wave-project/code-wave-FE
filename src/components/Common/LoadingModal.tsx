import { useState, useEffect } from 'react';
import * as S from '@components/Common/LoadingModal.style';

import Logo from '@assets/logos/logo_dashboard.png';

interface LoadingModalProps {
	text: string;
}

const LoadingModal = ({ text }: LoadingModalProps) => {
	const [dots, setDots] = useState('.');

	useEffect(() => {
		const interval = setInterval(() => {
			setDots(prev => (prev.length < 3 ? prev + '.' : '.'));
		}, 500);

		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<S.ModalBackground />
			<S.ModalSpace>
				<S.ModalWrap>
					<S.ModalContent>
						<S.Logo src={Logo} alt="로딩중" />
						<S.Text>
							{text} {dots}
						</S.Text>
					</S.ModalContent>
				</S.ModalWrap>
			</S.ModalSpace>
		</>
	);
};

export default LoadingModal;

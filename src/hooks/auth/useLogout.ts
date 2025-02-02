import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '@/lib/axios';

export const useLogout = () => {
	const navigate = useNavigate();

	const logoutMutation = useMutation({
		mutationFn: async () => {
			// 서버에 로그아웃 요청을 보내고 싶다면 아래 주석을 해제
			// await axiosInstance.post('/auth/logout');

			// 로컬 스토리지에서 토큰 제거
			localStorage.removeItem('accessToken');

			// axios 인스턴스의 Authorization 헤더 제거
			delete axiosInstance.defaults.headers.common['Authorization'];
		},
		onSuccess: () => {
			// 로그아웃 후 로그인 페이지로 리다이렉션
			navigate('/login');
		},
		onError: error => {
			console.error('Logout error:', error);
		},
	});

	return {
		logout: logoutMutation.mutate,
		isLoading: logoutMutation.isPending,
		error: logoutMutation.error,
		isError: logoutMutation.isError,
	};
};

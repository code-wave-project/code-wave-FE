import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '@/lib/axios';
import { ApiResponse } from '@/types/api';

interface SignInCredentials {
	email: string;
	password: string;
}

interface SignInData {
	accessToken: string;
	tokenType: string;
	role: 'USER';
}

export const useSignIn = () => {
	const navigate = useNavigate();

	const signInMutation = useMutation<ApiResponse<SignInData>, ApiResponse<null>, SignInCredentials>({
		mutationFn: async credentials => {
			const response = await axiosInstance.post<ApiResponse<SignInData>>('/user/sign-in', credentials);
			return response.data;
		},
		onSuccess: response => {
			if (response.success === 'SUCCESS' && response.data) {
				// 토큰을 로컬 스토리지에 저장
				localStorage.setItem('accessToken', response.data.accessToken);

				// axios 인스턴스의 기본 헤더에 토큰 설정
				axiosInstance.defaults.headers.common['Authorization'] =
					`${response.data.tokenType} ${response.data.accessToken}`;

				// 로그인 성공 시 대쉬보드 페이지로 이동
				navigate('/dashboard');
				// 빠른 테스트를 위해 에디터 페이지로 이동
			}
		},
		onError: error => {
			console.error('Login error:', error);
		},
	});

	return {
		signIn: signInMutation.mutate,
		isLoading: signInMutation.isPending,
		error: signInMutation.error,
		isError: signInMutation.isError,
		isSuccess: signInMutation.isSuccess,
	};
};

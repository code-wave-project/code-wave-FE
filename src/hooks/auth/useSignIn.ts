import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '@/lib/axios';

interface SignInCredentials {
	email: string;
	password: string;
}

interface SignInResponse {
	accessToken: string;
	user: {
		id: string;
		email: string;
		name: string;
	};
}

interface SignInError {
	message: string;
	status: number;
}

export const useSignIn = () => {
	const navigate = useNavigate();

	const signInMutation = useMutation<SignInResponse, SignInError, SignInCredentials>({
		mutationFn: async credentials => {
			const response = await axiosInstance.post<SignInResponse>('/auth/login', credentials);
			return response.data;
		},
		onSuccess: data => {
			// 토큰을 로컬 스토리지 또는 다른 저장소에 저장
			localStorage.setItem('accessToken', data.accessToken);

			// axios 인스턴스의 기본 헤더에 토큰 설정
			axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;

			// 로그인 성공 시 메인 페이지로 이동
			navigate('/');
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

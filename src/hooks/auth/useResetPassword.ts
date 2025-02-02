import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '@/lib/axios';
import { ApiResponse } from '@/types/api';

interface ResetPasswordCredentials {
	email: string;
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}

interface ResetPasswordData {
	message: string;
}

export const useResetPassword = () => {
	const navigate = useNavigate();

	const resetPasswordMutation = useMutation<
		ApiResponse<ResetPasswordData>,
		ApiResponse<null>,
		ResetPasswordCredentials
	>({
		mutationFn: async credentials => {
			// 새 비밀번호와 확인 비밀번호가 일치하는지 확인
			if (credentials.newPassword !== credentials.confirmPassword) {
				throw new Error('새 비밀번호가 일치하지 않습니다.');
			}

			const response = await axiosInstance.post<ApiResponse<ResetPasswordData>>('/user/reset-password', {
				email: credentials.email,
				currentPassword: credentials.currentPassword,
				newPassword: credentials.newPassword,
			});
			return response.data;
		},
		onSuccess: response => {
			if (response.success === 'SUCCESS') {
				// 비밀번호 재설정 성공 후 로그인 페이지로 이동
				navigate('/login');
			}
		},
		onError: error => {
			console.error('Password reset error:', error);
		},
	});

	return {
		resetPassword: resetPasswordMutation.mutate,
		isLoading: resetPasswordMutation.isPending,
		error: resetPasswordMutation.error,
		isError: resetPasswordMutation.isError,
		isSuccess: resetPasswordMutation.isSuccess,
	};
};

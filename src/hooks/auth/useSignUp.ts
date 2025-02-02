import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios';
import { ApiResponse } from '@/types/api';

interface SignUpCredentials {
	email: string;
	password: string;
	name: string;
}

interface SignUpData {
	message: string;
	userId: string;
}

export const useSignUp = () => {
	const signUpMutation = useMutation<ApiResponse<SignUpData>, ApiResponse<null>, SignUpCredentials>({
		mutationFn: async credentials => {
			const response = await axiosInstance.post<ApiResponse<SignUpData>>('/user/sign-up', credentials);
			return response.data;
		},
		onSuccess: response => {
			console.log(response);
		},
		onError: error => {
			console.error('Sign up error:', error);
		},
	});

	return {
		signUp: signUpMutation.mutate,
		isLoading: signUpMutation.isPending,
		error: signUpMutation.error,
		isError: signUpMutation.isError,
		isSuccess: signUpMutation.isSuccess,
	};
};

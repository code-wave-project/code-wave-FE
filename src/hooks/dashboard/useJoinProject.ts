import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios';

interface JoinProjectResponse {
	success: string;
	message: string;
	data: {
		message: string;
	};
}

interface JoinProjectError {
	error: {
		errorCode: string;
		message: string;
		errors: string[];
	};
}

export const useJoinProject = () => {
	const mutation = useMutation<JoinProjectResponse, JoinProjectError, string>({
		mutationFn: async inviteCode => {
			const response = await axiosInstance.post<JoinProjectResponse>(`/project/join/${inviteCode}`);
			return response.data;
		},
		onError: error => {
			console.error('프로젝트 참여 실패:', error.error?.message || '알 수 없는 오류 발생');
		},
	});

	return {
		joinProject: mutation.mutate,
		isLoading: mutation.isPending,
		isSuccess: mutation.isSuccess,
		isError: mutation.isError,
		error: mutation.error,
	};
};

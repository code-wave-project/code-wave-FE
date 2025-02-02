import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios';

interface DeleteProjectResponse {
	success: string;
	message: string;
	data: {
		message: string;
	};
}

interface DeleteProjectError {
	error: {
		errorCode: string;
		message: string;
		errors: string[];
	};
}

export const useDeleteProject = () => {
	const mutation = useMutation<DeleteProjectResponse, DeleteProjectError, number>({
		mutationFn: async projectId => {
			const response = await axiosInstance.delete<DeleteProjectResponse>(`/project/${projectId}`);
			return response.data;
		},
		onError: error => {
			console.error('프로젝트 삭제 실패:', error.error?.message || '알 수 없는 오류 발생');
		},
	});

	return {
		deleteProject: mutation.mutate,
		isLoading: mutation.isPending,
		isSuccess: mutation.isSuccess,
		isError: mutation.isError,
		error: mutation.error,
	};
};

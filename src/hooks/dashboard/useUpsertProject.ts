import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios';

interface UpsertProjectRequest {
	projectId?: number;
	projectName: string;
	projectDescription: string;
}

interface UpsertProjectResponse {
	success: string;
	message: string;
	data: {
		message: string;
	};
}

interface UpsertProjectError {
	error: {
		errorCode: string;
		message: string;
		errors: string[];
	};
}

export const useUpsertProject = () => {
	const mutation = useMutation<UpsertProjectResponse, UpsertProjectError, UpsertProjectRequest>({
		mutationFn: async ({ projectId, ...projectData }) => {
			if (projectId) {
				// 수정 (PATCH)
				const response = await axiosInstance.patch<UpsertProjectResponse>(`/project/${projectId}`, projectData);
				return response.data;
			} else {
				// 생성 (POST)
				const response = await axiosInstance.post<UpsertProjectResponse>('/project', projectData);
				return response.data;
			}
		},
		onError: error => {
			console.error('프로젝트 생성 실패:', error.error?.message || '알 수 없는 오류 발생');
		},
	});

	return {
		upsertProject: mutation.mutate,
		isLoading: mutation.isPending,
		isSuccess: mutation.isSuccess,
		isError: mutation.isError,
		error: mutation.error,
	};
};

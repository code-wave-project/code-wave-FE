import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios';

interface Project {
	createdAt: string;
	updatedAt: string;
	status: string;
	id: number;
	title: string;
	description: string;
	inviteCode: string;
	initiator: string;
}

interface ProjectsResponse {
	success: string;
	message: string;
	data: {
		projects: Project[];
	};
	error: null;
}

interface ProjectsError {
	error: {
		errorCode: string;
		message: string;
		errors: string[];
	};
}

export const useCheckProjects = () => {
	const checkProjectsMutation = useMutation<ProjectsResponse, ProjectsError>({
		mutationFn: async () => {
			const response = await axiosInstance.get<ProjectsResponse>('/project/all');
			return response.data;
		},
		onError: error => {
			console.error('Error fetching projects:', error);
		},
	});

	return {
		checkProjects: checkProjectsMutation.mutate,
		data: checkProjectsMutation.data,
		isLoading: checkProjectsMutation.isPending,
		error: checkProjectsMutation.error,
		isError: checkProjectsMutation.isError,
		isSuccess: checkProjectsMutation.isSuccess,
	};
};

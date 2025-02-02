export interface ApiResponse<T> {
	success: 'SUCCESS' | 'FAIL';
	message: string;
	data: T | null;
	error?: {
		errorCode: string;
		message: string;
		errors: string[];
	};
}

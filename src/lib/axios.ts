import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
	config => {
		const token = localStorage.getItem('accessToken');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	},
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
	response => response,
	async error => {
		// 401 에러 발생 시 로그아웃 처리
		if (error.response?.status === 401) {
			localStorage.removeItem('accessToken');
			window.location.href = '/login';
		}
		return Promise.reject(error);
	},
);

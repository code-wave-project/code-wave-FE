// import * as S from '@/styles/pages/SignUp.style';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

function SignUp() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData(prev => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		// 비밀번호 확인
		if (formData.password !== formData.confirmPassword) {
			setError('비밀번호가 일치하지 않습니다.');
			setLoading(false);
			return;
		}

		try {
			const { data, error } = await supabase.auth.signUp({
				email: formData.email,
				password: formData.password,
			});

			if (error) throw error;

			if (data) {
				// 이메일 확인 메일이 발송되었음을 알림
				alert('가입 확인 이메일이 발송되었습니다. 이메일을 확인해주세요.');
				navigate('/login');
			}
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError('회원가입 중 오류가 발생했습니다.');
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50">
			<div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
				<h2 className="mb-6 text-center text-3xl font-bold">회원가입</h2>
				{error && <div className="mb-4 rounded-md bg-red-50 p-4 text-red-500">{error}</div>}
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
							이메일
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
							className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
							비밀번호
						</label>
						<input
							type="password"
							id="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
							className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
						/>
					</div>
					<div className="mb-6">
						<label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-700">
							비밀번호 확인
						</label>
						<input
							type="password"
							id="confirmPassword"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleChange}
							required
							className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
						/>
					</div>
					<button
						type="submit"
						disabled={loading}
						className="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600 disabled:bg-blue-300">
						{loading ? '처리중...' : '회원가입'}
					</button>
				</form>
			</div>
		</div>
	);
}

export default SignUp;

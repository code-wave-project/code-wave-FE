import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
// import * as S from '@/styles/pages/Login.style';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (error) throw error;

			if (data.user) {
				navigate('/editor'); // 로그인 성공 시 메인 페이지로 이동
			}
		} catch (error) {
			setError(error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="login-container">
			<h1>로그인</h1>
			{error && <div className="error-message">{error}</div>}
			<form onSubmit={handleLogin}>
				<div>
					<label htmlFor="email">이메일</label>
					<input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
				</div>
				<div>
					<label htmlFor="password">비밀번호</label>
					<input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
				</div>
				<button type="submit" disabled={loading}>
					{loading ? '로그인 중...' : '로그인'}
				</button>
			</form>
		</div>
	);
}

export default Login;

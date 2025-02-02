import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

interface SignUpCredentials {
	email: string;
	password: string;
	name: string;
}

export const useSupabaseSignUp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const navigate = useNavigate();

	const signUp = async ({ email, password, name }: SignUpCredentials) => {
		try {
			setIsLoading(true);
			setError(null);

			// 1. 회원가입
			const { data: authData, error: authError } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: {
						name,
					},
				},
			});

			if (authError) throw authError;

			// 2. 사용자 프로필 생성
			if (authData.user) {
				const { error: profileError } = await supabase.from('profiles').insert([
					{
						id: authData.user.id,
						name,
						email,
					},
				]);

				if (profileError) throw profileError;
			}

			// 3. 회원가입 성공 후 처리
			navigate('/login');
			alert('회원가입이 완료되었습니다. 이메일을 확인해주세요.');
		} catch (err) {
			setError(err instanceof Error ? err : new Error('An error occurred'));
		} finally {
			setIsLoading(false);
		}
	};

	return { signUp, isLoading, error };
};

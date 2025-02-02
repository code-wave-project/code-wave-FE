import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

interface SignInCredentials {
	email: string;
	password: string;
}

export const useSupabaseSignIn = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const navigate = useNavigate();

	const signIn = async ({ email, password }: SignInCredentials) => {
		try {
			setIsLoading(true);
			setError(null);

			const { data, error: signInError } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (signInError) throw signInError;

			// 로그인 성공 시 메인 페이지로 이동
			navigate('/');
		} catch (err) {
			setError(err instanceof Error ? err : new Error('로그인에 실패했습니다.'));
		} finally {
			setIsLoading(false);
		}
	};

	return { signIn, isLoading, error };
};

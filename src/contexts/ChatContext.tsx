import React, { createContext, useContext, useState, useEffect } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface Message {
	id: string;
	content: string;
	user_id: string;
	created_at: string;
}

interface ChatContextType {
	messages: Message[];
	sendMessage: (content: string) => Promise<void>;
	isLoading: boolean;
	error: string | null;
}

interface ChatProviderProps {
	children: React.ReactNode;
	projectId: string;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<ChatProviderProps> = ({ children, projectId }) => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [_, setChannel] = useState<RealtimeChannel | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// 초기 메시지 로드
	useEffect(() => {
		const loadMessages = async () => {
			try {
				const { data, error } = await supabase
					.from('messages')
					.select('*')
					.eq('project_id', 'f97505b9-fde8-4ed6-86cd-c5b316a4625d')
					.order('created_at', { ascending: true });

				if (error) throw error;
				setMessages(data || []);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to load messages');
			} finally {
				setIsLoading(false);
			}
		};

		loadMessages();
	}, [projectId]);

	// 실시간 구독 설정
	useEffect(() => {
		const channel = supabase
			.channel(`project:f97505b9-fde8-4ed6-86cd-c5b316a4625d`)
			.on(
				'postgres_changes',
				{
					event: 'INSERT',
					schema: 'public',
					table: 'messages',
					filter: `project_id=eq.f97505b9-fde8-4ed6-86cd-c5b316a4625d`,
				},
				payload => {
					setMessages(prev => [...prev, payload.new as Message]);
				},
			)
			.subscribe();

		setChannel(channel);

		return () => {
			channel.unsubscribe();
		};
	}, [projectId]);

	// 메시지 전송
	const sendMessage = async (content: string) => {
		try {
			const { data: user } = await supabase.auth.getUser();
			if (!user.user) throw new Error('Not authenticated');

			const { error } = await supabase.from('messages').insert([
				{
					content,
					project_id: 'f97505b9-fde8-4ed6-86cd-c5b316a4625d',
					user_id: user.user.id,
				},
			]);

			if (error) throw error;
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to send message');
			throw err;
		}
	};

	const value = {
		messages,
		sendMessage,
		isLoading,
		error,
	};

	return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
	const context = useContext(ChatContext);
	if (context === undefined) {
		throw new Error('useChat must be used within a ChatProvider');
	}
	return context;
};

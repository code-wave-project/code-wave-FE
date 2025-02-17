import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ScrollToTop from '@components/Common/ScrollToTop';
import { PrivateRoute } from '@/pages/PrivateRoute';
import IDE from '@pages/IDE';
import Login from '@pages/Login';
import SignUp from '@pages/SignUp';
import FindAccount from '@pages/FindAccount';
import ResetPassword from '@pages/ResetPassword';
import Dashboard from '@pages/Dashboard';
import Profile from '@pages/Profile';
import ErrorServer from '@pages/ErrorServer';
import ErrorNon from '@pages/ErrorNon';
import '@/App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			refetchOnWindowFocus: false,
		},
	},
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<DndProvider backend={HTML5Backend}>
				<Router>
					<ScrollToTop />
					<Routes>
						<Route path="/" element={<Navigate to="/login" replace />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/find" element={<FindAccount />} />
						<Route path="/reset" element={<ResetPassword />} />
						{/* 비로그인 유저 URL 접근 제한 */}
						<Route element={<PrivateRoute />}>
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/editor/:id" element={<IDE />} />
							<Route path="/profile" element={<Profile />} />
						</Route>
						<Route path="/error" element={<ErrorServer />} />
						<Route path="/*" element={<ErrorNon />} />
					</Routes>
				</Router>
			</DndProvider>
		</QueryClientProvider>
	);
}

export default App;

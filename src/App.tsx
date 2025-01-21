import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ScrollToTop from '@components/Common/ScrollToTop';
// import { PrivateRoute } from '@/pages/PrivateRoute'; API 연동 전까지 주석 처리
import IDE from '@pages/IDE';
import Login from '@pages/Login';
import SignUp from '@pages/SignUp';
import FindAccount from '@pages/FindAccount';
import ResetPassword from '@pages/ResetPassword';
import Dashboard from '@pages/Dashboard';
import ErrorServer from '@pages/ErrorServer';
import ErrorNon from '@pages/ErrorNon';
import '@/App.css';

function App() {
	return (
		<DndProvider backend={HTML5Backend}>
			<Router>
				<ScrollToTop />
				<Routes>
					<Route path="/" element={<Navigate to="/login" replace />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/find" element={<FindAccount />} />
					<Route path="/reset" element={<ResetPassword />} />
					{/* 비로그인 유저 URL 접근 제한 - API 연동 전까지 주석 처리 */}
					{/* <Route element={<PrivateRoute />}> */}
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/editor" element={<IDE />} />
					{/* </Route> */}
					<Route path="/error" element={<ErrorServer />} />
					<Route path="/*" element={<ErrorNon />} />
				</Routes>
			</Router>
		</DndProvider>
	);
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import IDE from './pages/IDE';
import './App.css';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/editor" element={<IDE />} />
				<Route path="/" element={<Navigate to="/editor" replace />} />
				<Route path="*" element={<Navigate to="/editor" replace />} />
			</Routes>
		</Router>
	);
}

export default App;

import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@styles/GlobalStyles';
import theme from '@styles/theme';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<GlobalStyle />
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</StrictMode>,
);

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: [
			{ find: '@', replacement: '/src' },
			{ find: '@components', replacement: '/src/components' },
			{ find: '@pages', replacement: '/src/pages' },
			{ find: '@assets', replacement: '/src/assets' },
			{ find: '@const', replacement: '/src/const' },
			{ find: '@store', replacement: '/src/store' },
			{ find: '@styles', replacement: '/src/styles' },
			{ find: '@types', replacement: '/src/types' },
			{ find: '@utils', replacement: '/src/utils' },
		],
	},
	server: {
		port: 3000,
	},
});

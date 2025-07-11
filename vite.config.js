// vite.config.js (simplified)
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	resolve: {
		alias: {
			'@assets': resolve(__dirname, './src/assets'),
			'@src': resolve(__dirname, './src')
		}
	}
})

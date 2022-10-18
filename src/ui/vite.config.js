import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import viteCompression from 'vite-plugin-compression';
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), viteCompression(), svgLoader()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:1234/',
                changeOrigin: true,
                secure: false
            }
        }
    }
})
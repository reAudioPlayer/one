/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";
import viteCompression from "vite-plugin-compression";
import svgLoader from "vite-svg-loader";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), viteCompression(), svgLoader(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'reAudioPlayer One',
                short_name: 'reAP One',
                icons: [{
                    src: '/favicon.png',
                    sizes: '500x500',
                }],
                start_url: '/',
                display: "standalone",
                description: "reAudioPlayer One is a free, open-source, and cross-platform audio player.",
            },
            workbox: {
                navigateFallbackDenylist: [/^\/api/]
            }
        })],
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
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 멀티 페이지: 메인 포트폴리오(/) + 논문 프로젝트 페이지(/dgunet/)
// https://vite.dev/guide/build#multi-page-app
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        dgunet: fileURLToPath(new URL('./dgunet/index.html', import.meta.url)),
      },
    },
  },
})

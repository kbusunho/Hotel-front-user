import { defineConfig, loadEnv } from 'vite' /* ✅ loadEnv 추가 */
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // ✅ .env 파일이나 시스템 환경변수를 불러옴
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      port: 5173,
      strictPort: true,
      host: true,

      proxy: {
        '/api': {
          /* ✅ 우선순위:
             1. 환경변수 (VITE_API_URL)
             2. 도커 내부 통신용 (http://backend:3000) -> 이게 핵심!
             3. 로컬 테스트용 (http://localhost:3000)
          */
          target: env.VITE_API_URL || 'http://backend:3000',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
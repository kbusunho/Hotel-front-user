import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // ▼▼▼ 이 부분이 추가되었습니다 ▼▼▼
    port: 5173,       // 5173 포트를 강제로 사용
    strictPort: true, // 이미 사용 중이면 5174로 넘어가지 않고 에러를 띄움
    // ▲▲▲ 여기까지 ▲▲▲
    
    proxy: {
      '/api': {
        target: 'http://172.22.48.1:3000', // 백엔드 주소
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
import axios from 'axios';

// ▼▼▼ [수정됨] 도메인을 지우고 '/api'만 남겼습니다.
// 이렇게 해야 Vite Proxy가 작동해서 친구 컴퓨터로 연결해줍니다.
const BASE_URL = '/api';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ✅ 요청 보낼 때마다 토큰이 있다면 자동으로 헤더에 끼워넣기
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
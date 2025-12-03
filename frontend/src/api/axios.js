import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // ✅ 쿠키 전송을 위해 추가됨
    timeout: 10000,        // ✅ 10초 대기 시간 설정 추가됨
});

// ✅ 요청 보낼 때마다 토큰이 있다면 자동으로 헤더에 끼워넣기 (기존 코드 유지)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;

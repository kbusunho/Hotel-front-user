import axios from 'axios';

// 환경변수(VITE_API_URL or VITE_API_BASE_URL)를 우선 사용하고,
// 값이 http://localhost:3000 처럼 /api 없이 들어오면 자동으로 /api를 붙입니다.
const resolveBaseUrl = () => {
    const envUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL;
    if (!envUrl) return '/api';
    const trimmed = envUrl.replace(/\/$/, '');
    return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
};

const BASE_URL = resolveBaseUrl();

const api = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    timeout: 10000,
});

// 요청마다 토큰 자동 첨부
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;

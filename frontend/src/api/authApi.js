import api from './axios';

export const authApi = {
    // 1. 회원가입(POST /api/auth/register)
    register: async (userData) => {
        const response = await api.post('/api/auth/register', userData);
        return response.data?.data; // unwrap successResponse.data
    },

    // 2. 로그인(POST /api/auth/login)
    login: async (credentials) => {
        const response = await api.post('/api/auth/login', credentials);
        return response.data?.data; // unwrap successResponse.data
    },

    // 3. 내 정보 가져오기(GET /api/auth/me)
    getMe: async () => {
        const response = await api.get('/api/auth/me');
        return response.data?.data; // unwrap successResponse.data
    },

    // 4. 프로필 업데이트(PATCH /api/auth/profile)
    updateProfile: async (profileData) => {
        const response = await api.patch('/api/auth/profile', profileData);
        return response.data?.data; // unwrap successResponse.data
    }
};

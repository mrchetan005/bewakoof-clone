
import axios from "axios";

const api = axios.create({
    baseURL: 'https://academics.newtonschool.co/api/v1',
    headers: {
        projectId: import.meta.env.VITE_PROJECT_ID,
    },
});

api.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('auth_token_bewkoof');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;


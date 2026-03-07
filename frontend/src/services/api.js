import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || (typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}/api/` : 'http://localhost:8000/api/');
const api = axios.create({
    baseURL: BASE_URL,
});

export const getMediaUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;

    // Normalize root URL (remove /api/)
    // If BASE_URL is relative, use window.location.origin
    const rootUrl = BASE_URL.includes('://')
        ? BASE_URL.replace(/\/api\/?$/, '')
        : (typeof window !== 'undefined' ? window.location.origin : '');

    // Ensure path has /media/ prefix if it's a relative Django path
    let fullPath = path;
    if (!path.startsWith('/media/') && !path.startsWith('media/')) {
        fullPath = `/media/${path.startsWith('/') ? path.slice(1) : path}`;
    } else if (path.startsWith('media/')) {
        fullPath = `/${path}`;
    }

    return `${rootUrl}${fullPath}`;
};

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const numerologyApi = {
    calculate: (data) => api.post('calculate/', data),
    getProfile: () => api.get('profile/'),
    getBlogs: () => api.get('blogs/'),
    getBlogDetail: (id) => api.get(`blogs/${id}/`),
    getVideos: () => api.get('videos/'),
    getAbout: () => api.get('about/'),
    submitAppointment: (data) => api.post('appointments/', data),
};

export const adminApi = {
    login: (credentials) => api.post('token/', credentials),
    getAppointments: () => api.get('appointments/'),
    updateAppointment: (id, data) => api.patch(`appointments/${id}/`, data),
    deleteAppointment: (id) => api.delete(`appointments/${id}/`),
    manageBlog: {
        create: (data) => api.post('blogs/', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
        update: (id, data) => api.patch(`blogs/${id}/`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
        delete: (id) => api.delete(`blogs/${id}/`),
    },
    updateProfile: (id, data) => api.patch(`profile/${id}/`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
    manageVideo: {
        create: (data) => api.post('videos/', data),
        delete: (id) => api.delete(`videos/${id}/`),
    },
};

export default api;

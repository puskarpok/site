import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/',
});

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

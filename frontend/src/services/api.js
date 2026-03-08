import axios from 'axios';

const getBaseUrl = () => {
    // Priority 1: Environment variable (Set this in Netlify to your Render API URL)
    let envUrl = import.meta.env.VITE_API_BASE_URL;

    // Priority 2: Detection logic
    const isLocalhost = typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

    // If we're on a live site but the env variable is hardcoded to localhost, ignore it
    if (!isLocalhost && envUrl && (envUrl.includes('localhost') || envUrl.includes('127.0.0.1'))) {
        console.warn("⚠️ Production detected but API URL is set to localhost. Using relative path.");
        return "/api/";
    }

    const finalUrl = envUrl || (typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}/api/` : 'http://localhost:8000/api/');
    return finalUrl;
};

const BASE_URL = getBaseUrl();
console.log("%c🚀 Numerology API Terminal", "color: #d4af37; font-weight: bold; font-size: 12px;");
console.log("📍 Connected to:", BASE_URL);
if (BASE_URL.includes('localhost')) {
    console.log("⚠️ WARNING: You are in LOCAL mode. Data saved here will ONLY stay on this computer.");
} else {
    console.log("✅ SUCCESS: You are in LIVE mode. Data saved here will be visible on ALL devices.");
}

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

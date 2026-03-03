import React, { useEffect, useState } from 'react';
import api, { adminApi, numerologyApi } from '../../services/api';
import { Users, CheckCircle, Trash2, LogOut, Search, Filter, BookOpen, Plus, Edit2, X, Image as ImageIcon, User, Play } from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('appointments');
    const [appointments, setAppointments] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [videos, setVideos] = useState([]);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    // Video Modal State
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [videoFormData, setVideoFormData] = useState({ title: '', url: '' });
    const [videoFormLoading, setVideoFormLoading] = useState(false);

    // Blog Modal State
    const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [blogFormData, setBlogFormData] = useState({ title: '', content: '', category: '', image: null });
    const [blogFormLoading, setBlogFormLoading] = useState(false);

    // Profile Form State
    const [profileFormData, setProfileFormData] = useState({
        name: '',
        bio: '',
        experience: '',
        services: '',
        past_works: '',
        achievements: '',
        photo: null
    });
    const [profileLoading, setProfileLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'appointments') {
                const response = await adminApi.getAppointments();
                setAppointments(response.data);
            } else if (activeTab === 'blogs') {
                const response = await numerologyApi.getBlogs();
                setBlogs(response.data);
            } else if (activeTab === 'videos') {
                const response = await numerologyApi.getVideos();
                setVideos(response.data);
            } else if (activeTab === 'profile') {
                const response = await numerologyApi.getProfile();
                if (response.data.length > 0) {
                    const p = response.data[0];
                    setProfile(p);
                    setProfileFormData({
                        name: p.name,
                        bio: p.bio,
                        experience: p.experience,
                        services: p.services,
                        past_works: p.past_works,
                        achievements: p.achievements,
                        photo: null
                    });
                }
            }
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    // Appointment Actions
    const handleMarkContacted = async (id) => {
        try {
            await adminApi.updateAppointment(id, { status: 'Contacted' });
            setAppointments(appointments.map(app => app.id === id ? { ...app, status: 'Contacted' } : app));
        } catch (error) {
            alert("Update failed");
        }
    };

    const handleDeleteAppointment = async (id) => {
        if (!window.confirm("Delete this appointment?")) return;
        try {
            await adminApi.deleteAppointment(id);
            setAppointments(appointments.filter(app => app.id !== id));
        } catch (error) {
            alert("Delete failed");
        }
    };

    // Blog Actions
    const handleOpenBlogModal = (blog = null) => {
        if (blog) {
            setEditingBlog(blog);
            setBlogFormData({ title: blog.title, content: blog.content, category: blog.category, image: null });
        } else {
            setEditingBlog(null);
            setBlogFormData({ title: '', content: '', category: '', image: null });
        }
        setIsBlogModalOpen(true);
    };

    const handleBlogSubmit = async (e) => {
        e.preventDefault();
        setBlogFormLoading(true);

        const formData = new FormData();
        formData.append('title', blogFormData.title);
        formData.append('content', blogFormData.content);
        formData.append('category', blogFormData.category);
        if (blogFormData.image) {
            formData.append('image', blogFormData.image);
        }

        try {
            if (editingBlog) {
                await adminApi.manageBlog.update(editingBlog.id, formData);
            } else {
                await adminApi.manageBlog.create(formData);
            }
            setIsBlogModalOpen(false);
            fetchData(); // Refresh list
        } catch (error) {
            console.error("Blog action failed", error);
            alert("Error saving blog post");
        } finally {
            setBlogFormLoading(false);
        }
    };

    const handleDeleteBlog = async (id) => {
        if (!window.confirm("Delete this blog post?")) return;
        try {
            await adminApi.manageBlog.delete(id);
            setBlogs(blogs.filter(b => b.id !== id));
        } catch (error) {
            alert("Delete failed");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        window.location.href = '/admin/login';
    };

    // Video Actions
    const extractVideoId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const handleVideoSubmit = async (e) => {
        e.preventDefault();
        const videoId = extractVideoId(videoFormData.url);
        if (!videoId) {
            alert("Invalid YouTube URL");
            return;
        }

        setVideoFormLoading(true);
        const data = {
            title: videoFormData.title,
            video_id: videoId,
            thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
        };

        try {
            await adminApi.manageVideo.create(data);
            setIsVideoModalOpen(false);
            setVideoFormData({ title: '', url: '' });
            fetchData();
        } catch (error) {
            alert("Failed to add video");
        } finally {
            setVideoFormLoading(false);
        }
    };

    const handleDeleteVideo = async (id) => {
        if (!window.confirm("Delete this video?")) return;
        try {
            await adminApi.manageVideo.delete(id);
            setVideos(videos.filter(v => v.id !== id));
        } catch (error) {
            alert("Delete failed");
        }
    };

    // Profile Actions
    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setProfileLoading(true);

        const formData = new FormData();
        formData.append('name', profileFormData.name);
        formData.append('bio', profileFormData.bio);
        formData.append('experience', profileFormData.experience);
        formData.append('services', profileFormData.services);
        formData.append('past_works', profileFormData.past_works);
        formData.append('achievements', profileFormData.achievements);
        if (profileFormData.photo) {
            formData.append('photo', profileFormData.photo);
        }

        try {
            if (profile) {
                await adminApi.updateProfile(profile.id, formData);
            } else {
                // If no profile exists, create one (Post to profile endpoint)
                await api.post('profile/', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            }
            alert("Profile updated successfully!");
            fetchData();
        } catch (error) {
            console.error("Profile update failed", error);
            alert("Error updating profile");
        } finally {
            setProfileLoading(false);
        }
    };

    const filteredItems = (activeTab === 'appointments' ? appointments : activeTab === 'blogs' ? blogs : videos).filter(item => {
        const term = searchTerm.toLowerCase();
        if (activeTab === 'appointments') {
            const matchesSearch = item.name.toLowerCase().includes(term) || item.mobile.includes(term);
            const matchesFilter = filterStatus === 'All' || item.status === filterStatus;
            return matchesSearch && matchesFilter;
        } else if (activeTab === 'blogs') {
            return item.title.toLowerCase().includes(term) || item.category.toLowerCase().includes(term);
        } else if (activeTab === 'videos') {
            return item.title.toLowerCase().includes(term);
        }
        return true;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <div className="bg-yellow-500/20 p-2 rounded-lg">
                            <Users className="w-8 h-8 text-yellow-500" />
                        </div>
                        Admin Dashboard
                    </h1>
                    <p className="text-slate-400 mt-1">Manage your consultations and content </p>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl text-sm border border-slate-700 transition-all"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-8 bg-slate-800 p-1.5 rounded-2xl border border-slate-700 w-fit">
                <button
                    onClick={() => setActiveTab('appointments')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'appointments' ? 'bg-yellow-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                >
                    <Users className="w-4 h-4" />
                    Appointments
                </button>
                <button
                    onClick={() => setActiveTab('blogs')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'blogs' ? 'bg-yellow-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                >
                    <BookOpen className="w-4 h-4" />
                    Blogs
                </button>
                <button
                    onClick={() => setActiveTab('profile')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'profile' ? 'bg-yellow-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                >
                    <User className="w-4 h-4" />
                    Profile
                </button>
                <button
                    onClick={() => setActiveTab('videos')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'videos' ? 'bg-yellow-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                >
                    <Play className="w-4 h-4 transition-transform group-hover:scale-110" />
                    Videos
                </button>
            </div>

            {/* Main Content Area */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-xl min-h-[400px]">
                {loading ? (
                    <div className="py-20 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-yellow-500 mx-auto"></div>
                        <p className="text-slate-500 mt-4">Loading data...</p>
                    </div>
                ) : (
                    <div>
                        {activeTab === 'profile' ? (
                            <form onSubmit={handleProfileSubmit} className="p-8 space-y-8 max-w-4xl mx-auto">
                                <div className="flex items-center gap-4 border-b border-slate-700 pb-6 mb-2">
                                    <div className="bg-yellow-500/10 p-3 rounded-full">
                                        <User className="w-6 h-6 text-yellow-500" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white">Edit Website Profile</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                                        <input
                                            type="text"
                                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-yellow-500 outline-none transition-all"
                                            value={profileFormData.name}
                                            onChange={(e) => setProfileFormData({ ...profileFormData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Profile Photo</label>
                                        <div className="relative">
                                            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-400 file:bg-yellow-500 file:text-slate-950 file:border-none file:px-3 file:py-1 file:rounded-lg file:mr-4 file:font-bold cursor-pointer"
                                                onChange={(e) => setProfileFormData({ ...profileFormData, photo: e.target.files[0] })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider text-primary">Biography</label>
                                    <textarea
                                        rows="6"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-yellow-500 outline-none transition-all resize-none"
                                        value={profileFormData.bio}
                                        onChange={(e) => setProfileFormData({ ...profileFormData, bio: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Experience</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 3 Years"
                                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-yellow-500 outline-none transition-all"
                                            value={profileFormData.experience}
                                            onChange={(e) => setProfileFormData({ ...profileFormData, experience: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Past Work</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 200+ International Clients"
                                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-yellow-500 outline-none transition-all"
                                            value={profileFormData.past_works}
                                            onChange={(e) => setProfileFormData({ ...profileFormData, past_works: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Services (Comma Separated)</label>
                                    <input
                                        type="text"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-yellow-500 outline-none transition-all"
                                        value={profileFormData.services}
                                        onChange={(e) => setProfileFormData({ ...profileFormData, services: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Achievements</label>
                                    <textarea
                                        rows="3"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-yellow-500 outline-none transition-all resize-none"
                                        value={profileFormData.achievements}
                                        onChange={(e) => setProfileFormData({ ...profileFormData, achievements: e.target.value })}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={profileLoading}
                                    className="w-full bg-yellow-500 text-slate-950 font-bold py-4 rounded-xl hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-500/20 disabled:opacity-50 mt-4"
                                >
                                    {profileLoading ? 'Updating Profile...' : 'Save Profile Changes'}
                                </button>
                            </form>
                        ) : (
                            <div className="overflow-x-auto">
                                {/* Search & Stats Bar */}
                                <div className="p-4 bg-slate-950/10 border-b border-slate-700 flex flex-col md:flex-row gap-4 items-center justify-between">
                                    <div className="relative w-full md:w-96">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <input
                                            type="text"
                                            placeholder={`Search ${activeTab}...`}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-500 transition-all"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex gap-3 w-full md:w-auto">
                                        {activeTab === 'appointments' && (
                                            <select
                                                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                                                value={filterStatus}
                                                onChange={(e) => setFilterStatus(e.target.value)}
                                            >
                                                <option value="All">All Status</option>
                                                <option value="Pending">Pending</option>
                                                <option value="Contacted">Contacted</option>
                                            </select>
                                        )}
                                        {activeTab === 'blogs' && (
                                            <button
                                                onClick={() => handleOpenBlogModal()}
                                                className="flex items-center gap-2 bg-yellow-500 text-slate-950 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-yellow-400 transition-all"
                                            >
                                                <Plus className="w-4 h-4" /> New Blog
                                            </button>
                                        )}
                                        {activeTab === 'videos' && (
                                            <button
                                                onClick={() => setIsVideoModalOpen(true)}
                                                className="flex items-center gap-2 bg-yellow-500 text-slate-950 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-yellow-400 transition-all"
                                            >
                                                <Plus className="w-4 h-4" /> New Video
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {activeTab === 'appointments' ? (
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-950/30 text-slate-500 text-xs font-bold uppercase tracking-widest border-b border-slate-700/50">
                                            <tr>
                                                <th className="px-6 py-4">Client</th>
                                                <th className="px-6 py-4">Status</th>
                                                <th className="px-6 py-4">Schedule</th>
                                                <th className="px-6 py-4">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-700/30">
                                            {filteredItems.map((app) => (
                                                <tr key={app.id} className="hover:bg-slate-700/20 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="text-white font-bold">{app.name}</div>
                                                        <div className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                                                            {app.mobile} • {app.email}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${app.status === 'Contacted' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                                                            }`}>
                                                            {app.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-xs">
                                                        <div className="text-slate-300 font-medium">{app.date}</div>
                                                        <div className="text-slate-500 mt-0.5">{app.time}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            {app.status === 'Pending' && (
                                                                <button
                                                                    onClick={() => handleMarkContacted(app.id)}
                                                                    className="bg-green-500/10 hover:bg-green-500/20 text-green-500 p-2 rounded-lg transition-all"
                                                                    title="Mark Contacted"
                                                                >
                                                                    <CheckCircle className="w-5 h-5" />
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => handleDeleteAppointment(app.id)}
                                                                className="bg-red-500/10 hover:bg-red-500/20 text-red-500 p-2 rounded-lg transition-all"
                                                                title="Delete"
                                                            >
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : activeTab === 'blogs' ? (
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-950/30 text-slate-500 text-xs font-bold uppercase tracking-widest border-b border-slate-700/50">
                                            <tr>
                                                <th className="px-6 py-4">Blog Post</th>
                                                <th className="px-6 py-4">Category</th>
                                                <th className="px-6 py-4">Date</th>
                                                <th className="px-6 py-4">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-700/30">
                                            {filteredItems.map((blog) => (
                                                <tr key={blog.id} className="hover:bg-slate-700/20 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-4">
                                                            {blog.image && <img src={blog.image} className="w-10 h-10 rounded-lg object-cover" />}
                                                            <div className="text-white font-bold">{blog.title}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="bg-slate-900 border border-slate-700 text-slate-400 px-2 py-1 rounded text-[10px] font-bold uppercase">{blog.category}</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-xs text-slate-500">
                                                        {blog.date}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <button
                                                                onClick={() => handleOpenBlogModal(blog)}
                                                                className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 p-2 rounded-lg transition-all"
                                                            >
                                                                <Edit2 className="w-5 h-5" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteBlog(blog.id)}
                                                                className="bg-red-500/10 hover:bg-red-500/20 text-red-500 p-2 rounded-lg transition-all"
                                                            >
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-950/30 text-slate-500 text-xs font-bold uppercase tracking-widest border-b border-slate-700/50">
                                            <tr>
                                                <th className="px-6 py-4">Video</th>
                                                <th className="px-6 py-4">Video ID</th>
                                                <th className="px-6 py-4">Added On</th>
                                                <th className="px-6 py-4">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-700/30">
                                            {filteredItems.map((video) => (
                                                <tr key={video.id} className="hover:bg-slate-700/20 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-4">
                                                            <img src={video.thumbnail} className="w-16 h-10 rounded-lg object-cover border border-slate-700" />
                                                            <div className="text-white font-bold">{video.title}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <code className="bg-slate-900 border border-slate-700 text-yellow-500 px-2 py-1 rounded text-[10px]">{video.video_id}</code>
                                                    </td>
                                                    <td className="px-6 py-4 text-xs text-slate-500">
                                                        {new Date(video.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button
                                                            onClick={() => handleDeleteVideo(video.id)}
                                                            className="bg-red-500/10 hover:bg-red-500/20 text-red-500 p-2 rounded-lg transition-all"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}

                                {filteredItems.length === 0 && (
                                    <div className="py-20 text-center text-slate-500 font-medium tracking-wide">
                                        No items found matching your search.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Blog Modal */}
            {isBlogModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                    <div className="relative w-full max-w-2xl bg-slate-800 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                {editingBlog ? <Edit2 className="w-5 h-5 text-yellow-500" /> : <Plus className="w-5 h-5 text-yellow-500" />}
                                {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
                            </h3>
                            <button onClick={() => setIsBlogModalOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleBlogSubmit} className="p-6 space-y-6">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Post Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-yellow-500 outline-none transition-all"
                                    placeholder="Enter catchy title..."
                                    value={blogFormData.title}
                                    onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Category</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-yellow-500 outline-none transition-all"
                                        placeholder="e.g. Life Path"
                                        value={blogFormData.category}
                                        onChange={(e) => setBlogFormData({ ...blogFormData, category: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Cover Image</label>
                                    <div className="relative">
                                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-400 file:bg-yellow-500 file:text-slate-950 file:border-none file:px-3 file:py-1 file:rounded-lg file:mr-4 file:font-bold hover:file:bg-yellow-400 cursor-pointer"
                                            onChange={(e) => setBlogFormData({ ...blogFormData, image: e.target.files[0] })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Content</label>
                                <textarea
                                    required
                                    rows="8"
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-yellow-500 outline-none transition-all resize-none"
                                    placeholder="Write your blog content here..."
                                    value={blogFormData.content}
                                    onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsBlogModalOpen(false)}
                                    className="flex-grow bg-slate-700 text-white font-bold py-3 rounded-xl hover:bg-slate-600 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={blogFormLoading}
                                    className="flex-[2] bg-yellow-500 text-slate-950 font-bold py-3 rounded-xl hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-500/20 disabled:opacity-50"
                                >
                                    {blogFormLoading ? 'Processing...' : editingBlog ? 'Update Post' : 'Publish Blog Post'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Video Modal */}
            {isVideoModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                    <div className="relative w-full max-w-md bg-slate-800 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Play className="w-5 h-5 text-yellow-500" />
                                Add New Video
                            </h3>
                            <button onClick={() => setIsVideoModalOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleVideoSubmit} className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Video Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-yellow-500 outline-none transition-all"
                                    placeholder="e.g. Life Path 7 Meaning"
                                    value={videoFormData.title}
                                    onChange={(e) => setVideoFormData({ ...videoFormData, title: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">YouTube URL</label>
                                <input
                                    type="url"
                                    required
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-yellow-500 outline-none transition-all"
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    value={videoFormData.url}
                                    onChange={(e) => setVideoFormData({ ...videoFormData, url: e.target.value })}
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsVideoModalOpen(false)}
                                    className="flex-grow bg-slate-700 text-white font-bold py-3 rounded-xl hover:bg-slate-600 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={videoFormLoading}
                                    className="flex-[2] bg-yellow-500 text-slate-950 font-bold py-3 rounded-xl hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-500/20 disabled:opacity-50"
                                >
                                    {videoFormLoading ? 'Adding...' : 'Add Video'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;

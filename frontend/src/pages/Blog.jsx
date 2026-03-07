import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { numerologyApi, getMediaUrl } from '../services/api';
import { Calendar, ChevronRight } from 'lucide-react';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await numerologyApi.getBlogs();
                setBlogs(response.data);
            } catch (error) {
                console.error("Failed to fetch blogs", error);
                // Demo data if empty
                setBlogs([
                    { id: 1, title: "The Secret of Number 7", category: "Basics", date: "2024-03-01", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", content: "Short summary..." },
                    { id: 2, title: "What Your Name Says About You", category: "Destiny", date: "2024-02-28", image: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", content: "Short summary..." },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-yellow-500"></div></div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold gold-text mb-4">Numerology Insights</h1>
                <p className="text-slate-400">Deep dives into the world of numbers and vibrations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                    <div key={blog.id} className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 flex flex-col group">
                        <div className="h-48 overflow-hidden">
                            <img src={getMediaUrl(blog.image) || "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80"} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="p-6 flex-grow flex flex-col">
                            <div className="flex items-center gap-4 text-xs text-yellow-500 font-bold uppercase tracking-wider mb-4">
                                <span>{blog.category}</span>
                                <span className="flex items-center gap-1 text-slate-500 font-normal">
                                    <Calendar className="w-3 h-3" />
                                    {blog.date}
                                </span>
                            </div>
                            <h2 className="text-xl font-bold text-white mb-4 group-hover:text-yellow-500 transition-colors">
                                {blog.title}
                            </h2>
                            <p className="text-slate-400 text-sm line-clamp-3 mb-6">
                                {blog.content.substring(0, 150)}...
                            </p>
                            <div className="mt-auto">
                                <Link to={`/blog/${blog.id}`} className="flex items-center gap-2 text-yellow-500 text-sm font-bold hover:gap-3 transition-all">
                                    Read More
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;

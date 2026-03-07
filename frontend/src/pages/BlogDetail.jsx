import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { numerologyApi, getMediaUrl } from '../services/api';
import { Calendar, Tag, ChevronLeft, Share2 } from 'lucide-react';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await numerologyApi.getBlogDetail(id);
                setBlog(response.data);
            } catch (error) {
                console.error("Failed to fetch blog detail", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-yellow-500"></div></div>;

    if (!blog) return <div className="text-center py-20">Post not found. <Link to="/blog" className="text-yellow-500">Go back</Link></div>;

    return (
        <article className="max-w-4xl mx-auto px-4 py-16">
            <Link to="/blog" className="flex items-center gap-2 text-sm text-slate-400 hover:text-yellow-500 mb-8 transition-colors">
                <ChevronLeft className="w-4 h-4" />
                Back to Blog
            </Link>

            <div className="h-96 w-full rounded-2xl overflow-hidden mb-8">
                <img src={getMediaUrl(blog.image) || "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80"} alt={blog.title} className="w-full h-full object-cover" />
            </div>

            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-slate-400 border-b border-slate-800 pb-8">
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-yellow-500" />
                    {blog.date}
                </div>
                <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-yellow-500" />
                    {blog.category}
                </div>
                <button className="flex items-center gap-2 hover:text-yellow-500 transition-colors ml-auto">
                    <Share2 className="w-4 h-4" />
                    Share
                </button>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                {blog.title}
            </h1>

            <div className="prose prose-invert prose-yellow max-w-none text-slate-300 leading-relaxed space-y-6 text-lg">
                {blog.content.split('\n').map((para, idx) => (
                    <p key={idx}>{para}</p>
                ))}
            </div>

            <div className="mt-16 bg-slate-800 p-8 rounded-2xl text-center border border-slate-700">
                <h3 className="text-2xl font-bold gold-text mb-4">Want a Personalized Reading?</h3>
                <p className="text-slate-400 mb-6 font-medium">For remedies and personal consultation, contact: +977 9702935911</p>
                <Link to="/appointment" className="bg-yellow-500 text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition-all inline-block">
                    Book Consultation
                </Link>
            </div>
        </article>
    );
};

export default BlogDetail;

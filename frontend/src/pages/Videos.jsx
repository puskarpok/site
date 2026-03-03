import React, { useEffect, useState } from 'react';
import { numerologyApi } from '../services/api';
import { Play, Youtube, ExternalLink } from 'lucide-react';

const Videos = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await numerologyApi.getVideos();
                setVideos(response.data);
            } catch (error) {
                console.error("Failed to fetch videos", error);
                // Fallback or demo data
                setVideos([
                    { id: 1, title: "Numerology & Success - Puskaar Pokharel", video_id: "3ONZUCOhAFk", thumbnail: "https://img.youtube.com/vi/3ONZUCOhAFk/mqdefault.jpg" },
                    { id: 2, title: "Secret of Numbers - Puskaar Pokharel", video_id: "9BsiQjitRHk", thumbnail: "https://img.youtube.com/vi/9BsiQjitRHk/mqdefault.jpg" },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h1 className="text-4xl font-bold gold-text mb-2 flex items-center gap-3">
                        <Youtube className="w-10 h-10 text-red-600" />
                        Watch & Learn
                    </h1>
                    <p className="text-slate-400">Exclusive video content by Numerologist Puskaar Pokharel.</p>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-yellow-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video) => (
                        <div
                            key={video.id}
                            className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-yellow-500/50 transition-all group cursor-pointer"
                            onClick={() => setSelectedVideo(video)}
                        >
                            <div className="relative aspect-video">
                                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="bg-yellow-500 p-4 rounded-full">
                                        <Play className="w-8 h-8 text-slate-900 fill-current" />
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-white line-clamp-2 mb-4 group-hover:text-yellow-500 transition-colors">
                                    {video.title}
                                </h3>
                                <div className="flex items-center justify-between text-sm text-slate-500">
                                    <span>Numerology Insights</span>
                                    <ExternalLink className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Video Modal */}
            {selectedVideo && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
                    <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                        <button
                            onClick={() => setSelectedVideo(null)}
                            className="absolute -top-12 right-0 text-white hover:text-yellow-500 font-bold"
                        >
                            Close Video
                        </button>
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${selectedVideo.video_id}?autoplay=1`}
                            title={selectedVideo.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Videos;

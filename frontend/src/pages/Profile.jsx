import React, { useEffect, useState } from 'react';
import { numerologyApi, getMediaUrl } from '../services/api';
import { User, Award, Briefcase, Star, CheckCircle } from 'lucide-react';

const DEFAULT_PROFILE = {
    name: "Puskaar Pokharel",
    bio: "Puskaar Pokharel is a distinguished Senior Numerologist and Financial Coach with years of experience helping individuals and organizations align their life path with their financial goals. Through the ancient wisdom of Pythagorean Numerology combined with modern financial strategies, he provides a unique perspective on personal development and professional success.\n\nHis approach is deeply personalized, focusing on the unique vibrations of numbers to unlock hidden potential and navigate life's challenges with clarity and confidence.",
    experience: "10+ Years in Professional Numerology\nCertified Financial Risk Manager\nConsulted 5000+ Clients Worldwide",
    achievements: "Author of 'Numbers & Wealth'\nFeatured in National Media\nKeynote Speaker at International Spirituality Forums",
    services: "Personal Numerology Audit, Financial Path Coaching, Name Vibration Correction, Corporate Numerology Consulting",
    past_works: "Helping transition struggling entrepreneurs into successful business leaders through name corrections and strategy alignment."
};

const Profile = () => {
    const [profile, setProfile] = useState(DEFAULT_PROFILE);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await numerologyApi.getProfile();
                if (response.data.length > 0) {
                    setProfile(response.data[0]);
                }
            } catch (error) {
                console.error("Failed to fetch profile, using default.", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-yellow-500"></div></div>;

    if (!profile) return <div className="text-center py-20">Profile coming soon...</div>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="grid md:grid-cols-3 gap-12">
                <div className="md:col-span-1">
                    <div className="bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 sticky top-24">
                        <div className="aspect-square bg-slate-700 flex items-center justify-center">
                            <img
                                src="/profile.png"
                                alt={profile.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://ui-avatars.com/api/?name=Puskaar+Pokharel&background=d4af37&color=1a1a1a&size=512";
                                }}
                            />
                        </div>
                        <div className="p-6 text-center">
                            <h2 className="text-2xl font-bold gold-text mb-1">{profile.name}</h2>
                            <p className="text-slate-400 text-sm mb-4">Senior Numerologist & Financial Coach</p>
                            <div className="flex justify-center gap-4">
                                <button onClick={() => window.open('https://www.tiktok.com/@puskaar15', '_blank')} className="bg-yellow-500 text-slate-900 px-6 py-2 rounded-full font-bold text-sm hover:bg-yellow-600 transition-color">Follow</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 space-y-12">
                    <section>
                        <h1 className="text-4xl font-bold text-white mb-6">Biography</h1>
                        <p className="text-slate-300 leading-relaxed text-lg whitespace-pre-line">
                            {profile.bio}
                        </p>
                    </section>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50">
                            <div className="flex items-center gap-3 mb-4">
                                <Briefcase className="text-yellow-500 w-6 h-6" />
                                <h3 className="text-xl font-bold text-white">Experience</h3>
                            </div>
                            <p className="text-slate-400 whitespace-pre-line">{profile.experience}</p>
                        </div>
                        <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50">
                            <div className="flex items-center gap-3 mb-4">
                                <Award className="text-yellow-500 w-6 h-6" />
                                <h3 className="text-xl font-bold text-white">Achievements</h3>
                            </div>
                            <p className="text-slate-400 whitespace-pre-line">{profile.achievements}</p>
                        </div>
                    </div>

                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <Star className="text-yellow-500 w-8 h-8" />
                            <h2 className="text-3xl font-bold text-white">Services Offered</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            {profile.services.split(',').map((service, idx) => (
                                <div key={idx} className="flex items-center gap-3 bg-slate-800 p-4 rounded-xl border border-slate-700">
                                    <CheckCircle className="text-yellow-500 w-5 h-5 flex-shrink-0" />
                                    <span className="text-slate-200">{service.trim()}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold text-white mb-6">Past Works</h2>
                        <div className="bg-slate-800/40 p-8 rounded-2xl border border-slate-700/50">
                            <p className="text-slate-300 italic">
                                "{profile.past_works}"
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Profile;

import React, { useState } from 'react';
import { numerologyApi } from '../services/api';
import { Calculator as CalcIcon, Send, Sparkles, User, Calendar, MousePointer2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BSDatePicker from '../components/BSDatePicker';

const Home = () => {
    const [formData, setFormData] = useState({ name: '', dob: '' });
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPicker, setShowPicker] = useState(false);

    const handleDobChange = (e) => {
        let val = e.target.value.replace(/\D/g, ''); // Remove non-digits
        if (val.length > 8) val = val.slice(0, 8);

        let formatted = val;
        if (val.length > 4) {
            formatted = val.slice(0, 4) + '-' + val.slice(4);
        }
        if (val.length > 6) {
            formatted = formatted.slice(0, 7) + '-' + formatted.slice(7);
        }

        setFormData({ ...formData, dob: formatted });
    };

    const handleDateSelect = (date) => {
        setFormData({ ...formData, dob: date });
        setShowPicker(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await numerologyApi.calculate(formData);
            setResults(response.data);
        } catch (error) {
            console.error("Calculation failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 gold-text">
                    Free Pythagoras Numerology Calculator
                </h1>
                <p className="text-slate-400 text-lg">
                    Know your Life Path, Destiny, Soul Urge, and Personality Numbers.
                </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 p-8 rounded-2xl shadow-2xl mb-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-400 ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-400 ml-1">Date of Birth (BS)</label>
                            <div className="relative group">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-yellow-500 transition-colors" />
                                <input
                                    type="text"
                                    required
                                    maxLength="10"
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-12 pr-12 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all font-mono"
                                    placeholder="YYYY-MM-DD"
                                    value={formData.dob}
                                    onChange={handleDobChange}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPicker(true)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-slate-800 rounded-md transition-colors text-slate-400 hover:text-yellow-500"
                                    title="Open Calendar"
                                >
                                    <MousePointer2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 text-slate-950 font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:from-yellow-500 hover:to-yellow-400 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <CalcIcon className="w-5 h-5" />
                                Calculate My Numbers
                            </>
                        )}
                    </button>
                </form>
            </div>

            <AnimatePresence>
                {results && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Object.entries(results).map(([key, data]) => (
                                <div key={key} className="bg-slate-800/80 border border-slate-700 p-6 rounded-xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Sparkles className="w-12 h-12 text-yellow-500" />
                                    </div>
                                    <h3 className="text-yellow-500 font-bold uppercase tracking-wider text-sm mb-2">
                                        {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                    </h3>
                                    <div className="flex items-baseline gap-3 mb-4">
                                        <span className="text-5xl font-black text-white">{data.value}</span>
                                    </div>
                                    <p className="text-slate-300 leading-relaxed italic">
                                        "{data.meaning}"
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-yellow-500/10 border border-yellow-500/20 p-8 rounded-2xl text-center">
                            <h2 className="text-2xl font-bold text-yellow-500 mb-4">Seeking Personal Guidance?</h2>
                            <p className="text-slate-300 mb-6">
                                Get a detailed consultation and specific remedies tailored for your unique vibrational profile.
                            </p>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                                <a
                                    href="/appointment"
                                    className="bg-yellow-500 text-slate-950 px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition-all"
                                >
                                    Book Appointment
                                </a>
                                <p className="text-lg font-semibold text-white">
                                    Or Call: 9702935911
                                </p>
                            </div>
                            <p className="mt-8 text-sm text-yellow-500/70 border-t border-yellow-500/10 pt-4">
                                For remedies and personal consultation, contact: 9702935911
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {showPicker && (
                <BSDatePicker
                    onSelect={handleDateSelect}
                    onClose={() => setShowPicker(false)}
                    currentDate={formData.dob}
                />
            )}
        </div>
    );
};

export default Home;

import React, { useState } from 'react';
import { numerologyApi } from '../services/api';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle } from 'lucide-react';

const Appointment = () => {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        date: '',
        time: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Map frontend fields to backend model fields
        const payload = {
            full_name: formData.name,
            mobile_number: formData.mobile,
            email: formData.email,
            preferred_date: formData.date,
            preferred_time: formData.time,
            message: formData.message
        };

        try {
            await numerologyApi.submitAppointment(payload);
            setSubmitted(true);
        } catch (error) {
            console.error("Booking failed", error);
            alert("Submission failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-20 text-center">
                <div className="bg-slate-800 p-12 rounded-3xl border border-slate-700 shadow-2xl">
                    <div className="bg-green-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="text-green-500 w-12 h-12" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Appointment Requested!</h2>
                    <p className="text-slate-400 text-lg mb-8">
                        Thank you for choosing us, <span className="text-white font-bold">{formData.name}</span>. We will contact you shortly on <span className="text-white">{formData.mobile}</span> to confirm your session.
                    </p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="bg-yellow-500 text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition-all"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold gold-text mb-4 underline decoration-yellow-500/30 underline-offset-8">
                    Book a Consultation
                </h1>
                <p className="text-slate-400">Step into a more harmonious and successful life path.</p>
            </div>

            <div className="bg-slate-800/80 p-8 md:p-12 rounded-3xl border border-slate-700 shadow-2xl backdrop-blur-md">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-400 block ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-12 pr-4 py-4 text-white focus:border-yellow-500 outline-none transition-all hover:bg-slate-900/80"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-400 block ml-1">Mobile Number</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="tel"
                                    required
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-12 pr-4 py-4 text-white focus:border-yellow-500 outline-none transition-all"
                                    placeholder="98XXXXXXXX"
                                    value={formData.mobile}
                                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-400 block ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="email"
                                required
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-12 pr-4 py-4 text-white focus:border-yellow-500 outline-none transition-all"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-400 block ml-1">Preferred Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="date"
                                    required
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-12 pr-4 py-4 text-white focus:border-yellow-500 outline-none transition-all"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-400 block ml-1">Preferred Time</label>
                            <div className="relative">
                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="time"
                                    required
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-12 pr-4 py-4 text-white focus:border-yellow-500 outline-none transition-all"
                                    value={formData.time}
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-400 block ml-1">Message (Optional)</label>
                        <div className="relative">
                            <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-500" />
                            <textarea
                                rows="4"
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-12 pr-4 py-4 text-white focus:border-yellow-500 outline-none transition-all"
                                placeholder="Any specific questions or concerns?"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            ></textarea>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black py-5 rounded-2xl text-xl transition-all flex items-center justify-center group shadow-xl shadow-yellow-500/10"
                    >
                        {loading ? "Submitting..." : "Schedule My Session Now"}
                        {!loading && <CheckCircle className="ml-3 w-6 h-6 group-hover:scale-125 transition-transform" />}
                    </button>
                </form>
            </div>

            <div className="mt-12 text-center p-6 border border-slate-700/30 rounded-2xl bg-slate-800/30">
                <p className="text-slate-500 text-sm">
                    For immediate support or questions before booking, please contact us directly at <span className="text-yellow-500 font-bold">9702935911</span>.
                </p>
            </div>
        </div>
    );
};

export default Appointment;

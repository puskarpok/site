import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-950 border-t border-slate-800 pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold gold-text mb-4">Numerology By Puskaar</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Discover the hidden power of numbers in your life. Expert guidance in Chaldean Numerology for personal growth, career, and relationships.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><a href="/" className="hover:text-yellow-500 transition-colors">Numerology Calculator</a></li>
                            <li><a href="/about" className="hover:text-yellow-500 transition-colors">About Numerology</a></li>
                            <li><a href="/profile" className="hover:text-yellow-500 transition-colors">Our Numerologist</a></li>
                            <li><a href="/blog" className="hover:text-yellow-500 transition-colors">Latest Blogs</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-yellow-500" />
                                <span>9702935911</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-yellow-500" />
                                <span>ankajyotishpuskar@gmail.com</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-yellow-500" />
                                <span>Sunsari, Koshi Province, Nepal</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-slate-900 text-center text-slate-500 text-sm">
                    <p>© {new Date().getFullYear()} Numerologist Puskaar Pokharel. All rights reserved.</p>
                    <p className="mt-2 text-yellow-600 font-medium">For remedies and personal consultation, contact: 9702935911</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

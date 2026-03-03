import React from 'react';
import { BookOpen, Star, Target } from 'lucide-react';

const About = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold gold-text mb-8 text-center">About Numerology</h1>

            <div className="space-y-12">
                <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
                    <div className="flex items-center gap-4 mb-4">
                        <BookOpen className="w-8 h-8 text-yellow-500" />
                        <h2 className="text-2xl font-semibold text-white">What is Numerology?</h2>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                        Numerology is the ancient study of the mystical relationship between numbers and physical objects or living things. It is based on the belief that numbers carry unique vibrations that influence our personality, destiny, and life events. By analyzing your name and birth date, numerology reveals your strengths, challenges, and soul's purpose.
                    </p>
                </section>

                <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
                    <div className="flex items-center gap-4 mb-4">
                        <Star className="w-8 h-8 text-yellow-500" />
                        <h2 className="text-2xl font-semibold text-white">Pythagoras Numerology System</h2>
                    </div>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        The Pythagoras system is the most popular form of numerology used today. Developed by the Greek philosopher Pythagoras, it assigns a numerical value to each letter of the alphabet (1 to 9).
                    </p>
                    <div className="grid grid-cols-3 md:grid-cols-9 gap-2 text-center">
                        {[
                            ['1', 'A J S'], ['2', 'B K T'], ['3', 'C L U'],
                            ['4', 'D M V'], ['5', 'E N W'], ['6', 'F O X'],
                            ['7', 'G P Y'], ['8', 'H Q Z'], ['9', 'I R']
                        ].map(([num, letters]) => (
                            <div key={num} className="bg-slate-900 p-2 rounded border border-slate-800">
                                <div className="text-yellow-500 font-bold">{num}</div>
                                <div className="text-xs text-slate-500">{letters}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
                    <div className="flex items-center gap-4 mb-4">
                        <Target className="w-8 h-8 text-yellow-500" />
                        <h2 className="text-2xl font-semibold text-white">Benefits of Numerology</h2>
                    </div>
                    <ul className="grid md:grid-cols-2 gap-4 text-slate-300">
                        <li className="flex gap-2 items-start">
                            <span className="text-yellow-500 font-bold">✓</span> Self-Discovery and Awareness
                        </li>
                        <li className="flex gap-2 items-start">
                            <span className="text-yellow-500 font-bold">✓</span> Career Guidance & Success
                        </li>
                        <li className="flex gap-2 items-start">
                            <span className="text-yellow-500 font-bold">✓</span> Relationship Compatibility
                        </li>
                        <li className="flex gap-2 items-start">
                            <span className="text-yellow-500 font-bold">✓</span> Choosing Auspicious Dates
                        </li>
                        <li className="flex gap-2 items-start">
                            <span className="text-yellow-500 font-bold">✓</span> Understanding Life Cycles
                        </li>
                        <li className="flex gap-2 items-start">
                            <span className="text-yellow-500 font-bold">✓</span> Personal Growth & Healing
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default About;

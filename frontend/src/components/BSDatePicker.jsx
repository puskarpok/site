import React, { useState, useEffect } from 'react';
import { X, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const BSDatePicker = ({ onSelect, onClose, currentDate }) => {
    const [year, setYear] = useState(2080);
    const [month, setMonth] = useState(1);
    const [day, setDay] = useState(1);

    const months = [
        "Baisakh", "Jestha", "Ashadh", "Shrawan", "Bhadra", "Ashwin",
        "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"
    ];

    useEffect(() => {
        if (currentDate && currentDate.includes('-')) {
            const parts = currentDate.split('-');
            if (parts.length === 3) {
                setYear(parseInt(parts[0]) || 2080);
                setMonth(parseInt(parts[1]) || 1);
                setDay(parseInt(parts[2]) || 1);
            }
        }
    }, [currentDate]);

    const handleConfirm = () => {
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        onSelect(formattedDate);
    };

    const generateYears = () => {
        const years = [];
        for (let i = 2000; i <= 2100; i++) {
            years.push(i);
        }
        return years;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
            >
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-yellow-500" />
                        <h2 className="text-xl font-bold text-white">Select BS Date</h2>
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-8">
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        {/* Year Selector */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Year</label>
                            <select
                                value={year}
                                onChange={(e) => setYear(parseInt(e.target.value))}
                                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-2 py-3 focus:ring-2 focus:ring-yellow-500 outline-none scrollbar-hide text-sm"
                            >
                                {generateYears().map(y => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </div>

                        {/* Month Selector */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Month</label>
                            <select
                                value={month}
                                onChange={(e) => setMonth(parseInt(e.target.value))}
                                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-2 py-3 focus:ring-2 focus:ring-yellow-500 outline-none text-sm"
                            >
                                {months.map((m, i) => (
                                    <option key={i + 1} value={i + 1}>{m}</option>
                                ))}
                            </select>
                        </div>

                        {/* Day Selector */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Day</label>
                            <select
                                value={day}
                                onChange={(e) => setDay(parseInt(e.target.value))}
                                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-2 py-3 focus:ring-2 focus:ring-yellow-500 outline-none text-sm"
                            >
                                {[...Array(32)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-4 rounded-2xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 transition-all border border-slate-700"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="flex-1 px-6 py-4 rounded-2xl bg-yellow-500 text-slate-950 font-black hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-500/20"
                        >
                            Set Date
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default BSDatePicker;

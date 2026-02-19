import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { cityData } from '../data/mockData';
import { Users, Zap, Cpu } from 'lucide-react';

const AnimatedNumber = ({ value, suffix = "" }) => {
    const [displayValue, setDisplayValue] = useState(value);

    useEffect(() => {
        let start = displayValue;
        const end = value;
        const duration = 500;
        const startTime = performance.now();

        const update = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = start + (end - start) * progress;
            setDisplayValue(current);

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };
        requestAnimationFrame(update);
    }, [value]);

    return (
        <span className="font-mono font-bold text-3xl md:text-4xl text-futuristic-accent">
            {displayValue.toFixed(1)}{suffix}
        </span>
    );
};

const SmartCity = () => {
    const [currentYear, setCurrentYear] = useState(2025);
    const data = cityData.find(d => d.year === currentYear) || cityData[0];

    return (
        <section id="simulation" className="py-24 px-4 bg-futuristic-bg relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-4xl font-bold mb-4"
                    >
                        Smart City Simulation
                    </motion.h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Interact with the timeline to visualize the transformation of urban infrastructure by 2040.
                    </p>
                </div>

                {/* Year Slider */}
                <div className="mb-16 max-w-2xl mx-auto px-4">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-bold tracking-widest text-futuristic-purple uppercase">Select Year</span>
                        <span className="text-2xl font-black text-futuristic-accent">{currentYear}</span>
                    </div>
                    <input
                        type="range"
                        min="2025"
                        max="2040"
                        step="3"
                        value={currentYear}
                        onChange={(e) => setCurrentYear(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-futuristic-accent"
                    />
                </div>

                {/* Glass Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="glass-card p-8 flex flex-col items-center text-center"
                    >
                        <Users className="w-10 h-10 text-blue-400 mb-4" />
                        <h3 className="text-sm font-bold mb-2 text-gray-400 uppercase">Population Growth</h3>
                        <AnimatedNumber value={data.population} suffix="B" />
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="glass-card p-8 flex flex-col items-center text-center"
                    >
                        <Zap className="w-10 h-10 text-yellow-400 mb-4" />
                        <h3 className="text-sm font-bold mb-2 text-gray-400 uppercase">Renewable Energy</h3>
                        <AnimatedNumber value={data.energy} suffix="%" />
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="glass-card p-8 flex flex-col items-center text-center"
                    >
                        <Cpu className="w-10 h-10 text-purple-400 mb-4" />
                        <h3 className="text-sm font-bold mb-2 text-gray-400 uppercase">AI Automation</h3>
                        <AnimatedNumber value={data.automation} suffix="%" />
                    </motion.div>
                </div>

                {/* Chart */}
                <div className="h-[400px] glass-card p-6">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={cityData}>
                            <defs>
                                <linearGradient id="colorPop" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#00f2ff" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                            <XAxis dataKey="year" stroke="#666" fontStyle={{ fontSize: 12 }} />
                            <YAxis stroke="#666" fontStyle={{ fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                                itemStyle={{ color: '#00f2ff' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="population"
                                stroke="#00f2ff"
                                fillOpacity={1}
                                fill="url(#colorPop)"
                                strokeWidth={3}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
};

export default SmartCity;

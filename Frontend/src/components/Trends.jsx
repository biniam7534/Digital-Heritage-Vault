import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';
import { motion } from 'framer-motion';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const Trends = () => {
    const [trends, setTrends] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrends = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/future/metrics`);
                const json = await res.json();
                if (json.success) {
                    const globalTrends = json.data
                        .filter(m => m.type === 'global_trend')
                        .map(m => ({
                            label: m.name,
                            value: m.value,
                            color: m.category
                        }));
                    setTrends(globalTrends);
                }
            } catch (err) {
                console.error("Failed to fetch trends:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTrends();
    }, []);

    if (loading) return null;

    return (
        <section id="trends" className="py-24 px-4 bg-futuristic-bg border-t border-gray-900">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                    <div>
                        <h2 className="text-4xl font-bold mb-4">Future Trends</h2>
                        <p className="text-gray-400">Real-time global shift metrics estimated for 2040.</p>
                    </div>
                    <div className="text-right">
                        <span className="text-xs font-mono text-futuristic-accent uppercase tracking-widest">Global Status: Accelerated</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {trends.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-card p-6"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-sm font-bold text-gray-500 uppercase">{stat.label}</span>
                                <span className="text-2xl font-black text-white">{stat.value}%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${stat.value}%` }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="h-full"
                                    style={{ backgroundColor: stat.color }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="glass-card p-8 h-[350px]">
                    <h3 className="text-lg font-bold mb-8 uppercase tracking-widest">Growth Comparison</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={trends}>
                            <XAxis dataKey="label" stroke="#666" fontSize={12} />
                            <YAxis hide />
                            <Tooltip
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                            />
                            <Bar
                                dataKey="value"
                                radius={[4, 4, 0, 0]}
                                className="fill-futuristic-accent"
                            >
                                {trends.map((entry, index) => (
                                    <motion.rect
                                        key={`cell-${index}`}
                                        initial={{ height: 0, y: 300 }}
                                        whileInView={{ height: entry.value * 2.5, y: 300 - entry.value * 2.5 }}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
};

export default Trends;

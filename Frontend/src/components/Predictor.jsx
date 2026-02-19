import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { predictFuture } from '../utils/predictionLogic';
import { Briefcase, TrendingUp, Map } from 'lucide-react';

const Predictor = () => {
    const [formData, setFormData] = useState({
        skillLevel: 5,
        field: 'Technology',
        hours: 20
    });
    const [result, setResult] = useState(null);
    const [isPredicting, setIsPredicting] = useState(false);

    const handlePredict = () => {
        setIsPredicting(true);
        // Simulate AI "calculating"
        setTimeout(async () => {
            const prediction = predictFuture(formData.skillLevel, formData.field, formData.hours);
            setResult(prediction);
            setIsPredicting(false);

            // Save to backend
            try {
                await fetch('http://localhost:5000/api/future/predict', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...formData,
                        careerTitle: prediction.careerTitle,
                        projection: prediction.projection,
                        roadmap: prediction.roadmap
                    })
                });
            } catch (err) {
                console.error("Failed to save prediction:", err);
            }
        }, 1500);
    };

    return (
        <section id="predictor" className="py-24 px-4 bg-futuristic-bg relative border-t border-gray-900">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Personal Future Predictor</h2>
                    <p className="text-gray-400">Discover your potential trajectory in the world of 2040.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form */}
                    <div className="glass-card p-10">
                        <h3 className="text-xl font-bold mb-8">Simulation Parameters</h3>
                        <div className="space-y-8">
                            <div>
                                <label className="block text-sm font-bold text-gray-400 uppercase mb-4">Current Skill Level (1-10)</label>
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={formData.skillLevel}
                                    onChange={(e) => setFormData({ ...formData, skillLevel: parseInt(e.target.value) })}
                                    className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-futuristic-accent"
                                />
                                <div className="flex justify-between text-xs mt-2 text-gray-500">
                                    <span>Novice</span>
                                    <span>Expert</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-400 uppercase mb-4">Field of Interest</label>
                                <select
                                    value={formData.field}
                                    onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                                    className="w-full bg-gray-900 border border-gray-800 p-3 rounded-lg text-white focus:outline-none focus:border-futuristic-accent"
                                >
                                    <option>Technology</option>
                                    <option>Healthcare</option>
                                    <option>Creative Arts</option>
                                    <option>Sustainability</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-400 uppercase mb-4">Weekly Study Hours</label>
                                <input
                                    type="number"
                                    value={formData.hours}
                                    onChange={(e) => setFormData({ ...formData, hours: parseInt(e.target.value) })}
                                    className="w-full bg-gray-900 border border-gray-800 p-3 rounded-lg text-white focus:outline-none focus:border-futuristic-accent"
                                />
                            </div>

                            <button
                                onClick={handlePredict}
                                disabled={isPredicting}
                                className="w-full py-4 rounded-lg futuristic-gradient text-black font-bold uppercase tracking-widest transition-opacity hover:opacity-90 disabled:opacity-50"
                            >
                                {isPredicting ? "Analyzing Future..." : "Predict My 2040"}
                            </button>
                        </div>
                    </div>

                    {/* Results Area */}
                    <div className="relative min-h-[400px]">
                        <AnimatePresence mode="wait">
                            {result ? (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <div className="glass-card p-6 border-l-4 border-futuristic-accent">
                                        <div className="flex items-center gap-4 mb-2">
                                            <Briefcase className="text-futuristic-accent w-6 h-6" />
                                            <h4 className="text-sm font-bold text-gray-400 uppercase">Projected Career</h4>
                                        </div>
                                        <p className="text-2xl font-black">{result.careerTitle}</p>
                                    </div>

                                    <div className="glass-card p-6 h-[250px]">
                                        <div className="flex items-center gap-4 mb-4">
                                            <TrendingUp className="text-green-400 w-6 h-6" />
                                            <h4 className="text-sm font-bold text-gray-400 uppercase">Estimated Income Growth</h4>
                                        </div>
                                        <ResponsiveContainer width="100%" height="80%">
                                            <LineChart data={result.projection}>
                                                <XAxis dataKey="year" hide />
                                                <YAxis hide domain={['auto', 'auto']} />
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                                                    formatter={(value) => [`$${value.toLocaleString()}`, 'Income']}
                                                />
                                                <Line type="monotone" dataKey="income" stroke="#00f2ff" strokeWidth={3} dot={{ r: 4, fill: '#00f2ff' }} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>

                                    <div className="glass-card p-6">
                                        <div className="flex items-center gap-4 mb-4">
                                            <Map className="text-purple-400 w-6 h-6" />
                                            <h4 className="text-sm font-bold text-gray-400 uppercase">Skill Roadmap</h4>
                                        </div>
                                        <div className="space-y-4">
                                            {result.roadmap.map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-4">
                                                    <span className="text-xs font-mono text-futuristic-accent">{item.year}</span>
                                                    <div className="h-px flex-grow bg-gray-800" />
                                                    <span className="text-sm font-medium">{item.milestone}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="h-full flex items-center justify-center glass-card p-10 text-center opacity-50">
                                    <div>
                                        <TrendingUp className="w-16 h-16 mx-auto mb-4 text-gray-700" />
                                        <p className="text-xl font-bold">Waiting for input data...</p>
                                        <p className="text-gray-500">Configure your parameters to see the prediction.</p>
                                    </div>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Predictor;

import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Shield, TrendingDown, AlertTriangle, Activity, Database } from 'lucide-react';

const Predictor = () => {
    const [sites, setSites] = useState([]);
    const [selectedSiteId, setSelectedSiteId] = useState('');
    const [predictionData, setPredictionData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch sites for dropdown
    useEffect(() => {
        const fetchSites = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/heritage/sites`);
                const json = await res.json();
                if (json.success) {
                    setSites(json.data);
                    if (json.data.length > 0) setSelectedSiteId(json.data[0]._id);
                }
            } catch (err) {
                console.error("Failed to fetch sites:", err);
            }
        };
        fetchSites();
    }, []);

    const handlePredict = async () => {
        if (!selectedSiteId) return;
        setIsLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/heritage/sites/${selectedSiteId}/predict`);
            const json = await res.json();
            if (json.success) {
                setPredictionData(json.data);
            }
        } catch (err) {
            console.error("Prediction failed:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="predictor" className="py-24 px-4 bg-heritage-navy relative border-t border-heritage-gold/10">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <h2 className="text-4xl font-display font-bold text-white mb-4">
                            Heritage <span className="text-heritage-gold">Integrity Guard</span>
                        </h2>
                        <p className="text-gray-400 max-w-xl">
                            Our AI analyzes decades of historical structural data to simulate site deterioration levels by 2050, helping prioritize preservation efforts.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 bg-white/5 p-2 rounded-xl border border-white/10">
                        <Database size={20} className="text-heritage-gold ml-4" />
                        <span className="text-xs font-future text-gray-400 uppercase tracking-widest mr-4">Live Backend Sync</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Control Panel */}
                    <div className="glass-card p-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-heritage-gold/5 blur-3xl rounded-full -mr-16 -mt-16" />
                        <h3 className="text-xl font-future font-bold text-white mb-8 flex items-center gap-3">
                            <Activity size={20} className="text-heritage-gold" /> Simulation Controls
                        </h3>

                        <div className="space-y-8">
                            <div>
                                <label className="block text-[10px] font-future text-heritage-gold uppercase tracking-[0.2em] mb-4">Select Heritage Site</label>
                                <select
                                    value={selectedSiteId}
                                    onChange={(e) => setSelectedSiteId(e.target.value)}
                                    className="w-full bg-heritage-navy border border-white/10 p-4 rounded-lg text-white font-sans focus:outline-none focus:border-heritage-gold transition-colors"
                                >
                                    {sites.map(site => (
                                        <option key={site._id} value={site._id}>{site.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="p-4 bg-heritage-gold/5 border border-heritage-gold/20 rounded-lg">
                                <p className="text-[10px] text-heritage-gold font-sans leading-relaxed">
                                    <AlertTriangle size={12} className="inline mr-2 mb-1" />
                                    DATA SOURCE: Ethiopian Ministry of Culture & Tourism (Historical Records 1970-2024).
                                    Integrity levels are calculated based on structural erosion and environmental impact reports.
                                </p>
                            </div>

                            <button
                                onClick={handlePredict}
                                disabled={isLoading}
                                className="w-full py-4 bg-heritage-gold text-heritage-navy font-future font-bold uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50 relative overflow-hidden group shadow-xl shadow-heritage-gold/10"
                            >
                                <span className="relative z-10">{isLoading ? "Processing Historical Data..." : "Generate 2050 Projection"}</span>
                                <motion.div
                                    className="absolute inset-0 bg-white"
                                    initial={{ x: '-100%' }}
                                    whileHover={{ x: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Results Display */}
                    <div className="relative min-h-[500px]">
                        <AnimatePresence mode="wait">
                            {predictionData ? (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="glass-card p-6 border-l-4 border-heritage-gold">
                                            <p className="text-[10px] font-future text-gray-500 uppercase mb-1">Target Site</p>
                                            <p className="text-xl font-display font-bold text-white">{predictionData.siteName}</p>
                                        </div>
                                        <div className="glass-card p-6 border-l-4 border-red-500">
                                            <p className="text-[10px] font-future text-gray-500 uppercase mb-1">Primary Risk</p>
                                            <p className="text-xl font-display font-bold text-red-400">{predictionData.riskFactors?.[0]?.factor || 'Low Risk'}</p>
                                        </div>
                                    </div>

                                    {/* Chart */}
                                    <div className="glass-card p-8 h-[300px]">
                                        <h4 className="text-[10px] font-future text-heritage-gold mb-6 uppercase tracking-widest">Structural Integrity Projection (Stability %)</h4>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={[...predictionData.historicalTrend, ...predictionData.futureProjection]}>
                                                <defs>
                                                    <linearGradient id="colorIntegrity" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3} />
                                                        <stop offset="95%" stopColor="#d4af37" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                                <XAxis dataKey="year" stroke="#666" fontSize={10} fontStyle="italic" />
                                                <YAxis stroke="#666" fontSize={10} domain={[0, 100]} />
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#050b1a', border: '1px solid #d4af37', borderRadius: '8px' }}
                                                    itemStyle={{ color: '#d4af37', fontSize: '12px', fontWeight: 'bold' }}
                                                />
                                                <Area type="monotone" dataKey="integrity" stroke="#d4af37" strokeWidth={3} fillOpacity={1} fill="url(#colorIntegrity)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>

                                    <div className="glass-card p-6">
                                        <div className="flex items-center gap-4 mb-4">
                                            <Shield className="text-heritage-gold w-5 h-5" />
                                            <h4 className="text-[10px] font-future text-white uppercase tracking-widest">Recommended Mitigation</h4>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {predictionData.riskFactors.map((risk, idx) => (
                                                <div key={idx} className="p-3 bg-white/5 rounded border border-white/5 flex items-center justify-between">
                                                    <span className="text-xs text-gray-300">{risk.factor} Defense</span>
                                                    <span className={`text-[8px] px-2 py-1 rounded font-future ${risk.severity === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-heritage-gold/20 text-heritage-gold'}`}>
                                                        {risk.severity === 'High' ? 'CRITICAL' : 'ROUTINE'}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="h-full flex items-center justify-center glass-card p-10 text-center relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-heritage-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="relative z-10">
                                        <Activity className="w-16 h-16 mx-auto mb-6 text-heritage-gold/20 animate-pulse" />
                                        <p className="text-xl font-display font-bold text-white mb-2">Simulation Standby</p>
                                        <p className="text-gray-500 text-sm italic">Click the generate button to start the AI analysis engine.</p>
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

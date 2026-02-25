import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Predictor from '../components/Predictor';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield, Globe, Clock, Zap, AlertTriangle, TrendingDown,
    MapPin, Info, ChevronRight, Activity, Wind, CloudRain, Vault, X, Terminal,
    Heart, User, Mail, CheckCircle, DollarSign, CreditCard
} from 'lucide-react';
// Data is now fetched from the API instead of local ethiopianSites data

const RiskFactor = ({ label, value, icon, color }) => (
    <div className="glass-card p-6 border-white/5">
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
                {icon}
                <span className="font-future text-[10px] tracking-widest uppercase text-gray-400">{label}</span>
            </div>
            <span className="font-future text-xs text-white">{value}%</span>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${value}%` }}
                transition={{ duration: 1 }}
                className={`h-full bg-current ${color === 'blue' ? 'text-blue-500' : color === 'amber' ? 'text-amber-500' : 'text-red-500'}`}
                style={{ backgroundColor: 'currentColor' }}
            />
        </div>
    </div>
);

const LogEntry = ({ time, event, status, onClick }) => (
    <div className="flex gap-4 items-start group cursor-pointer" onClick={onClick}>
        <div className="font-future text-[9px] text-gray-600 pt-1">{time}</div>
        <div className="flex-1">
            <div className="text-xs font-sans text-gray-300 group-hover:text-heritage-gold transition-colors">{event}</div>
            <div className="text-[8px] font-future uppercase tracking-widest text-gray-600 mt-1">{status}</div>
        </div>
        <ChevronRight size={12} className="text-gray-700 group-hover:text-heritage-gold shrink-0 mt-1 transition-colors" />
    </div>
);

const Home = () => {
    const [selectedSite, setSelectedSite] = useState(null);
    const [viewMode, setViewMode] = useState('present'); // 'present' or 'future'
    const [vault, setVault] = useState([]);
    const [isVaultOpen, setIsVaultOpen] = useState(false);
    const [selectedLogSite, setSelectedLogSite] = useState(null);
    const [isSentinelOpen, setIsSentinelOpen] = useState(false);
    const [terminalInput, setTerminalInput] = useState('');
    const [isDonateOpen, setIsDonateOpen] = useState(false);
    const [isSentinelSignupOpen, setIsSentinelSignupOpen] = useState(false);
    const [donateAmount, setDonateAmount] = useState(50);
    const [donateCustom, setDonateCustom] = useState('');
    const [donateForm, setDonateForm] = useState({ name: '', email: '', message: '' });
    const [donateSuccess, setDonateSuccess] = useState(false);
    const [sentinelForm, setSentinelForm] = useState({ name: '', email: '', role: '', motivation: '' });
    const [sentinelSuccess, setSentinelSuccess] = useState(false);
    const [sites, setSites] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleDonateSubmit = (e) => {
        e.preventDefault();
        setDonateSuccess(true);
        setTimeout(() => { setDonateSuccess(false); setIsDonateOpen(false); setDonateForm({ name: '', email: '', message: '' }); }, 3000);
    };

    const handleSentinelSubmit = (e) => {
        e.preventDefault();
        setSentinelSuccess(true);
        setTimeout(() => { setSentinelSuccess(false); setIsSentinelSignupOpen(false); setSentinelForm({ name: '', email: '', role: '', motivation: '' }); }, 3000);
    };

    const addToVault = (site) => {
        if (!vault.find(item => item._id === site._id)) {
            setVault([...vault, site]);
        }
        setIsVaultOpen(true);
    };

    const removeFromVault = (id) => {
        setVault(vault.filter(item => item._id !== id));
    };

    const handleLogClick = (log) => {
        // Extract the site name from the log event (format: "SiteName: ...") 
        const siteName = log.event.split(':')[0].trim().toLowerCase();
        const matched = sites.find(site =>
            site.name.toLowerCase().includes(siteName) ||
            siteName.includes(site.name.toLowerCase().split(' ')[0])
        );
        if (matched) setSelectedLogSite(matched);
    };

    const [metrics, setMetrics] = useState([]);
    const [logsData, setLogsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [metricsRes, logsRes, sitesRes] = await Promise.all([
                    fetch('http://localhost:5000/api/v1/heritage/metrics'),
                    fetch('http://localhost:5000/api/v1/heritage/logs'),
                    fetch('http://localhost:5000/api/v1/heritage/sites')
                ]);
                const metricsJson = await metricsRes.json();
                const logsJson = await logsRes.json();
                const sitesJson = await sitesRes.json();

                if (metricsJson.success) setMetrics(metricsJson.data);
                if (logsJson.success) setLogsData(logsJson.data);
                if (sitesJson.success) setSites(sitesJson.data);
            } catch (err) {
                console.error("Dashboard sync failed:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getMetricValue = (type) => metrics.find(m => m.type === type)?.value || 0;

    return (
        <div className="bg-heritage-navy min-h-screen text-gray-200 font-sans overflow-x-hidden">
            <Hero />

            {/* 2. Historical Sites Gallery */}
            <section id="gallery" className="py-24 px-4 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="space-y-4">
                            <span className="font-future text-heritage-gold text-xs tracking-[0.4em] uppercase">Historical Repository</span>
                            <h2 className="text-4xl md:text-6xl font-display font-bold text-white">
                                Ancient <span className="text-heritage-gold italic">Foundations</span>
                            </h2>
                        </div>
                        <div className="flex flex-col items-end gap-4">
                            <div className="flex items-center gap-4 bg-white/5 p-2 border border-white/10 rounded-full">
                                <button
                                    onClick={() => setViewMode('present')}
                                    className={`px-6 py-2 rounded-full font-future text-[10px] tracking-widest uppercase transition-all ${viewMode === 'present' ? 'bg-heritage-gold text-heritage-navy shadow-lg shadow-heritage-gold/20' : 'text-gray-400 hover:text-white'}`}
                                >
                                    Present
                                </button>
                                <button
                                    onClick={() => setViewMode('future')}
                                    className={`px-6 py-2 rounded-full font-future text-[10px] tracking-widest uppercase transition-all ${viewMode === 'future' ? 'bg-heritage-gold text-heritage-navy shadow-lg shadow-heritage-gold/20' : 'text-gray-400 hover:text-white'}`}
                                >
                                    2050 Simulation
                                </button>
                            </div>
                            <p className="max-w-sm text-right text-gray-500 font-sans italic text-sm border-r-2 border-heritage-gold/30 pr-6">
                                "The past is our foundation, the future is our responsibility."
                            </p>
                        </div>
                    </div>

                    <div className="flex overflow-x-auto pb-12 gap-8 snap-x snap-mandatory scrollbar-hide no-scrollbar">
                        {sites.map((site) => (
                            <motion.div
                                key={site._id}
                                whileHover={{ y: -10 }}
                                onClick={() => setSelectedSite(site)}
                                className="flex-none w-[300px] md:w-[380px] snap-center glass-card group cursor-pointer overflow-hidden border border-white/5 hover:border-heritage-gold/50 transition-all duration-500"
                            >
                                <div className="aspect-[4/5] relative overflow-hidden">
                                    <img
                                        src={site.image}
                                        alt={site.name}
                                        className={`w-full h-full object-cover transition-all duration-1000 scale-110 group-hover:scale-100 ${viewMode === 'future' ? 'sepia-[0.3] contrast-125 saturate-125 brightness-110' : 'grayscale group-hover:grayscale-0'}`}
                                    />
                                    {viewMode === 'future' && (
                                        <div className="absolute inset-0 bg-heritage-gold/10 animate-pulse pointer-events-none" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-heritage-navy via-transparent to-transparent opacity-80" />
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="flex items-center gap-2 text-heritage-gold mb-1">
                                            {viewMode === 'future' ? <Zap size={10} className="animate-pulse" /> : <MapPin size={12} />}
                                            <span className="text-[10px] uppercase tracking-widest font-future">
                                                {viewMode === 'future' ? 'SCANNING COORDINATES...' : site.location.split(',')[0]}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-display font-bold text-white mb-4">{site.name}</h3>
                                        <div className="flex flex-col gap-3">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setSelectedSite(site); setViewMode('present'); }}
                                                className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-future text-gray-400 hover:text-white transition-all"
                                            >
                                                History <ChevronRight size={14} />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedSite(site);
                                                    setViewMode('future');
                                                    setTimeout(() => {
                                                        document.getElementById('detail-view')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                    }, 100);
                                                }}
                                                className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-future text-heritage-gold hover:gap-4 transition-all"
                                            >
                                                See in 2050 <Zap size={10} />
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); addToVault(site); }}
                                                className="mt-2 w-full py-2 bg-heritage-gold/10 border border-heritage-gold/30 text-heritage-gold font-future text-[8px] uppercase tracking-widest hover:bg-heritage-gold hover:text-heritage-navy transition-all flex items-center justify-center gap-2"
                                            >
                                                <Vault size={10} /> Add to Vault
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Predictor />

            {/* 3. Detail & 2050 Future Projection */}
            <AnimatePresence>
                {selectedSite && (
                    <motion.section
                        id="detail-view"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="py-24 bg-black/40 border-y border-heritage-gold/10 overflow-hidden"
                    >
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="grid lg:grid-cols-2 gap-16 items-start">
                                {/* Left: Info & Visuals */}
                                <div className="space-y-12">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-4">
                                                {selectedSite.name}
                                            </h2>
                                            <p className="flex items-center gap-3 text-heritage-gold/80 font-future text-xs tracking-widest uppercase">
                                                <Globe size={14} /> {selectedSite.unescoStatus}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setSelectedSite(null)}
                                            className="text-gray-500 hover:text-white transition-colors"
                                        >
                                            ✕ Close
                                        </button>
                                    </div>

                                    <div className="glass-card p-8 border-heritage-gold/20">
                                        <div className="flex border-b border-white/10 mb-8">
                                            <button
                                                onClick={() => setViewMode('present')}
                                                className={`pb-4 px-6 font-future text-xs tracking-widest uppercase transition-all ${viewMode === 'present' ? 'text-heritage-gold border-b-2 border-heritage-gold' : 'text-gray-500 hover:text-white'}`}
                                            >
                                                History & Significance
                                            </button>
                                            <button
                                                onClick={() => setViewMode('future')}
                                                className={`pb-4 px-6 font-future text-xs tracking-widest uppercase transition-all ${viewMode === 'future' ? 'text-heritage-gold border-b-2 border-heritage-gold' : 'text-gray-500 hover:text-white'}`}
                                            >
                                                2050 Vision
                                            </button>
                                        </div>

                                        <div className="min-h-[300px]">
                                            {viewMode === 'present' ? (
                                                <motion.div
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    className="space-y-6"
                                                >
                                                    <p className="text-xl text-gray-300 font-sans leading-relaxed">
                                                        {selectedSite.description}
                                                    </p>
                                                    <div className="space-y-4 pt-4">
                                                        <h4 className="text-heritage-gold font-future text-xs tracking-widest uppercase">Historical Context</h4>
                                                        <p className="text-gray-400 italic font-sans">{selectedSite.history}</p>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                                                        <div>
                                                            <div className="text-3xl font-display font-bold text-white mb-1">850k+</div>
                                                            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-future">Annual Visitors</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-3xl font-display font-bold text-white mb-1">#1</div>
                                                            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-future">Preservation Rank</div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    className="space-y-8"
                                                >
                                                    <div className="grid gap-6">
                                                        <div className="glass-card p-6 border-l-4 border-heritage-gold bg-heritage-gold/5">
                                                            <div className="flex items-center gap-3 text-heritage-gold mb-3">
                                                                <Zap size={18} />
                                                                <h4 className="font-future font-bold tracking-widest text-xs uppercase">AI Preservation</h4>
                                                            </div>
                                                            <p className="text-gray-300 text-sm leading-relaxed">{selectedSite.future2050.preservation}</p>
                                                        </div>
                                                        <div className="glass-card p-6 border-l-4 border-heritage-gold bg-heritage-gold/5">
                                                            <div className="flex items-center gap-3 text-heritage-gold mb-3">
                                                                <Activity size={18} />
                                                                <h4 className="font-future font-bold tracking-widest text-xs uppercase">Climate Resilience</h4>
                                                            </div>
                                                            <p className="text-gray-300 text-sm leading-relaxed">{selectedSite.future2050.impact}</p>
                                                        </div>
                                                        <div className="glass-card p-6 border-l-4 border-heritage-gold bg-heritage-gold/5">
                                                            <div className="flex items-center gap-3 text-heritage-gold mb-3">
                                                                <Globe size={18} />
                                                                <h4 className="font-future font-bold tracking-widest text-xs uppercase">Digital VR Experience</h4>
                                                            </div>
                                                            <p className="text-gray-300 text-sm leading-relaxed">{selectedSite.future2050.tourism}</p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Simulation Visual */}
                                <div className="sticky top-24">
                                    <div className="relative aspect-square glass-card overflow-hidden p-2 group">
                                        <div className="absolute inset-0 bg-heritage-gold/10 animate-pulse opacity-20 pointer-events-none" />
                                        <div className="relative w-full h-full overflow-hidden">
                                            <img
                                                src={selectedSite.image}
                                                className={`w-full h-full object-cover transition-all duration-1000 ${viewMode === 'future' ? 'sepia-[0.5] contrast-125 saturate-150 brightness-110' : 'grayscale'}`}
                                                alt="Simulation"
                                            />
                                            {viewMode === 'future' && (
                                                <div className="absolute inset-0">
                                                    <div className="absolute top-10 left-10 w-32 h-32 border-t-2 border-l-2 border-heritage-gold opacity-50" />
                                                    <div className="absolute bottom-10 right-10 w-32 h-32 border-b-2 border-r-2 border-heritage-gold opacity-50" />
                                                    <div className="absolute top-1/2 left-0 w-full h-px bg-heritage-gold/30 animate-scan" />
                                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1)_0%,transparent_70%)]" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center bg-black/60 backdrop-blur-md p-4 border border-white/10">
                                            <div className="flex items-center gap-4">
                                                <div className="w-3 h-3 rounded-full bg-heritage-gold animate-ping" />
                                                <span className="font-future text-[10px] tracking-[0.3em] uppercase">{viewMode === 'future' ? '2050 Simulation Active' : 'Present Day Feed'}</span>
                                            </div>
                                            <div className="font-future text-xs text-heritage-gold">
                                                {viewMode === 'future' ? 'LAT: 11.601° N | LON: 39.041° E' : 'SIGNAL: STABLE'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* 4. Heritage Risk Dashboard */}
            <section id="dashboard" className="py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16 space-y-4">
                        <span className="font-future text-heritage-gold text-xs tracking-[0.4em] uppercase">Intelligence Monitor</span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold">Heritage <span className="text-heritage-gold">Risk Dashboard</span></h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Column 1: Indicators */}
                        <div className="space-y-8">
                            <RiskFactor label="Climate Risk Level" value={getMetricValue('climate_risk')} icon={<CloudRain className="text-blue-400" />} color="blue" />
                            <RiskFactor label="Urbanization Impact" value={getMetricValue('urbanization_impact')} icon={<AlertTriangle className="text-amber-400" />} color="amber" />
                            <RiskFactor label="Tourism Pressure" value={getMetricValue('tourism_pressure')} icon={<Activity className="text-red-400" />} color="red" />
                        </div>

                        {/* Column 2: Chart (Dynamic Progress) */}
                        <div className="glass-card p-10 flex flex-col min-h-[400px]">
                            <h4 className="font-future text-xs tracking-widest uppercase mb-10">Digital Preservation Progress</h4>
                            <div className="flex-1 flex items-end gap-2 md:gap-4 pb-2">
                                {metrics.filter(m => m.type === 'preservation_progress').sort((a, b) => a.year - b.year).map((m, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-4 group h-full justify-end">
                                        <div className="relative w-full flex flex-col justify-end h-full">
                                            <motion.div
                                                initial={{ height: 0 }}
                                                whileInView={{ height: `${m.value}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
                                                className="w-full bg-heritage-gold/30 hover:bg-heritage-gold/50 border-t-2 border-heritage-gold transition-colors relative"
                                            >
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-future opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-heritage-gold">{m.value}%</div>
                                            </motion.div>
                                        </div>
                                        <span className="font-future text-[8px] tracking-tighter text-gray-500 uppercase">{m.year}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 flex items-center gap-4 text-xs font-future text-heritage-gold/60">
                                <TrendingDown size={14} className="rotate-180 text-green-500" />
                                <span>+12.4% Integrity Growth YoY</span>
                            </div>
                        </div>

                        {/* Column 3: Event Stream */}
                        <div className="glass-card p-10 bg-white/5 border border-white/10">
                            <h4 className="font-future text-xs tracking-widest uppercase mb-10 border-b border-white/5 pb-4 flex justify-between items-center">
                                Preservation Logs
                                <div className="flex gap-1">
                                    <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
                                    <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                                </div>
                            </h4>
                            <div className="space-y-6">
                                {logsData.map((log, idx) => (
                                    <LogEntry key={idx} time={log.time} event={log.event} status={log.status} onClick={() => handleLogClick(log)} />
                                ))}
                                {logsData.length === 0 && <p className="text-[10px] font-future text-gray-600 uppercase tracking-widest">Awaiting sensor data...</p>}
                            </div>
                            <button
                                onClick={() => setIsSentinelOpen(true)}
                                className="w-full mt-6 py-4 border border-heritage-gold/20 font-future text-[10px] tracking-widest uppercase hover:bg-heritage-gold/10 transition-all flex items-center justify-center gap-2"
                            >
                                <Terminal size={12} /> Open Sentinel Terminal
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-40 bg-heritage-gold/5 flex flex-col items-center text-center px-4">
                <Shield className="w-16 h-16 text-heritage-gold mb-12 animate-pulse" />
                <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 max-w-3xl">
                    Our Past Deserves <br />
                    <span className="text-heritage-gold italic">A Permanent Future.</span>
                </h2>
                <div className="flex flex-col sm:flex-row gap-6">
                    <motion.button
                        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        onClick={() => { setIsDonateOpen(true); setDonateSuccess(false); }}
                        className="px-12 py-5 bg-heritage-gold text-heritage-navy font-future font-bold text-xs uppercase tracking-[0.3em] hover:brightness-110 transition-all flex items-center gap-3"
                    >
                        <Heart size={14} /> Donate to Preservation
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        onClick={() => { setIsSentinelSignupOpen(true); setSentinelSuccess(false); }}
                        className="px-12 py-5 border border-heritage-gold text-heritage-gold font-future font-bold text-xs uppercase tracking-[0.3em] hover:bg-heritage-gold hover:text-heritage-navy transition-all flex items-center gap-3"
                    >
                        <Shield size={14} /> Become a Sentinel
                    </motion.button>
                </div>
            </section>

            {/* ── Donate to Preservation Modal ── */}
            <AnimatePresence>
                {isDonateOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsDonateOpen(false)}
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" />
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 30, scale: 0.96 }}
                            transition={{ type: 'spring', damping: 24, stiffness: 200 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-lg z-50 bg-heritage-navy border border-heritage-gold/20 shadow-2xl overflow-hidden"
                        >
                            {donateSuccess ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 px-8 text-center gap-6">
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
                                        <CheckCircle className="w-16 h-16 text-green-400" />
                                    </motion.div>
                                    <h3 className="text-2xl font-display font-bold text-white">Thank You, Guardian.</h3>
                                    <p className="text-gray-400 font-future text-[10px] tracking-widest uppercase">Your contribution secures Ethiopia's heritage for future generations.</p>
                                </motion.div>
                            ) : (
                                <>
                                    {/* Header */}
                                    <div className="relative h-28 bg-gradient-to-br from-heritage-gold/20 to-heritage-navy flex items-end p-6 border-b border-heritage-gold/10">
                                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.15),transparent)]" />
                                        <div className="flex-1">
                                            <p className="font-future text-[9px] tracking-[0.4em] uppercase text-heritage-gold/70 mb-1">Heritage Conservation Fund</p>
                                            <h3 className="text-2xl font-display font-bold text-white">Donate to Preservation</h3>
                                        </div>
                                        <button onClick={() => setIsDonateOpen(false)} className="text-gray-500 hover:text-white transition-colors"><X size={18} /></button>
                                    </div>

                                    {/* Body */}
                                    <form onSubmit={handleDonateSubmit} className="p-8 space-y-6">
                                        {/* Amount selector */}
                                        <div>
                                            <label className="block font-future text-[9px] uppercase tracking-widest text-heritage-gold mb-3"><DollarSign size={10} className="inline mr-1" />Select Amount (USD)</label>
                                            <div className="grid grid-cols-4 gap-2 mb-3">
                                                {[10, 25, 50, 100].map(amt => (
                                                    <button type="button" key={amt}
                                                        onClick={() => { setDonateAmount(amt); setDonateCustom(''); }}
                                                        className={`py-3 font-future text-xs uppercase tracking-wider border transition-all ${donateAmount === amt && !donateCustom
                                                            ? 'bg-heritage-gold text-heritage-navy border-heritage-gold'
                                                            : 'border-white/10 text-gray-400 hover:border-heritage-gold/40 hover:text-white'
                                                            }`}
                                                    >${amt}</button>
                                                ))}
                                            </div>
                                            <input
                                                type="number" min="1" placeholder="Custom amount..."
                                                value={donateCustom}
                                                onChange={e => { setDonateCustom(e.target.value); setDonateAmount(null); }}
                                                className="w-full bg-white/5 border border-white/10 focus:border-heritage-gold/40 px-4 py-3 text-sm text-white outline-none font-future placeholder:text-gray-600 transition-colors"
                                            />
                                        </div>

                                        {/* Name & Email */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block font-future text-[9px] uppercase tracking-widest text-gray-500 mb-2"><User size={9} className="inline mr-1" />Full Name</label>
                                                <input required value={donateForm.name} onChange={e => setDonateForm({ ...donateForm, name: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 focus:border-heritage-gold/40 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 transition-colors"
                                                    placeholder="Your name" />
                                            </div>
                                            <div>
                                                <label className="block font-future text-[9px] uppercase tracking-widest text-gray-500 mb-2"><Mail size={9} className="inline mr-1" />Email</label>
                                                <input required type="email" value={donateForm.email} onChange={e => setDonateForm({ ...donateForm, email: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 focus:border-heritage-gold/40 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 transition-colors"
                                                    placeholder="you@email.com" />
                                            </div>
                                        </div>

                                        {/* Optional message */}
                                        <div>
                                            <label className="block font-future text-[9px] uppercase tracking-widest text-gray-500 mb-2">Message (optional)</label>
                                            <textarea rows={2} value={donateForm.message} onChange={e => setDonateForm({ ...donateForm, message: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 focus:border-heritage-gold/40 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 transition-colors resize-none"
                                                placeholder="Why this cause matters to you..." />
                                        </div>

                                        {/* Summary + submit */}
                                        <div className="flex items-center justify-between pt-2">
                                            <div className="text-heritage-gold">
                                                <span className="font-future text-[9px] uppercase tracking-widest text-gray-500">Total: </span>
                                                <span className="font-display text-2xl font-bold">${donateCustom || donateAmount || 0}</span>
                                            </div>
                                            <motion.button
                                                whileTap={{ scale: 0.95 }} type="submit"
                                                className="px-10 py-4 bg-heritage-gold text-heritage-navy font-future font-bold text-[10px] uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-2"
                                            >
                                                <CreditCard size={13} /> Confirm Donation
                                            </motion.button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* ── Become a Sentinel Modal ── */}
            <AnimatePresence>
                {isSentinelSignupOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsSentinelSignupOpen(false)}
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" />
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 30, scale: 0.96 }}
                            transition={{ type: 'spring', damping: 24, stiffness: 200 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-lg z-50 bg-heritage-navy border border-heritage-gold/20 shadow-2xl overflow-hidden"
                        >
                            {sentinelSuccess ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 px-8 text-center gap-6">
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
                                        <Shield className="w-16 h-16 text-heritage-gold" />
                                    </motion.div>
                                    <h3 className="text-2xl font-display font-bold text-white">Welcome, Sentinel.</h3>
                                    <p className="text-gray-400 font-future text-[10px] tracking-widest uppercase">Your mission begins. Protecting Ethiopia's heritage across time.</p>
                                    <div className="w-px h-8 bg-heritage-gold/30" />
                                    <p className="font-future text-[9px] tracking-[0.3em] text-heritage-gold/60 uppercase">Access granted — sentinel@vault</p>
                                </motion.div>
                            ) : (
                                <>
                                    {/* Header */}
                                    <div className="relative h-28 bg-gradient-to-br from-white/5 to-heritage-navy flex items-end p-6 border-b border-heritage-gold/10">
                                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.08),transparent)]" />
                                        <div className="flex-1">
                                            <p className="font-future text-[9px] tracking-[0.4em] uppercase text-heritage-gold/70 mb-1">Guardian Program — Ethiopia 2050</p>
                                            <h3 className="text-2xl font-display font-bold text-white">Become a Sentinel</h3>
                                        </div>
                                        <button onClick={() => setIsSentinelSignupOpen(false)} className="text-gray-500 hover:text-white transition-colors"><X size={18} /></button>
                                    </div>

                                    {/* Body */}
                                    <form onSubmit={handleSentinelSubmit} className="p-8 space-y-5">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block font-future text-[9px] uppercase tracking-widest text-gray-500 mb-2"><User size={9} className="inline mr-1" />Full Name</label>
                                                <input required value={sentinelForm.name} onChange={e => setSentinelForm({ ...sentinelForm, name: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 focus:border-heritage-gold/40 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 transition-colors"
                                                    placeholder="Your name" />
                                            </div>
                                            <div>
                                                <label className="block font-future text-[9px] uppercase tracking-widest text-gray-500 mb-2"><Mail size={9} className="inline mr-1" />Email</label>
                                                <input required type="email" value={sentinelForm.email} onChange={e => setSentinelForm({ ...sentinelForm, email: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 focus:border-heritage-gold/40 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 transition-colors"
                                                    placeholder="you@email.com" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block font-future text-[9px] uppercase tracking-widest text-gray-500 mb-2">Guardian Role</label>
                                            <select required value={sentinelForm.role} onChange={e => setSentinelForm({ ...sentinelForm, role: e.target.value })}
                                                className="w-full bg-heritage-navy border border-white/10 focus:border-heritage-gold/40 px-4 py-3 text-sm text-white outline-none transition-colors appearance-none cursor-pointer"
                                            >
                                                <option value="" disabled>Select your expertise...</option>
                                                <option value="archaeologist">Archaeologist</option>
                                                <option value="conservator">Conservation Specialist</option>
                                                <option value="technologist">Heritage Technologist</option>
                                                <option value="educator">Cultural Educator</option>
                                                <option value="donor">Philanthropic Supporter</option>
                                                <option value="volunteer">Community Volunteer</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block font-future text-[9px] uppercase tracking-widest text-gray-500 mb-2">Why do you want to protect Ethiopia's heritage?</label>
                                            <textarea required rows={3} value={sentinelForm.motivation} onChange={e => setSentinelForm({ ...sentinelForm, motivation: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 focus:border-heritage-gold/40 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 transition-colors resize-none"
                                                placeholder="Share your motivation..." />
                                        </div>

                                        <div className="pt-2">
                                            <motion.button
                                                whileTap={{ scale: 0.95 }} type="submit"
                                                className="w-full py-4 border border-heritage-gold text-heritage-gold font-future font-bold text-[10px] uppercase tracking-widest hover:bg-heritage-gold hover:text-heritage-navy transition-all flex items-center justify-center gap-2"
                                            >
                                                <Shield size={13} /> Activate Sentinel Status
                                            </motion.button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* ── Sentinel Terminal Modal ── */}
            <AnimatePresence>
                {isSentinelOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex flex-col font-mono"
                    >
                        {/* Terminal title bar */}
                        <div className="flex items-center justify-between px-6 py-3 border-b border-heritage-gold/20 bg-black shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-2">
                                    <button onClick={() => setIsSentinelOpen(false)} className="w-3 h-3 rounded-full bg-red-500 hover:brightness-125 transition-all" />
                                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <span className="text-heritage-gold/70 text-[10px] tracking-[0.3em] uppercase ml-2">sentinel-terminal — heritage-vault v2050</span>
                            </div>
                            <button onClick={() => setIsSentinelOpen(false)} className="text-gray-600 hover:text-white transition-colors">
                                <X size={16} />
                            </button>
                        </div>

                        {/* Terminal body */}
                        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-2 scrollbar-thin scrollbar-thumb-heritage-gold/20">
                            {/* Boot header */}
                            <div className="text-heritage-gold text-[11px] tracking-widest mb-4 space-y-1">
                                <p>HERITAGE VAULT SENTINEL SYSTEM v2050.3.1</p>
                                <p>ETHIOPIA NATIONAL HERITAGE INTELLIGENCE NETWORK</p>
                                <p className="text-gray-600">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
                                <p className="text-green-400">[ OK ] Neural sync complete. 12 sites online.</p>
                                <p className="text-green-400">[ OK ] Sensor mesh: 247 nodes active.</p>
                                <p className="text-amber-400">[ !! ] 2 anomalies flagged for review.</p>
                                <p className="text-gray-600">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
                            </div>

                            {/* All log entries streamed */}
                            {logsData.map((log, idx) => {
                                const statusColor =
                                    ['verified', 'success'].includes(log.status.toLowerCase())
                                        ? 'text-green-400'
                                        : ['warning', 'alert'].includes(log.status.toLowerCase())
                                            ? log.status.toLowerCase() === 'alert' ? 'text-red-400' : 'text-amber-400'
                                            : 'text-cyan-400';
                                const prefix =
                                    ['verified', 'success'].includes(log.status.toLowerCase()) ? '[ OK ]'
                                        : log.status.toLowerCase() === 'alert' ? '[ !! ]'
                                            : log.status.toLowerCase() === 'warning' ? '[ WN ]'
                                                : '[ -- ]';
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.06, duration: 0.25 }}
                                        className="flex items-start gap-4 text-[11px] leading-relaxed group hover:bg-white/5 px-2 py-1 rounded cursor-pointer"
                                        onClick={() => { setIsSentinelOpen(false); handleLogClick(log); }}
                                    >
                                        <span className="text-gray-600 shrink-0 w-16">{log.time}</span>
                                        <span className={`shrink-0 font-bold ${statusColor}`}>{prefix}</span>
                                        <span className="text-gray-300 group-hover:text-white transition-colors flex-1">{log.event}</span>
                                        <span className={`shrink-0 uppercase tracking-widest text-[9px] ${statusColor}`}>{log.status}</span>
                                    </motion.div>
                                );
                            })}

                            {logsData.length === 0 && (
                                <p className="text-gray-600 text-[11px]">Awaiting telemetry feed...</p>
                            )}

                            {/* Separator */}
                            <p className="text-gray-700 text-[11px] pt-4">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
                            <p className="text-heritage-gold/50 text-[11px]">END OF LOG STREAM — {logsData.length} entries loaded.</p>
                        </div>

                        {/* Terminal input prompt */}
                        <div className="border-t border-heritage-gold/20 px-6 py-4 flex items-center gap-3 bg-black shrink-0">
                            <span className="text-heritage-gold text-[11px] font-bold shrink-0">sentinel@vault:~$</span>
                            <input
                                autoFocus
                                value={terminalInput}
                                onChange={e => setTerminalInput(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        setTerminalInput('');
                                    }
                                    if (e.key === 'Escape') {
                                        setIsSentinelOpen(false);
                                    }
                                }}
                                placeholder="type 'help' for commands, ESC to close..."
                                className="flex-1 bg-transparent text-green-400 text-[11px] outline-none placeholder:text-gray-700 caret-heritage-gold"
                            />
                            <motion.span
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                                className="text-heritage-gold text-sm"
                            >▋</motion.span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Log Site Detail Modal */}
            <AnimatePresence>
                {selectedLogSite && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedLogSite(null)}
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-2xl z-50 bg-heritage-navy border border-heritage-gold/20 shadow-2xl overflow-hidden"
                        >
                            {/* Top image strip */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={selectedLogSite.image}
                                    alt={selectedLogSite.name}
                                    className="w-full h-full object-cover grayscale brightness-50"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-heritage-navy via-heritage-navy/40 to-transparent" />
                                {/* Scan line animation */}
                                <motion.div
                                    initial={{ top: 0 }}
                                    animate={{ top: '100%' }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                    className="absolute left-0 w-full h-px bg-heritage-gold/40"
                                />
                                <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end">
                                    <div>
                                        <p className="font-future text-[9px] tracking-[0.4em] uppercase text-heritage-gold/70 mb-1">
                                            <MapPin size={8} className="inline mr-1" />
                                            {selectedLogSite.location}
                                        </p>
                                        <h3 className="text-3xl font-display font-bold text-white">{selectedLogSite.name}</h3>
                                    </div>
                                    <button
                                        onClick={() => setSelectedLogSite(null)}
                                        className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 font-future text-[9px] uppercase tracking-widest"
                                    >
                                        <X size={14} /> Close
                                    </button>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-8 space-y-6">
                                {/* UNESCO badge */}
                                <div className="flex items-center gap-2 text-heritage-gold/80">
                                    <Globe size={12} />
                                    <span className="font-future text-[9px] uppercase tracking-widest">{selectedLogSite.unescoStatus}</span>
                                </div>

                                {/* Description */}
                                <p className="text-gray-300 font-sans text-sm leading-relaxed">
                                    {selectedLogSite.description}
                                </p>

                                {/* Divider */}
                                <div className="border-t border-white/5 pt-4">
                                    <h4 className="font-future text-[9px] uppercase tracking-widest text-heritage-gold mb-3">
                                        <Clock size={10} className="inline mr-2" />
                                        Historical Context
                                    </h4>
                                    <p className="text-gray-400 italic font-sans text-sm leading-relaxed">
                                        {selectedLogSite.history}
                                    </p>
                                </div>

                                {/* 2050 Preservation Highlight */}
                                <div className="glass-card p-5 border-l-4 border-heritage-gold bg-heritage-gold/5">
                                    <div className="flex items-center gap-2 text-heritage-gold mb-2">
                                        <Zap size={12} />
                                        <span className="font-future text-[9px] uppercase tracking-widest">2050 Preservation Plan</span>
                                    </div>
                                    <p className="text-gray-300 text-xs leading-relaxed">{selectedLogSite.future2050.preservation}</p>
                                </div>

                                {/* Action buttons */}
                                <div className="flex gap-3 pt-2">
                                    <button
                                        onClick={() => { setSelectedLogSite(null); setSelectedSite(selectedLogSite); setViewMode('present'); document.getElementById('detail-view')?.scrollIntoView({ behavior: 'smooth' }); }}
                                        className="flex-1 py-3 border border-heritage-gold/30 text-heritage-gold font-future text-[9px] uppercase tracking-widest hover:bg-heritage-gold/10 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Info size={12} /> Full Profile
                                    </button>
                                    <button
                                        onClick={() => { setSelectedLogSite(null); addToVault(selectedLogSite); }}
                                        className="flex-1 py-3 bg-heritage-gold/10 border border-heritage-gold/30 text-heritage-gold font-future text-[9px] uppercase tracking-widest hover:bg-heritage-gold hover:text-heritage-navy transition-all flex items-center justify-center gap-2"
                                    >
                                        <Vault size={12} /> Add to Vault
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Vault Sidebar (Cart) */}
            <AnimatePresence>
                {isVaultOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsVaultOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 w-full md:w-[400px] h-full bg-heritage-navy border-l border-heritage-gold/20 shadow-2xl z-50 flex flex-col"
                        >
                            <div className="p-8 border-b border-heritage-gold/10 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <Shield className="text-heritage-gold" />
                                    <div>
                                        <h3 className="text-xl font-display font-bold text-white uppercase leading-tight">Digital Vault</h3>
                                        <p className="text-[10px] font-future tracking-widest text-heritage-gold/60 uppercase">Archived Preservations</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsVaultOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 space-y-6">
                                {vault.length === 0 ? (
                                    <div className="h-40 flex flex-col items-center justify-center text-center opacity-30 grayscale">
                                        <Clock size={40} className="mb-4" />
                                        <p className="font-future text-[10px] uppercase tracking-widest">Your vault is empty</p>
                                    </div>
                                ) : (
                                    vault.map(item => (
                                        <div key={item._id} className="flex gap-4 group">
                                            <div className="w-20 h-20 bg-white/5 rounded-sm overflow-hidden shrink-0 border border-white/10">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-center">
                                                <h4 className="text-sm font-display font-bold text-white mb-1 uppercase">{item.name}</h4>
                                                <p className="text-[8px] font-future text-heritage-gold/60 uppercase tracking-widest">{item.location && item.location.split(',')[0]}</p>
                                                <button
                                                    onClick={() => removeFromVault(item._id)}
                                                    className="mt-2 text-[8px] font-future text-red-500/50 hover:text-red-500 uppercase tracking-widest w-fit"
                                                >
                                                    Remove from archive
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="p-8 border-t border-heritage-gold/10 bg-white/5">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-[10px] font-future text-gray-500 uppercase tracking-widest">Total Items</span>
                                    <span className="text-xl font-display font-bold text-heritage-gold">{vault.length}</span>
                                </div>
                                <button className="w-full py-5 bg-heritage-gold text-heritage-navy font-future font-bold text-xs uppercase tracking-[0.3em] hover:brightness-110 shadow-lg shadow-heritage-gold/20 transition-all">
                                    Process Archival Download
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Floating Vault Trigger */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsVaultOpen(true)}
                className="fixed bottom-10 right-10 w-16 h-16 bg-heritage-gold text-heritage-navy rounded-full flex items-center justify-center shadow-2xl z-40 group"
            >
                <Shield className="group-hover:rotate-12 transition-transform" />
                {vault.length > 0 && (
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-white text-heritage-navy text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-heritage-navy">
                        {vault.length}
                    </span>
                )}
            </motion.button>

        </div>
    );
};

export default Home;

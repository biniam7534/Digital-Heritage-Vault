import React, { useState } from 'react';
import Hero from '../components/Hero';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield, Globe, Clock, Zap, AlertTriangle, TrendingDown,
    MapPin, Info, ChevronRight, Activity, Wind, CloudRain, Vault, X
} from 'lucide-react';
import { ethiopianSites } from '../data/ethiopianSites';

const Home = () => {
    const [selectedSite, setSelectedSite] = useState(null);
    const [viewMode, setViewMode] = useState('present'); // 'present' or 'future'
    const [vault, setVault] = useState([]);
    const [isVaultOpen, setIsVaultOpen] = useState(false);

    const addToVault = (site) => {
        if (!vault.find(item => item.id === site.id)) {
            setVault([...vault, site]);
        }
        setIsVaultOpen(true);
    };

    const removeFromVault = (id) => {
        setVault(vault.filter(item => item.id !== id));
    };

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
                        {ethiopianSites.map((site) => (
                            <motion.div
                                key={site.id}
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
                            <RiskFactor label="Climate Risk Level" value={68} icon={<CloudRain className="text-blue-400" />} color="blue" />
                            <RiskFactor label="Urbanization Impact" value={42} icon={<AlertTriangle className="text-amber-400" />} color="amber" />
                            <RiskFactor label="Tourism Pressure" value={89} icon={<Activity className="text-red-400" />} color="red" />
                        </div>

                        {/* Column 2: Chart (CSS Animation) */}
                        <div className="glass-card p-10 flex flex-col justify-between min-h-[400px]">
                            <h4 className="font-future text-xs tracking-widest uppercase mb-10">Digital Preservation Progress</h4>
                            <div className="flex-1 flex items-end gap-4 h-full">
                                {[35, 48, 62, 58, 75, 82, 94].map((h, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${h}%` }}
                                            transition={{ duration: 1.5, delay: i * 0.1 }}
                                            className="w-full bg-heritage-gold/20 group-hover:bg-heritage-gold/40 border-t-2 border-heritage-gold transition-all relative"
                                        >
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-future opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{h}%</div>
                                        </motion.div>
                                        <span className="font-future text-[8px] tracking-tighter text-gray-500 uppercase">{2018 + i}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-10 flex items-center gap-4 text-xs font-future text-heritage-gold/60">
                                <TrendingDown size={14} />
                                <span>+12.4% Integrity Growth YoY</span>
                            </div>
                        </div>

                        {/* Column 3: Live Feed */}
                        <div className="glass-card p-8 space-y-8">
                            <h4 className="font-future text-xs tracking-widest uppercase border-b border-white/10 pb-4">Live preservation Logs</h4>
                            <div className="space-y-6">
                                <LogEntry time="02:14:55" event="Lalibela: Structural Scan Complete" status="Verified" />
                                <LogEntry time="01:45:12" event="Axum: Atmospheric Adjust Opt" status="Active" />
                                <LogEntry time="23:12:08" event="Fasil: Drone Swarm Replenish" status="Maintenance" />
                                <LogEntry time="22:30:45" event="Harar: Ground Moisture Alert" status="Warning" />
                            </div>
                            <button className="w-full py-4 border border-heritage-gold/20 font-future text-[10px] tracking-widest uppercase hover:bg-heritage-gold/10 transition-all">
                                Open Sentinel Terminal
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
                    <button className="px-12 py-5 bg-heritage-gold text-heritage-navy font-future font-bold text-xs uppercase tracking-[0.3em] hover:brightness-110 transition-all">
                        Donate to Preservation
                    </button>
                    <button className="px-12 py-5 border border-heritage-gold text-heritage-gold font-future font-bold text-xs uppercase tracking-[0.3em] hover:bg-heritage-gold hover:text-heritage-navy transition-all">
                        Become a Sentinel
                    </button>
                </div>
            </section>

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
                                        <div key={item.id} className="flex gap-4 group">
                                            <div className="w-20 h-20 bg-white/5 rounded-sm overflow-hidden shrink-0 border border-white/10">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-center">
                                                <h4 className="text-sm font-display font-bold text-white mb-1 uppercase">{item.name}</h4>
                                                <p className="text-[8px] font-future text-heritage-gold/60 uppercase tracking-widest">{item.location.split(',')[0]}</p>
                                                <button
                                                    onClick={() => removeFromVault(item.id)}
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

const LogEntry = ({ time, event, status }) => (
    <div className="flex gap-4 items-start group">
        <div className="font-future text-[9px] text-gray-600 pt-1">{time}</div>
        <div className="flex-1">
            <div className="text-xs font-sans text-gray-300 group-hover:text-heritage-gold transition-colors">{event}</div>
            <div className="text-[8px] font-future uppercase tracking-widest text-gray-600 mt-1">{status}</div>
        </div>
    </div>
);

export default Home;


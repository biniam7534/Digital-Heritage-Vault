import React, { useState } from 'react';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';
import {
    ArrowRight, Search, Shield, FileText, Music,
    Play, Star, Database, Users, TrendingUp, Plus, Edit3, Trash2, Clock, Globe
} from 'lucide-react';

const Home = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = [
        { name: 'All', icon: null },
        { name: 'Artifacts', icon: <Shield className="w-4 h-4" /> },
        { name: 'Documents', icon: <FileText className="w-4 h-4" /> },
        { name: 'Audio', icon: <Music className="w-4 h-4" /> },
    ];

    const artifacts = [
        { id: 1, title: 'Egyptian Sarcophagus', type: 'Artifact', image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&q=80&w=600' },
        { id: 2, title: 'Medieval Sword', type: 'Artifact', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600' },
        { id: 3, title: 'Historical Document', type: 'Document', image: 'https://images.unsplash.com/photo-1627916640411-96530664e1f7?auto=format&fit=crop&q=80&w=600' },
        { id: 4, title: 'Native Pottery', type: 'Artifact', image: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&q=80&w=600' },
    ];

    return (
        <div className="bg-heritage-dark min-h-screen">
            {/* 1. Hero Hub */}
            <div id="home">
                <Hero />
            </div>

            {/* 2. Featured Fragments Section */}
            <section id="featured" className="py-32 border-b border-heritage-gold/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div className="space-y-4">
                            <span className="font-display text-xs uppercase tracking-[0.5em] text-heritage-gold">Vault Curation</span>
                            <h2 className="text-4xl md:text-6xl font-display font-bold text-heritage-paper leading-tight">
                                Featured <br /> <span className="italic font-serif text-heritage-gold">Fragments</span>
                            </h2>
                        </div>
                        <p className="max-w-md text-heritage-paper/50 font-serif italic text-lg pb-2">
                            "To understand the future, one must first touch the dust of the past."
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <ArtifactCard image="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800" title="Ancient Manuscript" date="12th Century" origin="Byzantine Empire" />
                        <ArtifactCard image="https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&q=80&w=800" title="Bronze Age Helmet" date="800 BC" origin="Aegean Sea" />
                        <ArtifactCard image="https://images.unsplash.com/photo-1627916640411-96530664e1f7?auto=format&fit=crop&q=80&w=800" title="Temple Sculpture" date="4th Century" origin="Khmer Empire" />
                    </div>
                </div>
            </section>

            {/* 3. The Great Archive (Explore) */}
            <section id="explore" className="py-32 parchment relative z-10 shadow-[0_0_100px_rgba(0,0,0,0.8)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-20 gap-12 text-heritage-dark border-b border-heritage-dark/10 pb-12">
                        <div>
                            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-4">
                                The Great Archive
                            </h2>
                            <div className="flex items-center gap-6 font-display text-[10px] uppercase tracking-[0.3em] text-heritage-dark/60">
                                <span className="flex items-center gap-2"><Globe size={12} /> 195+ Cultures</span>
                                <span className="flex items-center gap-2"><Clock size={12} /> 1.2M Years</span>
                            </div>
                        </div>
                        <div className="relative w-full lg:w-[450px] group">
                            <input
                                type="text"
                                placeholder="Sieve through history..."
                                className="w-full bg-transparent border-heritage-dark/20 border-2 py-4 px-12 focus:border-heritage-gold focus:outline-none font-serif italic text-xl transition-all"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-heritage-dark/30 w-6 h-6 group-focus-within:text-heritage-gold transition-colors" />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-20">
                        {filters.map((f) => (
                            <button
                                key={f.name}
                                onClick={() => setActiveFilter(f.name)}
                                className={`flex items-center gap-2 px-10 py-3 font-display text-[10px] uppercase tracking-widest transition-all border-2 ${activeFilter === f.name
                                    ? 'bg-heritage-dark text-heritage-paper border-heritage-dark shadow-2xl scale-105'
                                    : 'text-heritage-dark border-heritage-dark/10 hover:border-heritage-gold'
                                    }`}
                            >
                                {f.icon} {f.name}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                        {artifacts.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group cursor-pointer"
                            >
                                <div className="relative aspect-[3/4] overflow-hidden mb-6 shadow-2xl border-4 border-white">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-heritage-dark/10 group-hover:bg-transparent transition-all" />
                                </div>
                                <h3 className="font-display font-bold text-xl text-heritage-dark group-hover:text-heritage-accent transition-colors mb-1">
                                    {item.title}
                                </h3>
                                <p className="text-[10px] font-display uppercase tracking-widest text-heritage-dark/40">{item.type} // REFERENCE ID: 0x{item.id}AF</p>
                            </motion.div>
                        ))}
                        <div className="col-span-1 sm:col-span-2 lg:col-span-4 py-12 flex justify-center">
                            <button className="px-12 py-4 border-2 border-heritage-dark/10 font-display text-[10px] uppercase tracking-widest hover:bg-heritage-dark hover:text-heritage-paper transition-all">
                                Load More From The Vault
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. The Digital Legacy (About) */}
            <section id="legacy" className="py-40 bg-heritage-dark relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-heritage-wood/10 -skew-x-12 translate-x-1/2" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <span className="font-display text-xs uppercase tracking-[0.8em] text-heritage-gold">The Mission</span>
                                <h2 className="text-5xl md:text-7xl font-display font-bold text-heritage-paper uppercase leading-none">
                                    The <br /> Digital <span className="text-heritage-gold italic font-serif lowercase">Legacy</span>
                                </h2>
                            </div>
                            <div className="space-y-6 text-heritage-paper/60 font-serif text-xl leading-relaxed italic">
                                <p>
                                    "We believe that the stories of old are not meant to be buried by time, but illuminated by technology."
                                </p>
                                <p className="text-lg non-italic leading-loose">
                                    The Digital Heritage Vault is a global initiative dedicated to the absolute preservation of human history. By digitizing artifacts in high-fidelity and recording oral traditions, we ensure that the cultural tapestry of our ancestors remains vibrant for the generations of tomorrow.
                                </p>
                            </div>
                            <div className="pt-8 grid grid-cols-2 gap-12 border-t border-heritage-gold/10">
                                <div>
                                    <h4 className="font-display text-heritage-gold text-lg mb-2">Immutable</h4>
                                    <p className="text-xs text-heritage-paper/40 font-display uppercase tracking-widest">Digital Records</p>
                                </div>
                                <div>
                                    <h4 className="font-display text-heritage-gold text-lg mb-2">Universal</h4>
                                    <p className="text-xs text-heritage-paper/40 font-display uppercase tracking-widest">Global Access</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-[4/5] wood-panel p-4 rotate-3 animate-float">
                                <img
                                    src="https://images.unsplash.com/photo-1461360228754-6e81c478c882?auto=format&fit=crop&q=80&w=800"
                                    className="w-full h-full object-cover grayscale brightness-50 contrast-125"
                                    alt="Historical Preservation"
                                />
                            </div>
                            <div className="absolute -bottom-10 -left-10 w-48 h-48 border-2 border-heritage-gold/20 -z-10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. The Archivist's Workshop (Management Hub) */}
            <section id="workshop" className="py-32 bg-heritage-wood/20 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-8 mb-20 text-heritage-paper">
                        <div className="h-px bg-heritage-gold/20 flex-1" />
                        <h2 className="text-3xl font-display font-bold uppercase tracking-[0.4em] text-center">
                            Archivist's <span className="text-heritage-gold">Workshop</span>
                        </h2>
                        <div className="h-px bg-heritage-gold/20 flex-1" />
                    </div>

                    <div className="grid lg:grid-cols-3 gap-16">
                        {/* Manage Assets */}
                        <div className="lg:col-span-2 space-y-10">
                            <div className="flex justify-between items-center">
                                <h3 className="font-display text-sm tracking-widest uppercase text-heritage-paper/60">Registry Management</h3>
                                <button className="flex items-center gap-2 text-heritage-gold font-display text-[10px] uppercase tracking-widest hover:text-heritage-paper">
                                    <Plus size={14} /> Add New Record
                                </button>
                            </div>
                            <div className="space-y-4">
                                <WorkshopRecord title="Ancient Vase" status="Verified" date="2 hours ago" />
                                <WorkshopRecord title="Old Manuscript" status="Pending" date="1 day ago" />
                                <WorkshopRecord title="Vintage Camera" status="Archived" date="3 days ago" />
                            </div>
                        </div>

                        {/* Quick Registry Form */}
                        <div className="bg-heritage-dark/50 p-8 border border-heritage-gold/10 relative">
                            <div className="absolute -top-3 left-8 bg-heritage-gold text-heritage-dark px-4 py-1 font-display text-[10px] uppercase font-bold tracking-widest">
                                Quick Intake
                            </div>
                            <form className="space-y-6 pt-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-heritage-paper/40">Item Designation</label>
                                    <input type="text" className="w-full bg-heritage-dark/50 border border-heritage-gold/20 p-3 text-heritage-paper focus:outline-none focus:border-heritage-gold transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-heritage-paper/40">Historical Era</label>
                                    <select className="w-full bg-heritage-dark/50 border border-heritage-gold/20 p-3 text-heritage-paper focus:outline-none">
                                        <option>Ancient Era</option>
                                        <option>Medieval</option>
                                        <option>Industrial</option>
                                    </select>
                                </div>
                                <button className="w-full bg-heritage-gold text-heritage-dark py-4 font-display text-[10px] uppercase font-bold tracking-widest hover:bg-heritage-paper transition-all">
                                    Begin Digital Ingestion
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Guardian Access (Auth Section) */}
            <section id="auth" className="py-40 bg-heritage-dark border-t border-heritage-gold/5">
                <div className="max-w-4xl mx-auto px-4 text-center space-y-16">
                    <div className="space-y-6">
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-heritage-paper uppercase tracking-tighter">
                            Guardian <span className="text-heritage-gold">Access</span>
                        </h2>
                        <p className="text-heritage-paper/40 font-serif italic text-lg">
                            Request your archival credentials to contribute to the global registry.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button className="px-12 py-5 bg-heritage-gold text-heritage-dark font-display text-xs uppercase font-bold tracking-[0.3em] hover:bg-heritage-paper transition-all">
                            Sign In to Vault
                        </button>
                        <button className="px-12 py-5 border-2 border-heritage-gold/20 text-heritage-paper font-display text-xs uppercase font-bold tracking-[0.3em] hover:border-heritage-gold transition-all">
                            Register as Curator
                        </button>
                    </div>
                </div>
            </section>

            {/* 7. Metrics Section */}
            <section id="metrics" className="py-32 bg-heritage-wood/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        <StatBox icon={<Database />} label="Historical Records" value="1,280" />
                        <StatBox icon={<Users />} label="Member Archivists" value="342" />
                        <StatBox icon={<TrendingUp />} label="Vault Integrity" value="99.9%" />
                    </div>
                </div>
            </section>

        </div>
    );
};

const ArtifactCard = ({ image, title, date, origin }) => (
    <motion.div
        whileHover={{ y: -10 }}
        className="group wood-panel p-2 rounded-sm cursor-pointer border border-heritage-gold/5"
    >
        <div className="aspect-[4/3] overflow-hidden mb-6 relative">
            <img src={image} alt={title} className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
            <div className="absolute inset-0 bg-heritage-gold/5" />
        </div>
        <div className="p-4 space-y-2">
            <h3 className="text-xl font-display font-bold text-heritage-paper group-hover:text-heritage-gold transition-colors tracking-tight">{title}</h3>
            <p className="text-[10px] font-display text-heritage-paper/40 uppercase tracking-[0.2em]">{date} // {origin}</p>
        </div>
    </motion.div>
);

const WorkshopRecord = ({ title, status, date }) => (
    <div className="bg-heritage-dark/40 p-5 flex items-center justify-between border border-heritage-gold/5 hover:border-heritage-gold/20 transition-all group">
        <div className="flex gap-6 items-center">
            <div className="w-2 h-2 rounded-full bg-heritage-gold animate-pulse" />
            <div>
                <h4 className="font-display text-heritage-paper tracking-widest uppercase text-sm mb-1">{title}</h4>
                <p className="text-[10px] font-serif italic text-heritage-paper/30">{date}</p>
            </div>
        </div>
        <div className="flex gap-8 items-center">
            <span className="text-[10px] font-display uppercase tracking-widest text-heritage-gold/60">{status}</span>
            <div className="flex gap-3">
                <Edit3 size={14} className="text-heritage-paper/30 hover:text-heritage-gold cursor-pointer" />
                <Trash2 size={14} className="text-heritage-paper/30 hover:text-red-500 cursor-pointer" />
            </div>
        </div>
    </div>
);

const StatBox = ({ icon, label, value }) => (
    <div className="flex flex-col items-center text-center space-y-6 group">
        <div className="w-16 h-16 border border-heritage-gold/20 flex items-center justify-center text-heritage-gold group-hover:border-heritage-gold transition-all duration-500">
            {icon}
        </div>
        <div>
            <p className="text-5xl font-display font-bold text-heritage-paper mb-2 tracking-tighter">{value}</p>
            <p className="text-[10px] uppercase tracking-[0.4em] text-heritage-paper/30 font-bold">{label}</p>
        </div>
    </div>
);

export default Home;

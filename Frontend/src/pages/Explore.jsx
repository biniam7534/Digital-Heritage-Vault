import React, { useState } from 'react';
import { Search, Filter, Shield, Sword, FileText, Music } from 'lucide-react';
import { motion } from 'framer-motion';

const Explore = () => {
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
        { id: 5, title: 'Native Pottery', type: 'Artifact', image: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&q=80&w=600' },
        { id: 6, title: 'Antique Radio', type: 'Artifact', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600' },
        { id: 7, title: 'Ancient Statue', type: 'Artifact', image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&q=80&w=600' },
        { id: 8, title: 'Ancient Statue', type: 'Artifact', image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&q=80&w=600' },
    ];

    return (
        <div className="pt-32 pb-20 bg-heritage-paper min-h-screen parchment">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-heritage-dark tracking-wide">
                        Explore Collection
                    </h1>

                    <div className="relative w-full md:w-[400px]">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-white/50 border border-heritage-dark/10 py-3 px-12 focus:ring-1 focus:ring-heritage-gold focus:outline-none font-serif italic text-lg shadow-inner"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-heritage-dark/40 w-5 h-5" />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 border-l border-heritage-dark/10 pl-3">
                            <Filter className="text-heritage-dark/40 w-5 h-5 cursor-pointer hover:text-heritage-gold transition-colors" />
                        </div>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-4 mb-16 justify-center md:justify-start">
                    {filters.map((filter) => (
                        <button
                            key={filter.name}
                            onClick={() => setActiveFilter(filter.name)}
                            className={`flex items-center gap-2 px-8 py-2 font-display text-sm uppercase tracking-widest transition-all border ${activeFilter === filter.name
                                    ? 'bg-heritage-dark text-heritage-paper border-heritage-dark shadow-xl'
                                    : 'bg-heritage-paper text-heritage-dark border-heritage-dark/10 hover:border-heritage-gold'
                                }`}
                        >
                            {filter.icon}
                            {filter.name}
                        </button>
                    ))}
                </div>

                {/* Artifact Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {artifacts.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-square overflow-hidden mb-4 shadow-lg group-hover:rotate-1 transition-transform duration-500">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-heritage-dark/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="w-full py-2 bg-heritage-gold text-heritage-dark font-display text-[10px] uppercase tracking-[0.2em] font-bold">
                                        View Details
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between items-start pt-2">
                                <h3 className="font-display font-bold text-lg text-heritage-dark leading-tight group-hover:text-heritage-gold transition-colors">
                                    {item.title}
                                </h3>
                                <div className="p-1 bg-heritage-dark/5 rounded-sm">
                                    {item.type === 'Document' ? <FileText className="w-3 h-3 text-heritage-dark/40" /> : <Shield className="w-3 h-3 text-heritage-dark/40" />}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Explore;

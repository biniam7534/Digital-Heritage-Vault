import React, { useState, useEffect } from 'react';
import { Search, Filter, Shield, Sword, FileText, Music } from 'lucide-react';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '../config/api';

const Explore = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [artifacts, setArtifacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchSites = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/heritage/sites`);
                const json = await res.json();
                if (json.success) {
                    setArtifacts(json.data);
                }
            } catch (err) {
                console.error("Error fetching sites:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSites();
    }, []);

    const filters = [
        { name: 'All', icon: null },
        { name: 'World Heritage', icon: <Shield className="w-4 h-4" /> },
        { name: 'Cultural', icon: <FileText className="w-4 h-4" /> },
        { name: 'Natural', icon: <Music className="w-4 h-4" /> },
    ];

    const filteredArtifacts = artifacts.filter(item => {
        const matchesFilter = activeFilter === 'All' ||
            (activeFilter === 'World Heritage' && item.unescoStatus.includes('World Heritage')) ||
            (activeFilter === 'Cultural' && item.unescoStatus.includes('Cultural')) ||
            (activeFilter === 'Natural' && item.unescoStatus.includes('Natural'));

        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    if (loading) {
        return (
            <div className="pt-32 pb-20 bg-heritage-paper min-h-screen parchment flex items-center justify-center">
                <div className="text-2xl font-display text-heritage-dark animate-pulse">Loading Repository...</div>
            </div>
        );
    }

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
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
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
                    {filteredArtifacts.map((item, index) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer"
                            onClick={() => window.location.href = `/artifact/${item._id}`}
                        >
                            <div className="relative aspect-square overflow-hidden mb-4 shadow-lg group-hover:rotate-1 transition-transform duration-500">
                                <img
                                    src={item.image}
                                    alt={item.name}
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
                                    {item.name}
                                </h3>
                                <div className="p-1 bg-heritage-dark/5 rounded-sm">
                                    {item.unescoStatus.includes('Natural') ? <Music className="w-3 h-3 text-heritage-dark/40" /> : <Shield className="w-3 h-3 text-heritage-dark/40" />}
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

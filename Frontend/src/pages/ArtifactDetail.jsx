import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Pause, SkipBack, SkipForward, Star, Share2, Heart, Award, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const ArtifactDetail = () => {
    const { id } = useParams();
    const [site, setSite] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSite = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/v1/heritage/sites/${id}`);
                const json = await res.json();
                if (json.success) {
                    setSite(json.data);
                }
            } catch (err) {
                console.error("Error fetching site details:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSite();
    }, [id]);

    if (loading) {
        return (
            <div className="pt-32 pb-20 bg-heritage-dark min-h-screen flex items-center justify-center">
                <div className="text-2xl font-display text-heritage-gold animate-pulse">Scanning Archive...</div>
            </div>
        );
    }

    if (!site) {
        return (
            <div className="pt-32 pb-20 bg-heritage-dark min-h-screen flex flex-col items-center justify-center gap-6">
                <div className="text-2xl font-display text-heritage-gold">Artifact Missing from Vault</div>
                <Link to="/explore" className="text-heritage-gold/60 hover:text-heritage-gold underline decoration-heritage-gold/30 underline-offset-8 transition-all">Return to Repository</Link>
            </div>
        );
    }

    return (
        <div className="pt-20 bg-heritage-dark min-h-screen pb-32">
            <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">

                <Link to="/explore" className="inline-flex items-center gap-2 text-heritage-gold/60 hover:text-heritage-gold mb-12 transition-colors uppercase tracking-widest text-[10px] font-display font-bold">
                    <ArrowLeft size={14} /> Back to Repository
                </Link>

                {/* Detail Section */}
                <div className="wood-panel relative overflow-hidden flex flex-col lg:flex-row min-h-[600px] border-heritage-gold/30">

                    {/* Decorative Icons */}
                    <div className="absolute top-8 right-8 flex gap-3 z-20">
                        <div className="flex gap-1 text-heritage-gold/50">
                            <Star className="w-4 h-4 fill-heritage-gold" />
                            <Star className="w-4 h-4 fill-heritage-gold" />
                            <Star className="w-4 h-4 fill-heritage-gold" />
                            <Star className="w-4 h-4 fill-heritage-gold" />
                            <Star className="w-4 h-4 fill-heritage-gold" />
                        </div>
                        <div className="h-4 w-px bg-heritage-gold/20 mx-2" />
                        <Heart className="w-5 h-5 text-heritage-gold/50 cursor-pointer hover:text-heritage-gold transition-colors" />
                        <Share2 className="w-5 h-5 text-heritage-gold/50 cursor-pointer hover:text-heritage-gold transition-colors" />
                    </div>

                    {/* Left: Featured Image */}
                    <div className="lg:w-1/2 relative h-[400px] lg:auto">
                        <img
                            src={site.image}
                            alt={site.name}
                            className="w-full h-full object-cover grayscale-[0.2] brightness-90 shadow-2xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-heritage-wood/80" />
                    </div>

                    {/* Right: Content */}
                    <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center space-y-8 bg-heritage-wood/80 backdrop-blur-sm">

                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-display font-bold text-heritage-paper leading-tight">
                                {site.name}
                            </h1>
                            <p className="text-heritage-gold font-display text-sm uppercase tracking-[0.3em] font-bold">
                                {site.unescoStatus}
                            </p>
                        </div>

                        <p className="text-xl text-heritage-paper/70 font-serif leading-relaxed italic max-w-lg">
                            {site.description}
                        </p>

                        <div className="space-y-4 pt-4">
                            <h4 className="font-display text-xs uppercase tracking-widest text-heritage-gold/60 font-bold">Historical Context</h4>
                            <p className="text-heritage-paper/60 font-serif leading-relaxed italic">
                                {site.history}
                            </p>
                        </div>

                        {/* Audio Player Component */}
                        <div className="pt-8 space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="font-display text-xs uppercase tracking-widest text-heritage-gold/60">Digital Audio Guide: Cultural Legacy</span>
                            </div>
                            <div className="bg-heritage-dark/40 p-4 border border-heritage-gold/10 flex items-center gap-6 group hover:border-heritage-gold/30 transition-all">
                                <button className="w-12 h-12 bg-heritage-paper text-heritage-dark rounded-full flex items-center justify-center hover:bg-heritage-gold transition-all">
                                    <Play className="w-5 h-5 fill-heritage-dark ml-1" />
                                </button>
                                <div className="flex-1 space-y-2">
                                    <div className="h-1 bg-heritage-gold/10 relative rounded-full overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1/3 h-full bg-heritage-gold" />
                                    </div>
                                    <div className="flex justify-between text-[10px] font-display text-heritage-paper/40 tracking-widest">
                                        <span>00:45</span>
                                        <span>02:30</span>
                                    </div>
                                </div>
                                <div className="text-heritage-paper/40 font-display text-[10px] uppercase tracking-tighter">
                                    VAULT-HD
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Risk Factors Section */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {site.riskFactors.map((risk, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-sm hover:border-heritage-gold/30 transition-all">
                            <div className={`text-[10px] font-display uppercase tracking-widest mb-4 inline-block px-3 py-1 rounded-full ${risk.severity === 'High' ? 'bg-red-500/20 text-red-400' :
                                risk.severity === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                                    'bg-green-500/20 text-green-400'
                                }`}>
                                {risk.severity} Severity
                            </div>
                            <h3 className="text-heritage-paper text-xl font-display mb-2">{risk.factor}</h3>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ArtifactDetail;

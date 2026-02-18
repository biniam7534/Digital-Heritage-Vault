import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Star, Share2, Heart, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const ArtifactDetail = () => {
    return (
        <div className="pt-20 bg-heritage-dark min-h-screen pb-32">
            <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">

                {/* Detail Section */}
                <div className="wood-panel relative overflow-hidden flex flex-col lg:flex-row min-h-[600px] border-heritage-gold/30">

                    {/* Decorative Icons */}
                    <div className="absolute top-8 right-8 flex gap-3 z-20">
                        <div className="flex gap-1 text-heritage-gold/50">
                            <Star className="w-4 h-4 fill-heritage-gold" />
                            <Star className="w-4 h-4 fill-heritage-gold" />
                            <Star className="w-4 h-4 fill-heritage-gold" />
                            <Star className="w-4 h-4" />
                            <Star className="w-4 h-4" />
                        </div>
                        <div className="h-4 w-px bg-heritage-gold/20 mx-2" />
                        <Heart className="w-5 h-5 text-heritage-gold/50 cursor-pointer hover:text-heritage-gold transition-colors" />
                        <Share2 className="w-5 h-5 text-heritage-gold/50 cursor-pointer hover:text-heritage-gold transition-colors" />
                    </div>

                    {/* Left: Featured Image */}
                    <div className="lg:w-1/2 relative h-[400px] lg:h-auto">
                        <img
                            src="https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&q=80&w=1200"
                            alt="Medieval Knight Armor"
                            className="w-full h-full object-cover grayscale-[0.2] brightness-90 shadow-2xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-heritage-wood/80" />
                    </div>

                    {/* Right: Content */}
                    <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center space-y-8 bg-heritage-wood/80 backdrop-blur-sm">

                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-6xl font-display font-bold text-heritage-paper leading-tight">
                                Medieval Knight Armor
                            </h1>
                            <p className="text-heritage-gold font-display text-sm uppercase tracking-[0.3em] font-bold">
                                14th Century, Europe
                            </p>
                        </div>

                        <p className="text-xl text-heritage-paper/70 font-serif leading-relaxed italic max-w-lg">
                            A full suit of armor worn by knights during the 14th century. Crafted from cold-rolled steel, this armor protected warriors in battle and served as a symbol of status and chivalry.
                        </p>

                        {/* Audio Player Component */}
                        <div className="pt-12 space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="font-display text-xs uppercase tracking-widest text-heritage-gold/60">Audio Clip: Knight's Tale</span>
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
                                        <span>01:24</span>
                                        <span>04:15</span>
                                    </div>
                                </div>
                                <div className="text-heritage-paper/40 font-display text-[10px] uppercase tracking-tighter">
                                    nIh
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Artifact Detail Page Label Overlay */}
                <div className="mt-12 relative z-30">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="parchment p-6 rounded-sm flex items-start gap-4 max-w-2xl shadow-2xl skew-x-[1deg] mx-auto"
                    >
                        <div className="w-12 h-12 bg-heritage-dark text-heritage-paper rounded-full flex items-center justify-center font-display text-2xl font-bold shrink-0">3</div>
                        <div>
                            <h3 className="font-display font-bold text-xl mb-1">Artifact Detail Page:</h3>
                            <p className="font-serif text-lg leading-relaxed">
                                Clicking an artifact shows <span className="font-bold underline">more information</span>, images, audio clips, and a comments section.
                            </p>
                        </div>
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default ArtifactDetail;

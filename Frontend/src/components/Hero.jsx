import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
            {/* Dark Overlay with subtle texture */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-heritage-dark/60 via-heritage-dark/40 to-heritage-dark flex items-center justify-center">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]"></div>
            </div>

            {/* Background Image */}
            <img
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1920&q=80"
                alt="Ancient Library"
                className="absolute inset-0 w-full h-full object-cover scale-105 animate-slow-zoom"
            />

            <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="space-y-8"
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-heritage-paper leading-tight tracking-tight">
                        Preserving History <br />
                        <span className="text-heritage-gold italic font-accent lowercase text-4xl md:text-6xl tracking-normal">for</span> Future Generations
                    </h1>

                    <p className="max-w-2xl mx-auto text-xl md:text-2xl text-heritage-paper/80 font-serif italic">
                        The world's largest digital repository dedicated to ancient cultures,
                        architectural marvels, and human heritage.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                        <button className="bg-heritage-gold text-heritage-dark px-10 py-4 font-display text-sm uppercase tracking-[0.2em] font-bold hover:bg-heritage-paper transition-all duration-300 shadow-2xl glass-dark border border-heritage-gold/50">
                            Explore Collections
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Gradient for smooth transition */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-heritage-dark to-transparent z-15"></div>
        </section>
    );
};

export default Hero;


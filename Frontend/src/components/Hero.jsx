import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-heritage-navy">
            {/* Dark Backdrop with Canvas-like Texture */}
            <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />
            </div>

            {/* Glowing Orbs */}
            <div className="absolute inset-0 opacity-30">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[10%] left-[20%] w-[400px] h-[400px] rounded-full bg-heritage-gold blur-[150px]"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="mb-6"
                >
                    <span className="font-future text-heritage-gold tracking-[0.5em] text-xs uppercase block mb-4">
                        Ethiopia 2050
                    </span>
                    <h1 className="text-5xl md:text-8xl font-display font-bold mb-6 leading-tight text-white">
                        What Will Ethiopia’s <br />
                        <span className="text-heritage-gold">Heritage Look Like?</span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-sans leading-relaxed"
                >
                    Preserving the architectural marvels of the past using the technologies of the future.
                    Explore the digital evolution of our historical landmarks.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    <button
                        onClick={() => document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' })}
                        className="group relative px-10 py-5 bg-transparent border border-heritage-gold text-heritage-gold font-future font-bold text-sm tracking-widest overflow-hidden transition-all duration-300 hover:text-heritage-navy"
                    >
                        <div className="absolute inset-0 w-0 bg-heritage-gold transition-all duration-300 group-hover:w-full -z-10" />
                        Explore Historical Sites
                    </button>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-heritage-gold/50 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-[0.3em] font-future">Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-heritage-gold to-transparent" />
            </motion.div>
        </section>
    );
};

export default Hero;

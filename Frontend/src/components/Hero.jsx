import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-futuristic-bg">
            {/* Background Gradient Animation */}
            <div className="absolute inset-0 opacity-20">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-futuristic-purple blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [90, 0, 90],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-futuristic-accent blur-[120px]"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-5xl">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-8xl font-black mb-6 leading-tight"
                >
                    See the Future <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-futuristic-purple to-futuristic-accent">
                        Before It Happens.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-lg md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto"
                >
                    AI-powered simulations that visualize 2040. Experience the next evolution of human civilization.
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 242, 255, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="px-8 py-4 rounded-full futuristic-gradient text-black font-bold text-lg uppercase tracking-wider"
                >
                    Explore the Future
                </motion.button>
            </div>

            {/* Floating Particles (Simple CSS implementation for performance) */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white opacity-50"
                        style={{
                            width: Math.random() * 4 + 'px',
                            height: Math.random() * 4 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                            animation: `float ${5 + Math.random() * 10}s linear infinite`,
                            animationDelay: `-${Math.random() * 10}s`
                        }}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;

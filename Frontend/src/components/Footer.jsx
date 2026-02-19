import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer id="vision" className="py-24 px-4 bg-futuristic-bg relative overflow-hidden text-center">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-futuristic-purple opacity-10 blur-[150px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-black italic mb-8 leading-tight">
                        “The best way to <br />
                        <span className="text-futuristic-accent">predict</span> the future is to <br />
                        <span className="text-futuristic-purple underline decoration-2 underline-offset-8 transition-colors hover:text-futuristic-accent">build it.</span>”
                    </h2>
                    <p className="text-gray-500 font-mono tracking-widest">— ALAN KAY</p>
                </motion.div>

                <motion.button
                    whileHover={{ scale: 1.1, letterSpacing: '0.2em' }}
                    whileTap={{ scale: 0.9 }}
                    className="px-12 py-5 border-2 border-futuristic-accent text-futuristic-accent font-black uppercase tracking-widest text-lg hover:bg-futuristic-accent hover:text-black transition-all duration-300 mb-20"
                >
                    Start Building Today
                </motion.button>

                <div className="pt-20 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-600 text-sm">
                    <p>© 2026 FutureScope 2040. Designed for the Future.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-futuristic-accent transition-colors">Twitter (X)</a>
                        <a href="#" className="hover:text-futuristic-accent transition-colors">Neuralink</a>
                        <a href="#" className="hover:text-futuristic-accent transition-colors">Metaverse</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

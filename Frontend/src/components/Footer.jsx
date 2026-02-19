import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer id="vision" className="py-32 px-4 bg-heritage-navy relative overflow-hidden text-center border-t border-heritage-gold/10">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-heritage-gold opacity-5 blur-[150px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 leading-tight text-white">
                        “A people without the knowledge of their past history, origin and culture is like <br />
                        <span className="text-heritage-gold italic">a tree without roots.</span>”
                    </h2>
                    <p className="text-heritage-gold/50 font-future tracking-[0.4em] text-xs uppercase">— Marcus Garvey</p>
                </motion.div>

                <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-[10px] font-future uppercase tracking-widest">
                    <p>© 2026 Digital Heritage Vault // Ethiopia 2050 Project</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-heritage-gold transition-colors">Archive.org</a>
                        <a href="#" className="hover:text-heritage-gold transition-colors">UNESCO Digital</a>
                        <a href="#" className="hover:text-heritage-gold transition-colors">Ethiopian History</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Heritage Hub', href: '#home' },
        { name: 'Repository', href: '#gallery' },
        { name: 'Risk Monitor', href: '#dashboard' },
        { name: 'Archival Support', href: '#vision' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4 bg-heritage-navy/80 backdrop-blur-md border-b border-heritage-gold/20' : 'py-8 bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 group cursor-pointer"
                >
                    <div className="relative">
                        <Shield className="text-heritage-gold w-8 h-8" />
                        <div className="absolute inset-0 bg-heritage-gold/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-display font-bold tracking-tight text-white uppercase leading-none">
                            Heritage<span className="text-heritage-gold">Vault</span>
                        </span>
                        <span className="text-[8px] font-future tracking-[0.4em] text-heritage-gold/60 uppercase">Ethiopia 2050</span>
                    </div>
                </motion.div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-[10px] font-future uppercase tracking-[0.2em] text-gray-400 hover:text-heritage-gold transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-2 left-0 w-0 h-px bg-heritage-gold transition-all group-hover:w-full" />
                        </a>
                    ))}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 border border-heritage-gold text-heritage-gold text-[10px] font-future font-bold uppercase tracking-widest hover:bg-heritage-gold hover:text-heritage-navy transition-all"
                    >
                        Sentinel Access
                    </motion.button>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-heritage-gold">
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass-card mx-4 mt-4 overflow-hidden border border-heritage-gold/20 bg-heritage-navy"
                    >
                        <div className="flex flex-col p-6 gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-xs font-future uppercase tracking-widest text-gray-400 hover:text-heritage-gold"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <button className="w-full py-4 border border-heritage-gold text-heritage-gold font-future font-bold uppercase tracking-[0.2em]">
                                Sentinel Access
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

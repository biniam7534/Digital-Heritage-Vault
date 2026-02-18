import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Vault, ChevronDown, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '#home' },
        { name: 'Explore', path: '#explore' },
        { name: 'Workshop', path: '#workshop' },
        { name: 'Stats', path: '#metrics' },
    ];

    const isHomePage = location.pathname === '/';

    return (
        <nav className="fixed top-0 w-full z-50 glass-dark border-b border-heritage-gold/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo Section */}
                    <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-3 group">
                        <div className="w-10 h-10 border border-heritage-gold/50 flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-500">
                            <Vault className="text-heritage-gold w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                        </div>
                        <span className="font-display font-bold text-xl tracking-wider text-heritage-paper">
                            DIGITAL HERITAGE <span className="text-heritage-gold">VAULT</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <div key={link.name} className="relative group/link">
                                {isHomePage ? (
                                    <a
                                        href={link.path}
                                        className="flex items-center gap-1 font-display text-sm uppercase tracking-widest transition-colors hover:text-heritage-gold text-heritage-paper/80"
                                    >
                                        {link.name}
                                    </a>
                                ) : (
                                    <Link
                                        to={`/${link.path}`}
                                        className="flex items-center gap-1 font-display text-sm uppercase tracking-widest transition-colors hover:text-heritage-gold text-heritage-paper/80"
                                    >
                                        {link.name}
                                    </Link>
                                )}
                                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-heritage-gold transition-all duration-300 group-hover/link:w-full" />
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/login" className="text-sm font-display uppercase tracking-widest text-heritage-paper hover:text-heritage-gold transition-colors">
                            Login
                        </Link>
                        <Link to="/register">
                            <button className="bg-heritage-gold text-heritage-dark px-6 py-2 font-display text-sm uppercase tracking-widest font-bold hover:bg-white hover:text-heritage-dark transition-all gold-border">
                                Register
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button className="md:hidden p-2 text-heritage-paper focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-heritage-wood border-b border-heritage-gold/20 overflow-hidden"
                    >
                        <div className="px-4 py-8 space-y-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="block font-display text-lg uppercase tracking-widest text-heritage-paper hover:text-heritage-gold transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="pt-4 flex flex-col gap-4">
                                <Link to="/login" onClick={() => setIsOpen(false)} className="text-center font-display uppercase tracking-widest text-heritage-paper">
                                    Login
                                </Link>
                                <Link to="/register" onClick={() => setIsOpen(false)}>
                                    <button className="w-full bg-heritage-gold text-heritage-dark px-6 py-3 font-display uppercase tracking-widest font-bold">
                                        Register
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;



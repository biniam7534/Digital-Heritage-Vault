import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Vault, Search, Library, Info, PlusCircle, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Explorer', path: '/explorer', icon: Search },
        { name: 'Collections', path: '/collections', icon: Library },
        { name: 'About', path: '/about', icon: Info },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 glass border-b border-primary-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-200 group-hover:scale-105 transition-transform">
                            <Vault className="text-white w-7 h-7" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-display font-bold text-xl tracking-tight leading-none">
                                Digital Heritage <span className="text-primary-600">Vault</span>
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Preserving History</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`flex items-center gap-2 font-medium transition-colors hover:text-primary-600 ${location.pathname === link.path ? 'text-primary-600' : 'text-slate-600'
                                    }`}
                            >
                                <link.icon className="w-4 h-4" />
                                {link.name}
                            </Link>
                        ))}
                        <Link to="/submit">
                            <button className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-md hover:shadow-lg active:scale-95">
                                <PlusCircle className="w-5 h-5" />
                                Submit Artifact
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button className="md:hidden p-2 text-slate-600" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden bg-white border-b border-primary-100 p-4 space-y-4 shadow-xl"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary-50 text-slate-700 font-semibold"
                            >
                                <link.icon className="w-5 h-5 text-primary-600" />
                                {link.name}
                            </Link>
                        ))}
                        <Link to="/submit" onClick={() => setIsOpen(false)} className="block">
                            <button className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-4 rounded-xl font-bold">
                                <PlusCircle className="w-5 h-5" />
                                Submit Artifact
                            </button>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

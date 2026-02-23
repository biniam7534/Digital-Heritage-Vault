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
                    <SentinelAccessButton />
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
                            <SentinelAccessButton fullWidth />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

/* ── Sentinel Access Button + Modal (self-contained) ── */
const SentinelAccessButton = ({ fullWidth = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState({ email: '', password: '' });
    const [step, setStep] = useState('idle'); // idle | loading | success | error

    const handleOpen = () => { setIsOpen(true); setStep('idle'); setForm({ email: '', password: '' }); };
    const handleClose = () => { setIsOpen(false); setStep('idle'); };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStep('loading');
        setTimeout(() => {
            // Demo: accept any valid email + password ≥ 6 chars
            if (form.email.includes('@') && form.password.length >= 6) {
                setStep('success');
                setTimeout(handleClose, 3000);
            } else {
                setStep('error');
            }
        }, 2000);
    };

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpen}
                className={`${fullWidth ? 'w-full py-4' : 'px-6 py-2'} border border-heritage-gold text-heritage-gold text-[10px] font-future font-bold uppercase tracking-widest hover:bg-heritage-gold hover:text-heritage-navy transition-all`}
            >
                Sentinel Access
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={handleClose}
                            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[100]"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.97 }}
                            transition={{ type: 'spring', damping: 24, stiffness: 220 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md z-[101] bg-heritage-navy border border-heritage-gold/25 shadow-2xl overflow-hidden"
                        >
                            {/* ── Success screen ── */}
                            {step === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="flex flex-col items-center justify-center py-20 px-8 text-center gap-5"
                                >
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ type: 'spring', stiffness: 180 }}
                                    >
                                        <Shield className="w-16 h-16 text-heritage-gold" />
                                    </motion.div>
                                    <h3 className="text-2xl font-display font-bold text-white tracking-wide">Access Granted</h3>
                                    <p className="font-future text-[9px] tracking-[0.4em] uppercase text-heritage-gold/70">
                                        Welcome back, Sentinel
                                    </p>
                                    <div className="w-px h-8 bg-heritage-gold/30" />
                                    <p className="font-future text-[9px] tracking-widest text-gray-600 uppercase">Redirecting to secure terminal...</p>
                                </motion.div>
                            )}

                            {/* ── Idle / Error / Loading screen ── */}
                            {step !== 'success' && (
                                <>
                                    {/* Header */}
                                    <div className="relative px-8 pt-8 pb-6 border-b border-heritage-gold/10 flex items-start justify-between">
                                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.07),transparent)] pointer-events-none" />
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Shield size={14} className="text-heritage-gold" />
                                                <span className="font-future text-[9px] tracking-[0.4em] uppercase text-heritage-gold/70">Sentinel Terminal</span>
                                            </div>
                                            <h3 className="text-xl font-display font-bold text-white">Secure Access Portal</h3>
                                            <p className="font-future text-[9px] text-gray-600 uppercase tracking-widest mt-1">Heritage Vault — Ethiopia 2050</p>
                                        </div>
                                        <button onClick={handleClose} className="text-gray-600 hover:text-white transition-colors mt-1">
                                            <X size={18} />
                                        </button>
                                    </div>

                                    {/* Form */}
                                    <form onSubmit={handleSubmit} className="px-8 py-7 space-y-5">
                                        {/* Error banner */}
                                        <AnimatePresence>
                                            {step === 'error' && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                                    className="flex items-center gap-3 px-4 py-3 bg-red-950/40 border border-red-500/30 text-red-400 font-future text-[9px] uppercase tracking-widest"
                                                >
                                                    <span className="text-red-500 font-bold">✕</span> Credentials Rejected — Access Denied
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <div>
                                            <label className="block font-future text-[9px] uppercase tracking-widest text-gray-500 mb-2">
                                                Sentinel ID (Email)
                                            </label>
                                            <input
                                                required type="email"
                                                value={form.email}
                                                onChange={e => { setForm({ ...form, email: e.target.value }); setStep('idle'); }}
                                                placeholder="sentinel@vault.eth"
                                                disabled={step === 'loading'}
                                                className="w-full bg-white/5 border border-white/10 focus:border-heritage-gold/50 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-700 transition-colors font-mono disabled:opacity-50"
                                            />
                                        </div>

                                        <div>
                                            <label className="block font-future text-[9px] uppercase tracking-widest text-gray-500 mb-2">
                                                Access Key (Password)
                                            </label>
                                            <input
                                                required type="password"
                                                value={form.password}
                                                onChange={e => { setForm({ ...form, password: e.target.value }); setStep('idle'); }}
                                                placeholder="••••••••••••"
                                                disabled={step === 'loading'}
                                                className="w-full bg-white/5 border border-white/10 focus:border-heritage-gold/50 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-700 transition-colors font-mono disabled:opacity-50"
                                            />
                                        </div>

                                        <motion.button
                                            whileTap={{ scale: 0.97 }}
                                            type="submit"
                                            disabled={step === 'loading'}
                                            className="w-full py-4 bg-heritage-gold text-heritage-navy font-future font-bold text-[10px] uppercase tracking-[0.3em] hover:brightness-110 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                                        >
                                            {step === 'loading' ? (
                                                <>
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
                                                        className="w-4 h-4 border-2 border-heritage-navy/30 border-t-heritage-navy rounded-full"
                                                    />
                                                    Authenticating...
                                                </>
                                            ) : (
                                                <>
                                                    <Shield size={13} /> Authenticate
                                                </>
                                            )}
                                        </motion.button>

                                        <p className="text-center font-future text-[8px] uppercase tracking-widest text-gray-700">
                                            Authorised personnel only — Heritage Sentinel Network
                                        </p>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;

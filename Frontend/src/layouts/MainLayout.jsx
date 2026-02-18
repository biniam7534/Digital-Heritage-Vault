import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Vault, Github, Twitter, Mail } from 'lucide-react';

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-heritage-dark text-heritage-paper font-serif selection:bg-heritage-gold selection:text-heritage-dark">
            <Navbar />
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
            >
                {children}
            </motion.main>

            {/* Global Footer */}
            <footer className="bg-heritage-wood py-24 border-t border-heritage-gold/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-16 border-b border-heritage-gold/5 pb-16 mb-12">
                        <div className="col-span-1 md:col-span-2 space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 border border-heritage-gold/50 flex items-center justify-center rotate-45">
                                    <Vault className="text-heritage-gold w-5 h-5 -rotate-45" />
                                </div>
                                <span className="font-display font-bold text-2xl tracking-[0.1em] uppercase">Digital Heritage Vault</span>
                            </div>
                            <p className="text-heritage-paper/60 max-w-sm leading-loose italic">
                                We are guardians of the collective human memory, utilizing modern technology to ensure ancient wisdom and cultural artifacts never fade from existence.
                            </p>
                            <div className="flex gap-4">
                                <FooterSocialLink icon={<Twitter size={18} />} />
                                <FooterSocialLink icon={<Github size={18} />} />
                                <FooterSocialLink icon={<Mail size={18} />} />
                            </div>
                        </div>

                        <div>
                            <h4 className="font-display font-bold text-sm uppercase tracking-[0.2em] mb-8 text-heritage-gold">Vault Explorer</h4>
                            <ul className="space-y-4 text-heritage-paper/40 font-display text-xs uppercase tracking-widest">
                                <li><a href="#" className="hover:text-heritage-gold transition-colors">All Collections</a></li>
                                <li><a href="#" className="hover:text-heritage-gold transition-colors">Digital Manuscripts</a></li>
                                <li><a href="#" className="hover:text-heritage-gold transition-colors">3D Artifact Models</a></li>
                                <li><a href="#" className="hover:text-heritage-gold transition-colors">Historical Audio</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-display font-bold text-sm uppercase tracking-[0.2em] mb-8 text-heritage-gold">Information</h4>
                            <ul className="space-y-4 text-heritage-paper/40 font-display text-xs uppercase tracking-widest">
                                <li><a href="#" className="hover:text-heritage-gold transition-colors">About the Project</a></li>
                                <li><a href="#" className="hover:text-heritage-gold transition-colors">Contribution Guide</a></li>
                                <li><a href="#" className="hover:text-heritage-gold transition-colors">Terms of Heritage</a></li>
                                <li><a href="#" className="hover:text-heritage-gold transition-colors">Contact Archivist</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-heritage-paper/30 text-[10px] uppercase font-display tracking-[0.3em]">
                        <p>© 2026 Digital Heritage Vault. Bound by time, preserved by code.</p>
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-heritage-gold transition-colors">Privacy</a>
                            <a href="#" className="hover:text-heritage-gold transition-colors">Security</a>
                            <a href="#" className="hover:text-heritage-gold transition-colors">Nodes</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const FooterSocialLink = ({ icon }) => (
    <a href="#" className="w-10 h-10 border border-heritage-gold/20 flex items-center justify-center text-heritage-paper/40 hover:text-heritage-gold hover:border-heritage-gold transition-all rounded-sm">
        {icon}
    </a>
);

export default MainLayout;


import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#fcfaf8] text-slate-800 font-sans selection:bg-primary-200">
            <Navbar />
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                {children}
            </motion.main>

            {/* Global Footer */}
            <footer className="bg-slate-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-12 border-b border-white/10 pb-12 mb-12">
                        <div className="col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                                    <span className="font-display font-bold text-xl">D</span>
                                </div>
                                <span className="font-display font-bold text-2xl">Digital Heritage Vault</span>
                            </div>
                            <p className="text-slate-400 max-w-sm leading-relaxed">
                                Dedicated to the preservation and accessibility of global cultural heritage through next-generation digital archival technologies.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-display font-bold text-lg mb-6 text-white">Vault Explorer</h4>
                            <ul className="space-y-4 text-slate-400">
                                <li><a href="#" className="hover:text-primary-500 transition-colors">All Collections</a></li>
                                <li><a href="#" className="hover:text-primary-500 transition-colors">Era Maps</a></li>
                                <li><a href="#" className="hover:text-primary-500 transition-colors">3D Artifacts</a></li>
                                <li><a href="#" className="hover:text-primary-500 transition-colors">Manuscripts</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-display font-bold text-lg mb-6 text-white">Community</h4>
                            <ul className="space-y-4 text-slate-400">
                                <li><a href="#" className="hover:text-primary-500 transition-colors">Member Stories</a></li>
                                <li><a href="#" className="hover:text-primary-500 transition-colors">Contribution Guide</a></li>
                                <li><a href="#" className="hover:text-primary-500 transition-colors">Submission API</a></li>
                                <li><a href="#" className="hover:text-primary-500 transition-colors">Research Grant</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
                        <p>© 2026 Digital Heritage Vault. All rights reserved.</p>
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;

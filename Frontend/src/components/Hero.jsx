import React from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, History, Globe, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary-100 rounded-full blur-[120px] opacity-50" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-primary-50 rounded-full blur-[100px] opacity-60" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center space-x-2 bg-primary-50 px-4 py-2 rounded-full text-primary-700 mb-8 border border-primary-100"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary-600">Preserving 1.2M+ Years of History</span>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-6xl md:text-8xl font-display font-bold mb-8 bg-gradient-to-r from-slate-900 via-primary-800 to-slate-900 bg-clip-text text-transparent leading-[1.1]"
                >
                    The Infinite Library of <br /> <span className="text-primary-600">Human Heritage</span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-3xl mx-auto text-xl text-slate-600 mb-12 leading-relaxed"
                >
                    A global, decentralized vault dedicated to archiving, categorizing, and sharing our collective cultural treasures through immersive digital preservation.
                </motion.p>

                {/* Search Bar Group */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="max-w-2xl mx-auto relative group mb-20"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-[2rem] blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative flex items-center bg-white rounded-3xl p-2 shadow-2xl border border-primary-100">
                        <div className="pl-6 text-slate-400">
                            <Search className="w-6 h-6" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search ancient empires, rare artifacts..."
                            className="w-full py-4 px-6 text-lg bg-transparent border-none focus:outline-none text-slate-700 placeholder:text-slate-400"
                        />
                        <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary-600 transition-colors">
                            Search <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>

                {/* Feature Grid */}
                <div className="grid md:grid-cols-3 gap-8 text-left">
                    <FeatureCard
                        icon={<History className="w-7 h-7" />}
                        title="Immortal Records"
                        desc="Blockchain-backed verification ensures provenance and historical accuracy remains unchanged."
                        delay={0.4}
                    />
                    <FeatureCard
                        icon={<Globe className="w-7 h-7" />}
                        title="Global Access"
                        desc="Explore cultural artifacts from 195+ countries through high-fidelity digital twins."
                        delay={0.5}
                    />
                    <FeatureCard
                        icon={<Users className="w-7 h-7" />}
                        title="Citizen Historians"
                        desc="Join a global network of contributors curating the largest digital history archive."
                        delay={0.6}
                    />
                </div>
            </div>
        </section>
    );
};

const FeatureCard = ({ icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-primary-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
    >
        <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-all">
            <div className="text-primary-600 group-hover:text-white">{icon}</div>
        </div>
        <h3 className="font-display font-bold text-2xl mb-3 text-slate-800">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{desc}</p>
    </motion.div>
);

export default Hero;

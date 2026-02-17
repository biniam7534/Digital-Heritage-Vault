import React from 'react';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Calendar } from 'lucide-react';

const Home = () => {
    return (
        <div>
            <Hero />

            {/* Featured Collection Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">Storehouse Highlights</h2>
                            <p className="text-xl text-slate-500 max-w-xl">Curated treasures from recent expeditions and digital archive restoration projects.</p>
                        </div>
                        <button className="flex items-center gap-2 group text-primary-600 font-bold text-lg">
                            View All 12 Collections <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        <ArtifactCard
                            image="https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&q=80&w=800"
                            title="Statue of Ramses II"
                            origin="Thebes, Egypt"
                            date="1279–1213 BC"
                            category="Statuary"
                        />
                        <ArtifactCard
                            image="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800"
                            title="Kyoto Zen Manuscript"
                            origin="Kyoto, Japan"
                            date="14th Century"
                            category="Manuscript"
                        />
                        <ArtifactCard
                            image="https://images.unsplash.com/photo-1627916640411-96530664e1f7?auto=format&fit=crop&q=80&w=800"
                            title="Mayan Calendar Disk"
                            origin="Yucatan, Mexico"
                            date="Classic Period"
                            category="Calendar"
                        />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-primary-600 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 L100 0 L100 100 Z" fill="currentColor" />
                    </svg>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        <StatItem value="1.2M+" label="Artifacts" />
                        <StatItem value="450+" label="Global Partners" />
                        <StatItem value="24/7" label="Secure Nodes" />
                        <StatItem value="190+" label="Cultures" />
                    </div>
                </div>
            </section>
        </div>
    );
};

const ArtifactCard = ({ image, title, origin, date, category }) => (
    <motion.div
        whileHover={{ y: -10 }}
        className="group bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm transition-all"
    >
        <div className="h-[400px] overflow-hidden relative font-bold text-lg">
            <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute top-6 left-6">
                <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-primary-600 text-xs font-bold uppercase tracking-wider shadow-sm">
                    {category}
                </span>
            </div>
        </div>
        <div className="p-8">
            <h3 className="text-2xl font-display font-bold text-slate-900 mb-4">{title}</h3>
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-500 font-semibold">
                    <MapPin className="w-4 h-4 text-primary-500" />
                    <span>{origin}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 font-semibold">
                    <Calendar className="w-4 h-4 text-primary-500" />
                    <span>{date}</span>
                </div>
            </div>
            <button className="mt-8 w-full py-4 rounded-2xl border-2 border-primary-100 text-primary-600 font-bold group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-all active:scale-95">
                Explore Artifact
            </button>
        </div>
    </motion.div>
);

const StatItem = ({ value, label }) => (
    <div className="space-y-2">
        <div className="text-5xl md:text-6xl font-display font-bold">{value}</div>
        <div className="text-primary-100 text-sm font-bold uppercase tracking-widest">{label}</div>
    </div>
);

export default Home;

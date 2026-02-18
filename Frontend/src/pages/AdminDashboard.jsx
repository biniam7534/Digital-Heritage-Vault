import React from 'react';
import {
    LayoutDashboard, Database, FolderSearch, Users, MessageSquare,
    Search, Bell, Settings, Plus, Edit3, Trash2, TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    return (
        <div className="min-h-screen bg-heritage-dark flex font-serif">

            {/* Sidebar */}
            <aside className="w-64 bg-heritage-wood/50 border-r border-heritage-gold/10 p-8 hidden lg:block">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-8 h-8 border border-heritage-gold/50 flex items-center justify-center rotate-45">
                        <Database className="text-heritage-gold w-4 h-4 -rotate-45" />
                    </div>
                    <span className="font-display font-bold text-sm tracking-widest text-heritage-paper">
                        ADMIN PANEL
                    </span>
                </div>

                <nav className="space-y-6 text-sm font-display uppercase tracking-widest">
                    <SidebarLink icon={<LayoutDashboard size={18} />} label="Dashboard" active />
                    <SidebarLink icon={<Database size={18} />} label="Artifacts" />
                    <SidebarLink icon={<FolderSearch size={18} />} label="Categories" />
                    <SidebarLink icon={<Users size={18} />} label="Users" />
                    <SidebarLink icon={<MessageSquare size={18} />} label="Comments" />
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <h1 className="text-3xl font-display font-bold text-heritage-paper uppercase tracking-widest">
                        Admin Dashboard
                    </h1>
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-heritage-paper/40 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-heritage-wood/30 border border-heritage-gold/10 py-2 pl-10 pr-4 text-xs font-display uppercase tracking-widest focus:outline-none focus:border-heritage-gold/30 text-heritage-paper"
                            />
                        </div>
                        <Bell className="text-heritage-paper/40 w-5 h-5 cursor-pointer hover:text-heritage-gold" />
                        <Settings className="text-heritage-paper/40 w-5 h-5 cursor-pointer hover:text-heritage-gold" />
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <StatCard icon={<Database />} label="Total Artifacts" value="128" />
                    <StatCard icon={<Bell />} label="Pending Reviews" value="12" />
                    <StatCard icon={<Users />} label="Total Users" value="342" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Recent Artifacts List */}
                    <div className="lg:col-span-2 space-y-8">
                        <h2 className="font-display text-lg tracking-widest text-heritage-paper uppercase underline decoration-heritage-gold/30 underline-offset-8">
                            Recent Artifacts
                        </h2>
                        <div className="space-y-4">
                            <ArtifactItem title="Ancient Vase" origin="Mesh | Greece" image="https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&q=80&w=150" />
                            <ArtifactItem title="Old Manuscript" origin="Veld | France" image="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=150" />
                            <ArtifactItem title="Vintage Camera" origin="Veld | France" image="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=150" />
                        </div>
                    </div>

                    {/* Right Column: Quick Stats & New Artifact */}
                    <div className="space-y-12">
                        {/* Quick Stats */}
                        <div className="wood-panel p-8 border-heritage-gold/10">
                            <h3 className="font-display text-xs uppercase tracking-[0.2em] text-heritage-gold mb-6">Quick Stats</h3>
                            <div className="space-y-6">
                                <div className="flex justify-between items-end border-b border-heritage-gold/5 pb-4">
                                    <span className="font-serif text-heritage-paper/60 uppercase text-[10px] tracking-widest">Uploads This Month</span>
                                    <span className="font-display text-2xl text-heritage-paper">24</span>
                                </div>
                                <div className="flex justify-between items-end border-b border-heritage-gold/5 pb-4">
                                    <span className="font-serif text-heritage-paper/60 uppercase text-[10px] tracking-widest flex items-center gap-2">
                                        Site Visits Today <TrendingUp size={12} />
                                    </span>
                                    <span className="font-display text-2xl text-heritage-paper">1,234</span>
                                </div>
                            </div>
                        </div>

                        {/* Add New Artifact Form */}
                        <div className="bg-heritage-paper/5 p-8 border border-heritage-gold/10 rounded-sm">
                            <h3 className="font-display text-sm uppercase tracking-widest text-heritage-paper mb-6">Add New Artifact</h3>
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-heritage-paper/40 mb-2">Title</label>
                                    <input type="text" className="w-full bg-heritage-dark/30 border border-heritage-gold/10 p-3 text-sm focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-heritage-paper/40 mb-2">Description</label>
                                    <textarea className="w-full bg-heritage-dark/30 border border-heritage-gold/10 p-3 text-sm focus:outline-none h-24" />
                                </div>
                                <div className="flex flex-col gap-4">
                                    <button type="button" className="w-full bg-heritage-gold/10 border border-heritage-gold/30 p-3 text-[10px] uppercase tracking-widest text-heritage-paper hover:bg-heritage-gold/20 transition-all">
                                        Upload Image
                                    </button>
                                    <button type="button" className="w-full bg-heritage-gold text-heritage-dark p-4 font-display text-[10px] uppercase tracking-widest font-bold hover:bg-heritage-paper transition-all">
                                        Submit Artifact
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Label Overlay Decor */}
                <div className="mt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="parchment p-6 rounded-sm flex items-start gap-4 max-w-2xl shadow-2xl skew-x-[-1deg]"
                    >
                        <div className="w-12 h-12 bg-heritage-dark text-heritage-paper rounded-full flex items-center justify-center font-display text-2xl font-bold shrink-0">4</div>
                        <div>
                            <h3 className="font-display font-bold text-xl mb-1">Admin Dashboard:</h3>
                            <p className="font-serif text-lg leading-relaxed">
                                Admins can <span className="font-bold underline italic">upload, manage artifacts</span>, and moderate user comments from the <span className="font-bold">dashboard.</span>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

const SidebarLink = ({ icon, label, active = false }) => (
    <div className={`flex items-center gap-4 cursor-pointer transition-all ${active ? 'text-heritage-gold' : 'text-heritage-paper/60 hover:text-heritage-paper'}`}>
        {icon}
        <span>{label}</span>
    </div>
);

const StatCard = ({ icon, label, value }) => (
    <div className="wood-panel p-8 border-heritage-gold/20 flex items-center justify-between group cursor-default">
        <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-heritage-paper/40 mb-2">{label}</p>
            <p className="text-4xl font-display text-heritage-paper group-hover:text-heritage-gold transition-colors">{value}</p>
        </div>
        <div className="p-4 bg-heritage-gold/5 rounded-full text-heritage-gold group-hover:bg-heritage-gold group-hover:text-heritage-dark transition-all">
            {icon}
        </div>
    </div>
);

const ArtifactItem = ({ title, origin, image }) => (
    <div className="bg-white/5 p-4 flex items-center justify-between border border-transparent hover:border-heritage-gold/10 transition-all rounded-sm group">
        <div className="flex items-center gap-4">
            <img src={image} alt={title} className="w-12 h-12 object-cover grayscale brightness-75 rounded-sm" />
            <div>
                <h4 className="font-display text-sm tracking-widest text-heritage-paper">{title}</h4>
                <p className="text-[10px] font-serif uppercase tracking-widest text-heritage-paper/40">{origin}</p>
            </div>
        </div>
        <div className="flex gap-2">
            <button className="p-2 bg-heritage-gold/10 text-heritage-paper/60 hover:bg-heritage-gold hover:text-heritage-dark transition-all rounded-sm">
                <Edit3 size={14} />
            </button>
            <button className="p-2 bg-red-900/10 text-red-500/60 hover:bg-red-500 hover:text-white transition-all rounded-sm">
                <Trash2 size={14} />
            </button>
        </div>
    </div>
);

export default AdminDashboard;

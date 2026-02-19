import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-heritage-navy text-gray-200 font-sans selection:bg-heritage-gold selection:text-heritage-navy">
            <Navbar />
            <motion.main
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {children}
            </motion.main>

            <Footer />
        </div>
    );
};

export default MainLayout;


import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiCode, HiArrowRight } from 'react-icons/hi';
import { config } from '../config.jsx';
import BlackHole from './BlackHole';

const Hero = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const containerAnimation = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemAnimation = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.23, 1, 0.32, 1]
            }
        }
    };

    const scrollToProjects = () => {
        // If on home page, scroll to projects section
        if (location.pathname === '/') {
            const element = document.querySelector('#projects');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Navigate to projects page
            navigate('/projects');
        }
    };

    return (
        <section id="home" className="min-h-screen flex flex-col md:flex-row items-center justify-center relative overflow-hidden pb-12 md:pb-20">
            {/* Animated background gradient */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 -z-10 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center justify-center">
                <motion.div
                    variants={containerAnimation}
                    initial="hidden"
                    animate="show"
                    className="max-w-4xl mx-auto w-full text-left space-y-6 sm:space-y-8 flex flex-col mb-8 sm:mb-12 md:mb-16"
                >
                    <motion.div
                        variants={itemAnimation}
                        className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full backdrop-blur-sm text-xs sm:text-sm w-fit"
                    >
                        <HiCode className="w-3 h-3 sm:w-4 sm:h-4 text-white/80 flex-shrink-0" />
                        <span className="font-medium text-white/80 whitespace-nowrap">Welcome to my portfolio</span>
                    </motion.div>

                    <motion.h1
                        variants={itemAnimation}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-tight"
                    >
                        <span className="block text-white mb-2">
                            Hi, I'm {config.developer.name}
                        </span>
                        <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl bg-gradient-to-r from-white/60 via-white to-white/60 bg-clip-text text-transparent">
                            I build web that builds brands.
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={itemAnimation}
                        className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 leading-relaxed max-w-2xl"
                    >
                        Full-stack builder creating digital experiences that respect humans and scale with clarity. Accessibility is my north star.
                    </motion.p>

                    <motion.div
                        variants={itemAnimation}
                        className="flex flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4"
                    >
                        <motion.button
                            onClick={scrollToProjects}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-white text-black font-semibold text-sm sm:text-base hover:bg-white/90 transition-all duration-300 shadow-lg shadow-white/20 w-full sm:w-auto justify-center"
                        >
                            <span>View Projects</span>
                            <HiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* Floating elements */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="absolute -z-10 inset-0 pointer-events-none"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-white/5 rounded-full blur-3xl" />
                </motion.div>
            </div>
            
            {/* Black Hole SVG */}
            <div className="w-full relative z-10">
                <BlackHole />
            </div>
        </section>
    );
};

export default Hero;

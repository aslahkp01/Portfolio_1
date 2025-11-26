import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HiCode } from 'react-icons/hi';
import { FaReact, FaNodeJs, FaGithub, FaAws } from 'react-icons/fa';
import { SiExpress, SiMongodb, SiTailwindcss, SiKicad, SiPython, SiCplusplus, SiJavascript } from 'react-icons/si';

const skills = [
    { name: "AWS", icon: <FaAws className="w-5 h-5 sm:w-6 sm:h-6" />, size: "col-span-2 sm:col-span-1 md:col-span-2 row-span-1" },
    { name: "React.js", icon: <FaReact className="w-5 h-5 sm:w-6 sm:h-6" />, size: "col-span-1 row-span-1" },
    { name: "Express", icon: <SiExpress className="w-5 h-5 sm:w-6 sm:h-6" />, size: "col-span-1 row-span-1" },
    { name: "MongoDB", icon: <SiMongodb className="w-5 h-5 sm:w-6 sm:h-6" />, size: "col-span-2 sm:col-span-1 sm:row-span-2 row-span-1" },
    { name: "Node.js", icon: <FaNodeJs className="w-5 h-5 sm:w-6 sm:h-6" />, size: "col-span-2 sm:col-span-1 md:col-span-2 row-span-1" },
    { name: "GitHub", icon: <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />, size: "col-span-1 row-span-1" },
    { name: "Tailwind", icon: <SiTailwindcss className="w-5 h-5 sm:w-6 sm:h-6" />, size: "col-span-1 row-span-1" },
    { name: "HFSS", icon: <HiCode className="w-5 h-5 sm:w-6 sm:h-6" />, size: "col-span-1 row-span-1" },
    { name: "KiCad", icon: <SiKicad className="w-5 h-5 sm:w-6 sm:h-6" />, size: "col-span-1 row-span-1" },
    { name: "Python", icon: <SiPython className="w-5 h-5 sm:w-6 sm:h-6" />, size: "col-span-2 sm:col-span-1 sm:row-span-2 row-span-1" },
    { name: "C++", icon: <SiCplusplus className="w-5 h-5 sm:w-6 sm:h-6" />, size: "col-span-1 row-span-1" },
];

const containerAnimation = {
    hidden: { opacity: 0, x: -30 },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            staggerChildren: 0.08,
            delayChildren: 0.2
        }
    }
};

const itemAnimation = {
    hidden: { opacity: 0, y: 20, scale: 0.9, x: -30 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1]
        }
    }
};

const SkillsShowcase = () => {
    const shouldReduceMotion = useReducedMotion();
    
    return (
        <motion.div
            variants={containerAnimation}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px" }}
            className="w-full mt-20"
            style={{ transform: 'translateZ(0)', willChange: 'scroll-position' }}
        >
            <div className="container mx-auto px-4 sm:px-6 md:px-8">
                <motion.div 
                    variants={itemAnimation} 
                    className="flex items-center gap-2 mb-8 sm:mb-12 justify-center"
                >
                    {/* <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full backdrop-blur-sm shadow-lg">
                        <HiCode className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
                        <span className="text-xs sm:text-sm font-semibold text-white/80">Tech Stack</span>
                    </div> */}
                </motion.div>

                <motion.div
                    variants={containerAnimation}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 w-full"
                    style={{ 
                        gridAutoRows: 'minmax(90px, auto)',
                        gridAutoFlow: 'row dense',
                        perspective: '1000px'
                    }}
                >
                {skills.map((skill, index) => (
                    <motion.div
                        key={skill.name}
                        variants={itemAnimation}
                        className={`relative group ${skill.size}`}
                        style={{ 
                            perspective: '1000px',
                            transformStyle: 'preserve-3d',
                            willChange: 'transform',
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden'
                        }}
                    >
                        <motion.div
                            className="relative w-full h-full"
                            style={{ 
                                transformStyle: 'preserve-3d',
                                height: '100%',
                                willChange: 'transform',
                                backfaceVisibility: 'hidden',
                                WebkitBackfaceVisibility: 'hidden'
                            }}
                            whileHover={shouldReduceMotion ? {} : { 
                                rotateY: 8,
                                rotateX: 8,
                                scale: 1.03,
                                transition: { duration: 0.3, ease: "easeOut" }
                            }}
                        >
                            {/* 3D Box Container */}
                            <div
                                className="relative w-full h-full"
                                style={{ 
                                    transformStyle: 'preserve-3d',
                                    height: '100%',
                                    minHeight: '90px',
                                    willChange: 'transform',
                                    backfaceVisibility: 'hidden',
                                    WebkitBackfaceVisibility: 'hidden'
                                }}
                            >
                                {/* Front Face */}
                                <div
                                    className="
                                        bg-white/5
                                        border-white/10
                                        border 
                                        p-2.5 sm:p-4 md:p-6
                                        rounded-lg sm:rounded-xl md:rounded-2xl
                                        backdrop-blur-sm 
                                        cursor-default
                                        relative overflow-hidden
                                        h-full
                                        w-full
                                        min-h-[90px] sm:min-h-[120px]
                                        flex flex-col items-center justify-center
                                        box-border
                                        shadow-[0_8px_16px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.1)]
                                        transition-all duration-300
                                        group-hover:border-white/30
                                        group-hover:bg-white/10
                                        group-hover:shadow-[0_12px_24px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.2)]
                                    "
                                    style={{ 
                                        transform: shouldReduceMotion ? 'none' : 'translate3d(0, 0, 12px)',
                                        height: '100%',
                                        willChange: 'transform',
                                        backfaceVisibility: 'hidden',
                                        WebkitBackfaceVisibility: 'hidden'
                                    }}
                                >
                                    {/* Shiny overlay effect */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{
                                            animation: 'shimmer 3s infinite',
                                            backgroundSize: '200% 100%'
                                        }} />
                                    </div>
                                    
                                    {/* Glossy shine effect */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300">
                                        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-2xl" />
                                    </div>
                                    
                                    <div className="relative flex flex-col items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 w-full z-10">
                                        {/* Icon container */}
                                        <div className="relative">
                                            <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-md sm:rounded-lg md:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:border-white/30 group-hover:shadow-white/10">
                                                <div className="text-white drop-shadow-lg transition-transform duration-300 group-hover:scale-110">
                                                    {skill.icon}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Skill name */}
                                        <div className="flex flex-col items-center gap-0.5 sm:gap-1 w-full px-0.5 sm:px-1">
                                            <span className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-bold text-white text-center tracking-tight transition-all duration-300 group-hover:text-white/90 break-words leading-tight">
                                                {skill.name}
                                            </span>
                                            <div className="w-5 sm:w-6 md:w-8 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full transition-all duration-300 group-hover:via-white/60" />
                                        </div>
                                    </div>
                                </div>

                                {/* Top Face (3D depth effect) */}
                                <div
                                    className="absolute bg-gradient-to-b from-white/8 to-white/2 border-white/10 border-t rounded-t-lg sm:rounded-t-xl md:rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                    style={{
                                        transform: shouldReduceMotion ? 'none' : 'rotateX(-90deg) translate3d(0, 0, 12px)',
                                        transformOrigin: 'top',
                                        height: '12px',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        borderLeft: 'none',
                                        borderRight: 'none',
                                        borderBottom: 'none',
                                        willChange: 'transform',
                                        backfaceVisibility: 'hidden',
                                        WebkitBackfaceVisibility: 'hidden'
                                    }}
                                />

                                {/* Right Side Face (3D depth effect) */}
                                <div
                                    className="absolute bg-gradient-to-l from-white/8 to-white/2 border-white/10 border-r rounded-r-lg sm:rounded-r-xl md:rounded-r-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                    style={{
                                        transform: shouldReduceMotion ? 'none' : 'rotateY(90deg) translate3d(0, 0, 12px)',
                                        transformOrigin: 'right',
                                        width: '12px',
                                        top: 0,
                                        bottom: 0,
                                        right: 0,
                                        borderTop: 'none',
                                        borderBottom: 'none',
                                        borderLeft: 'none',
                                        willChange: 'transform',
                                        backfaceVisibility: 'hidden',
                                        WebkitBackfaceVisibility: 'hidden'
                                    }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default SkillsShowcase;


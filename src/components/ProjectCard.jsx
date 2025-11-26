import React from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { HiCode } from 'react-icons/hi';

const itemAnimation = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.23, 1, 0.32, 1]
        }
    }
};

export const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            variants={itemAnimation}
            className="group flex flex-col sm:flex-row items-stretch gap-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 p-4 sm:p-6 rounded-xl md:rounded-2xl transition-all duration-300 backdrop-blur-sm"
        >
            {/* Project Image */}
            <div className="sm:w-1/3 flex-shrink-0">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    {project.image ? (
                        <img
                            src={project.image}
                            alt={project.title}
                            loading="lazy"
                            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                            <HiCode className="w-12 h-12 text-white/30" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
            </div>

            {/* Project Content */}
            <div className="sm:w-2/3 flex flex-col justify-between py-2">
                <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                            {project.title}
                        </h3>
                        <span className="text-xs sm:text-sm text-white/40 font-mono">
                            #{String(index + 1).padStart(2, '0')}
                        </span>
                    </div>

                    <p className="text-sm sm:text-base text-white/70 leading-relaxed line-clamp-3">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech, idx) => (
                            <span
                                key={idx}
                                className="text-xs bg-white/10 text-white px-2 py-1 rounded-full border border-white/10"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4 mt-4 border-t border-white/10">
                    {project.demo && project.demo !== '#' && (
                        <motion.a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-white/90 transition-all duration-300"
                        >
                            Live Demo
                            <FaExternalLinkAlt className="w-3 h-3" />
                        </motion.a>
                    )}
                    {project.github && project.github !== '#' && (
                        <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs sm:text-sm font-medium hover:bg-white/20 transition-all duration-300"
                        >
                            <FaGithub className="w-3 h-3" />
                            Code
                        </motion.a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};




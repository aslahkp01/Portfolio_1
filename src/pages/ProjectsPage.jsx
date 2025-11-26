import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGithub, FaStar, FaCodeBranch, FaSpinner } from 'react-icons/fa';
import { HiArrowRight, HiCode, HiExternalLink } from 'react-icons/hi';
import useSWR from 'swr';
import { config } from '../config.jsx';

const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            duration: 0.6,
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const titleAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1]
        }
    }
};

const languageColors = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    Python: '#3572A5',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Java: '#b07219',
    'C#': '#178600',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Go: '#00ADD8',
    Swift: '#ffac45',
    Kotlin: '#F18E33',
    Rust: '#dea584',
};

const ITEMS_PER_PAGE = 12;
const GITHUB_API_URL = `https://api.github.com/users/${config.social.github}/repos`;

const getProjectSize = (index) => {
    const sizes = [
        "col-span-2 sm:col-span-1 md:col-span-2 row-span-1",
        "col-span-1 sm:row-span-2 row-span-1",
        "col-span-1 row-span-1",
        "col-span-1 row-span-1",
        "col-span-1 row-span-1",
        "col-span-1 row-span-1",
    ];
    return sizes[index % sizes.length];
};

const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Failed to fetch GitHub projects');
    }
    return res.json();
};

const ProjectCard = ({ project, size }) => {
    const topics = project.topics || [];

    return (
        <motion.a
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className={`relative group ${size}`}
        >
            <div className="bg-white/5 border border-white/10 p-4 md:p-5 rounded-xl sm:rounded-2xl backdrop-blur-sm cursor-pointer relative overflow-hidden h-full w-full min-h-[140px] flex flex-col shadow-lg hover:border-white/30 hover:bg-white/10 transition-all duration-300">
                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{
                        animation: 'shimmer 3s infinite',
                        backgroundSize: '200% 100%'
                    }} />
                </div>

                <div className="relative flex flex-col gap-3 w-full z-10 h-full justify-between">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center space-x-2 flex-1 min-w-0">
                                <FaGithub className="w-4 h-4 text-white shrink-0" />
                                <h3 className="font-bold text-white text-sm truncate">
                                    {project.name}
                                </h3>
                            </div>
                            <HiExternalLink className="w-4 h-4 text-white/60 group-hover:text-white transition-colors shrink-0" />
                        </div>

                        <p className="text-xs text-white/70 line-clamp-3 leading-relaxed">
                            {project.description || "No description provided"}
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 mt-auto">
                        {topics.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                                {topics.slice(0, size.includes('row-span-2') ? 3 : 2).map((topic) => (
                                    <span
                                        key={topic}
                                        className="text-[10px] bg-white/10 text-white px-2 py-0.5 rounded-full border border-white/10"
                                    >
                                        {topic}
                                    </span>
                                ))}
                                {topics.length > (size.includes('row-span-2') ? 3 : 2) && (
                                    <span className="text-[10px] text-white/50">
                                        +{topics.length - (size.includes('row-span-2') ? 3 : 2)}
                                    </span>
                                )}
                            </div>
                        )}

                        <div className="flex items-center space-x-3 flex-wrap">
                            {project.language && (
                                <div className="flex items-center space-x-1">
                                    <div
                                        className="w-2.5 h-2.5 rounded-full"
                                        style={{
                                            backgroundColor: languageColors[project.language] || '#ccc'
                                        }}
                                    />
                                    <span className="text-xs text-white/70">
                                        {project.language}
                                    </span>
                                </div>
                            )}
                            <div className="flex items-center space-x-1">
                                <FaStar className="w-3 h-3 text-white/70" />
                                <span className="text-xs text-white/70">
                                    {project.stargazers_count}
                                </span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <FaCodeBranch className="w-3 h-3 text-white/70" />
                                <span className="text-xs text-white/70">
                                    {project.forks_count}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.a>
    );
};

const ProjectsPage = () => {
    const [page, setPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const { data, error, isLoading, mutate: revalidateData } = useSWR(
        `${GITHUB_API_URL}?sort=updated&per_page=${ITEMS_PER_PAGE * page}`,
        fetcher,
        {
            revalidateOnFocus: false,
            refreshInterval: 300000,
            shouldRetryOnError: false,
        }
    );

    const projects = useMemo(() => {
        if (!data) return [];
        const filtered = data
            .filter(project => 
                !project.fork && 
                !project.private
            )
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, ITEMS_PER_PAGE * page);
        
        return filtered.map((project, index) => ({
            ...project,
            size: getProjectSize(index)
        }));
    }, [data, page]);

    const loadMore = () => {
        setPage(prev => prev + 1);
    };

    return (
        <section className="py-16 md:py-24 relative min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={containerAnimation}
                    initial="hidden"
                    animate="show"
                    className="space-y-12 md:space-y-16"
                >
                    {/* Section Title */}
                    <motion.div
                        variants={titleAnimation}
                        className="mb-12 md:mb-16 space-y-6"
                    >
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                            <div className="space-y-4 max-w-2xl">
                                <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm mb-4">
                                    <FaGithub className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
                                    <span className="text-xs sm:text-sm font-semibold text-white/80">GitHub Projects</span>
                                </div>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                                    Open Source Projects
                                </h2>
                                <p className="text-sm sm:text-base md:text-lg text-white/60 leading-relaxed">
                                    A collection of my public repositories on GitHub,
                                    showcasing projects in{' '}
                                    <span className="text-white font-semibold">full-stack development</span>,{' '}
                                    <span className="text-white font-semibold">web technologies</span>, and{' '}
                                    <span className="text-white font-semibold">open source contributions</span>.
                                </p>
                            </div>

                            <motion.a
                                href={`https://github.com/${config.social.github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-white text-black font-semibold text-sm sm:text-base hover:bg-white/90 transition-all duration-300 shadow-lg shadow-white/20 w-full md:w-auto justify-center"
                            >
                                View GitHub
                                <HiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </motion.a>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-6 pt-2 overflow-x-auto pb-2">
                            <div className="space-y-1 shrink-0">
                                <span className="text-2xl sm:text-3xl font-bold text-white">{projects.length}+</span>
                                <p className="text-xs sm:text-sm text-white/60 whitespace-nowrap">
                                    Public Repositories
                                </p>
                            </div>
                            <div className="w-px h-8 sm:h-10 bg-white/10 shrink-0" />
                            <div className="space-y-1 shrink-0">
                                <span className="text-2xl sm:text-3xl font-bold text-white">2+</span>
                                <p className="text-xs sm:text-sm text-white/60 whitespace-nowrap">
                                    Years Experience
                                </p>
                            </div>
                        </div>

                        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </motion.div>

                    {/* Projects Grid */}
                    <motion.div
                        variants={containerAnimation}
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 auto-rows-fr gap-4 w-full max-w-6xl mx-auto"
                    >
                        {isLoading ? (
                            Array(ITEMS_PER_PAGE).fill(0).map((_, index) => (
                                <div key={index} className={getProjectSize(index)}>
                                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl min-h-[140px] animate-pulse" />
                                </div>
                            ))
                        ) : error ? (
                            <div className="col-span-full text-center text-white/60">
                                Failed to load projects. Please try again later.
                            </div>
                        ) : (
                            projects.map((project) => (
                                <ProjectCard key={project.id} project={project} size={project.size} />
                            ))
                        )}
                    </motion.div>

                    {/* Load More Button */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                        {!error && data?.length > projects.length && (
                            <motion.button
                                onClick={loadMore}
                                disabled={isLoadingMore}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-all duration-300"
                            >
                                {isLoadingMore ? (
                                    <>
                                        <FaSpinner className="w-4 h-4 mr-2 animate-spin inline" />
                                        Loading...
                                    </>
                                ) : (
                                    'Load More Projects'
                                )}
                            </motion.button>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectsPage;




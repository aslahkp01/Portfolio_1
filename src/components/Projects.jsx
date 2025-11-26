import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGithub, FaStar, FaCodeBranch, FaSpinner } from 'react-icons/fa';
import { HiExternalLink, HiArrowRight } from 'react-icons/hi';
import useSWR from 'swr';
import { config } from '../config.jsx';

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

const ITEMS_PER_PAGE = 6;
const GITHUB_API_URL = `https://api.github.com/users/${config.social.github}/repos`;

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
                                <FaGithub className="w-4 h-4 text-white flex-shrink-0" />
                                <h3 className="font-bold text-white text-sm truncate">
                                    {project.name}
                                </h3>
                            </div>
                            <HiExternalLink className="w-4 h-4 text-white/60 group-hover:text-white transition-colors flex-shrink-0" />
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

const Projects = () => {
    const [page, setPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const { data, error, isLoading } = useSWR(
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
            .filter(project => !project.fork && !project.private)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, ITEMS_PER_PAGE * page);

        return filtered.map((project, index) => ({
            ...project,
            size: getProjectSize(index)
        }));
    }, [data, page]);

    const loadMore = () => {
        setIsLoadingMore(true);
        setPage(prev => prev + 1);
        // simple UX: show spinner for a short time until SWR revalidates
        setTimeout(() => setIsLoadingMore(false), 600);
    };

    const containerAnimation = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    return (
        <section id="projects" className="py-20 md:py-32 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={containerAnimation}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-12"
                >
                    <div className="max-w-2xl mx-auto text-center space-y-4">
                        <motion.div
                            variants={containerAnimation}
                            className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm"
                        >
                            <FaGithub className="w-4 h-4 text-white/80" />
                            <span className="text-sm font-semibold text-white/80">Latest Github Projects</span>
                        </motion.div>

                        <motion.h2
                            variants={containerAnimation}
                            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
                        >
                            Open Source Projects
                        </motion.h2>
                        <motion.p
                            variants={containerAnimation}
                            className="text-lg text-white/60"
                        >
                            Check out my public portfolio projects on Github
                        </motion.p>
                    </div>

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

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                to="/projects"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all duration-300 shadow-lg shadow-white/20"
                            >
                                View All Projects
                                <HiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </motion.div>

                        <motion.a
                            href={`https://github.com/${config.social.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-all duration-300"
                        >
                            <FaGithub className="w-4 h-4" />
                            View on Github
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;


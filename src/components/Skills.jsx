import React from 'react';
import { motion } from 'framer-motion';
import { HiChip, HiSparkles } from 'react-icons/hi';
import { config } from '../config.jsx';

const getLevelPercentage = (level) => {
    switch (level) {
        case 'Expert': return 95;
        case 'Advanced': return 85;
        case 'Intermediate': return 70;
        case 'Beginner': return 50;
        default: return 75;
    }
};

const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.23, 1, 0.32, 1]
        }
    }
};

const SkillCard = ({ skill, bgClass }) => {
    const levelPercentage = getLevelPercentage(skill.level);
    const gradientClass = {
        'bg-blue-500/10': 'from-blue-500/80 to-blue-500',
        'bg-emerald-500/10': 'from-emerald-500/80 to-emerald-500',
        'bg-orange-500/10': 'from-orange-500/80 to-orange-500'
    }[bgClass] || 'from-white/80 to-white';

    return (
        <motion.div
            variants={itemAnimation}
            className="relative flex flex-col h-full"
        >
            <div className="relative h-full p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 bg-white/5 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-medium text-white/90">
                        {skill.name}
                    </h3>
                    {skill.hot && (
                        <div className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 text-xs rounded-full flex items-center gap-1">
                            <HiSparkles className="w-3 h-3" />
                            Hot
                        </div>
                    )}
                </div>

                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${levelPercentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`h-full bg-gradient-to-r rounded-full ${gradientClass}`}
                    />
                </div>

                <div className="mt-2 flex justify-between items-center text-xs">
                    <span className="text-white/50">Proficiency</span>
                    <span className="font-medium text-white/90">{skill.level}</span>
                </div>
            </div>
        </motion.div>
    );
};

const CategorySection = ({ category }) => (
    <div className="space-y-6">
        <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${category.bgClass}`}>
                <div className={`w-5 h-5 ${category.iconClass}`}>
                    {category.icon}
                </div>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                <p className="text-sm text-white/60">{category.description}</p>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {category.skills.map((skill, idx) => (
                <SkillCard key={idx} skill={skill} bgClass={category.bgClass} />
            ))}
        </div>
    </div>
);

const Skills = () => {
    const skills = config.skills;

    return (
        <section id="skills" className="py-20 md:py-32 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={containerAnimation}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-16"
                >
                    <div className="max-w-2xl mx-auto text-center space-y-4">
                        <motion.div
                            variants={itemAnimation}
                            className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm"
                        >
                            <HiChip className="w-5 h-5 text-white/80" />
                            <span className="text-sm font-medium text-white/80">
                                Skills & Technologies
                            </span>
                        </motion.div>

                        <motion.div variants={itemAnimation} className="space-y-2">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                                Technical Proficiency
                            </h2>
                            <p className="text-lg text-white/60">
                                A comprehensive overview of my technical expertise across various
                                development domains and tools.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        variants={containerAnimation}
                        className="space-y-16"
                    >
                        {skills.map((category, index) => (
                            <CategorySection key={index} category={category} />
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;

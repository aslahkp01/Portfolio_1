import React from 'react';
import { motion } from 'framer-motion';
import { config } from '../config.jsx';

const Footer = () => {
    return (
        <footer id="contact" className="py-16 md:py-20 border-t border-white/10 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="text-center space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white">
                                Get In Touch
                            </h2>
                            <p className="text-lg text-white/60">
                                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-6">
                            {config.contactInfo.map((contact, index) => (
                                <motion.a
                                    key={index}
                                    href={contact.link || '#'}
                                    target={contact.link ? "_blank" : undefined}
                                    rel={contact.link ? "noopener noreferrer" : undefined}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                                >
                                    <div className="text-white/80 group-hover:text-white transition-colors">
                                        {contact.icon}
                                    </div>
                                    <div className="text-left">
                                        <div className="text-xs text-white/50">{contact.label}</div>
                                        <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                                            {contact.value}
                                        </div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        <div className="pt-8 border-t border-white/10">
                            <p className="text-sm text-white/40">
                                © {new Date().getFullYear()} {config.developer.name}. All rights reserved.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;


import React from 'react';
import { motion } from 'framer-motion';
import { config } from '../config.jsx';

const ContactPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
                Get In Touch
              </h1>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {config.contactInfo.map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.link || '#'}
                  target={contact.link ? "_blank" : undefined}
                  rel={contact.link ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-4 px-8 py-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                  <div className="text-white/80 group-hover:text-white transition-colors text-3xl">
                    {contact.icon}
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-white/50 mb-1">{contact.label}</div>
                    <div className="text-base font-medium text-white/80 group-hover:text-white transition-colors">
                      {contact.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;






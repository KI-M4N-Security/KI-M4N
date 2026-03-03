import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/KI-M4N-Security',
    icon: 'fab fa-github',
    color: '#00FF00',
    glowColor: '0 0 20px #00FF00, 0 0 40px #00FF00'
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@k-im4n',
    icon: 'fab fa-youtube',
    color: '#FF0000',
    glowColor: '0 0 20px #FF0000, 0 0 40px #FF0000'
  },
  {
    name: 'Liberapay',
    url: 'https://liberapay.com/K-im4n',
    icon: 'fas fa-heart',
    color: '#00FF00',
    glowColor: '0 0 20px #00FF00, 0 0 40px #00FF00'
  }
];

export default function SocialButtons() {
  return (
    <div className="fixed top-24 right-4 md:right-8 z-40 flex flex-col gap-3">
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
          className="group relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"
          style={{
            background: 'rgba(0, 0, 0, 0.8)',
            border: `2px solid ${social.color}`,
            borderRadius: '50%',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = social.glowColor;
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <i
            className={social.icon}
            style={{
              color: social.color,
              fontSize: '1.2rem',
              transition: 'all 0.3s ease'
            }}
          ></i>
          <span className="absolute right-full mr-3 px-2 py-1 bg-black border border-[#00FF00] text-[#00FF00] text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap rounded">
            {social.name}
          </span>
        </motion.a>
      ))}
    </div>
  );
}

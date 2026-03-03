import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ContactModal from './ContactModal.jsx';

export default function Header() {
  const [contactOpen, setContactOpen] = useState(false);
  const links = ['Home', 'About', 'Projects', 'Armory', 'Blog', 'Contact'];
  const [hovered, setHovered] = useState(null);

  const handleContactClick = (e, link) => {
    if (link === 'Contact') {
      e.preventDefault();
      setContactOpen(true);
    }
  };

  const getLinkHref = (link) => {
    if (link === 'Home') return '/KI-M4N/';
    if (link === 'Armory' || link === 'Blog' || link === 'Projects') return `/KI-M4N/${link.toLowerCase()}`;
    return `/#${link.toLowerCase()}`;
  };
  
  return (
    <>
      <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-[#00FF00]/20 flex justify-center p-4 md:p-6">
        <div className="flex gap-4 md:gap-16 flex-wrap justify-center items-center">
          {links.map(link => (
            <motion.a 
              key={link} 
              href={getLinkHref(link)}
              onClick={(e) => handleContactClick(e, link)}
              onMouseEnter={() => setHovered(link)}
              onMouseLeave={() => setHovered(null)}
              className="huge-link text-base md:text-2xl"
              style={{
                color: hovered === link ? '#00FF00' : 'transparent',
                WebkitTextStroke: hovered === link ? '0px' : '1px rgba(0, 255, 0, 0.3)',
                textShadow: hovered === link ? '0 0 20px rgba(0, 255, 0, 0.6)' : 'none',
                transform: hovered === link ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              {link}
            </motion.a>
          ))}
        </div>
      </nav>
      
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}

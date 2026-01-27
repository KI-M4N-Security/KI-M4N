import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  const links = ['Home', 'About', 'Projects', 'Armory', 'Contact'];
  const [hovered, setHovered] = useState(null);

  const getLinkHref = (link) => {
    if (link === 'Armory') return '/armory';
    return `/#${link.toLowerCase()}`;
  };
  
  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-[#00FF00]/20 flex justify-center p-6">
      <div className="flex gap-8 md:gap-24 flex-wrap justify-center">
        {links.map(link => (
          <motion.a 
            key={link} 
            href={getLinkHref(link)} 
            onMouseEnter={() => setHovered(link)}
            onMouseLeave={() => setHovered(null)}
            className="huge-link text-lg md:text-2xl"
            style={{
              color: hovered === link ? '#00FF00' : 'transparent',
              WebkitTextStroke: hovered === link ? '0px' : '1px rgba(0, 255, 0, 0.3)',
              textShadow: hovered === link ? '0 0 20px rgba(0, 255, 0, 0.6)' : 'none',
              transform: hovered === link ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            &nbsp;{link}&nbsp;
          </motion.a>
        ))}
      </div>
    </nav>
  );
}
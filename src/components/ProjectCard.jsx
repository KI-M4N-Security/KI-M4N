import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProjectCard({ project }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="h-80 w-full cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div 
        className="relative h-full w-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        
        {/* FRONT */}
        <div className="absolute inset-0 h-full w-full bg-black/40 border border-[#00FF00]/30 p-8 flex flex-col justify-between hover:border-[#00FF00] hover:shadow-[0_0_15px_rgba(0,255,0,0.2)] transition-all"
             style={{ backfaceVisibility: "hidden" }}>
          <div>
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-2xl font-bold text-white font-mono">{project.title}</h4>
              <span className="text-[#00FF00] text-xs border border-[#00FF00] px-2 py-1 rounded">{project.id}</span>
            </div>
            <p className="text-[#00FF00]/80 font-mono text-sm leading-relaxed">{project.desc}</p>
          </div>
          <div className="text-[#00FFFF] text-xs font-mono animate-pulse text-center mt-4">
            [ CLICK TO INSPECT SOURCE ]
          </div>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 h-full w-full bg-[#0a0a0a] border border-[#00FFFF]/50 p-6 flex flex-col"
             style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <h5 className="text-[#00FFFF] font-bold mb-2 font-mono text-sm border-b border-[#00FFFF]/30 pb-2">EXPLOIT_SNIPPET.cpp</h5>
          <pre className="flex-1 overflow-hidden text-[10px] text-gray-300 font-mono bg-black/50 p-2 rounded border border-white/10">
            {project.code || "// Access Denied: Snippet encrypted."}
          </pre>
          <div className="mt-4 flex gap-2">
             {project.tags.map(tag => (
                <span key={tag} className="text-[10px] bg-[#00FFFF]/10 text-[#00FFFF] px-2 py-1 rounded">{tag}</span>
             ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
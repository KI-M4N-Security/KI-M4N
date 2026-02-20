import React from 'react';

const SkillCard = ({ title, icon, level, desc }) => {
  // Helper to determine icon set (Solid vs Brands)
  const getIconClass = (iconName) => {
    if (!iconName) return 'fas fa-circle';
    const brands = ['python', 'java', 'js', 'react', 'node', 'linux', 'android', 'apple', 'windows', 'docker', 'git', 'brain', 'server', 'plug', 'desktop'];
    if (brands.includes(iconName.toLowerCase())) return `fab fa-${iconName}`;
    return `fas fa-${iconName}`;
  };

  return (
    <div className="w-full h-full bg-black/80 backdrop-blur-sm border border-[#00FF00]/30 p-6 rounded relative overflow-hidden group hover:border-[#00FF00] transition-all duration-300 flex flex-col items-center text-center">
      <div className="absolute inset-0 bg-[#00FF00]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col items-center mb-4 gap-2">
          <div className="text-3xl text-[#00FF00] mb-2">
            <i className={getIconClass(icon)}></i>
          </div>
          <br></br>
          <div className="text-xs font-mono text-[#00FF00] border border-[#00FF00] px-2 py-1 rounded bg-black/50">
            {level}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white uppercase mb-2 font-mono text-center">{title}</h3>
        <p className="text-[#00FF00]/70 font-mono text-sm leading-relaxed text-center">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default SkillCard;
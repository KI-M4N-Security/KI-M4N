import React, { useEffect, useState } from 'react';

export default function Terminal() {
  const [text, setText] = useState('');
  const fullText = "Welcome to my world, Operator. Clearance: Master's Verified. Loading exploits...";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, ++i));
      if (i === fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-[#00FF00] text-lg md:text-3xl min-h-[3rem]">
      <span className="mr-2">{'>'}</span>{text}<span className="animate-pulse text-[#00FFFF]">_</span>
    </div>
  );
}
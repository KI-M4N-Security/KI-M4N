import React, { useEffect, useRef } from 'react';

export default function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let drops = [];
    const fontSize = 10;
    const chars = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789";

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 2/3;
      
      const columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    };
    
    init();

    const draw = () => {
      // Translucent black background to create trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00FF00'; // Cyber green
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Randomly reset drop to top
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    
    window.addEventListener('resize', init);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', init);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
import React, { useState, useEffect } from 'react';

const heroStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Anonymous+Pro:wght@400;700&display=swap');

  .hero-container {
    height: 10vh;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: left;
    background-color: #000000;
    color: #39ff14;
  }

  .terminal-loader {
    display: flex;
    align-items: left;
    font-size: 2.5rem;
    font-family: 'Anonymous Pro', monospace;
  }

  .typewriter-text {
    overflow: visible;
    white-space: nowrap;
    margin: 0;
    animation: typing 3s steps(20);
  }

  .dynamic-text {
    margin-left: 1rem;
    font-weight: bold;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .hero-subtext {
    margin-top: 2rem;
    font-size: 0.9rem;
    color: rgba(57, 255, 20, 0.5);
    letter-spacing: 2px;
    font-family: 'Anonymous Pro', monospace;
  }
    
  .typewriter-text::after {
    content: '_';
    color: #39ff14;
    font-weight: bold;
    animation: blink-underscore 0.75s step-end infinite;
  }

  @keyframes typing {
    from { width: 30% }
    to { width: 15% }
  }

  @keyframes blink-underscore {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }
`;

export default function HeroTitle() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const titles = ["Fran M. Vazquez", "App/Web Developer", "Ethical Hacker"];
  const colors = ["#39ff14", "#ff9900", "#ff0033"];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % titles.length;
      const fullText = titles[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, titles, typingSpeed]);

  return (
    <>
      <style>{heroStyles}</style>
      <main className="hero-container font-mono">
        <div className="terminal-loader">
          <span className="typewriter-text">Hi there, I'm</span>
          <span className="dynamic-text typewriter-text" style={{ color: colors[loopNum % colors.length], animation: 'none', border: 'none' }}>
            {text}
          </span>
        </div>        
        <p className="hero-subtext">
          [SYSTEM_INFO]: "Master-level Cybersecurity specialist and Multiplatform Developer who masters chaos, leads teams, and deploys secure solutions before the threat arrives."
        </p>
      </main>
    </>
  );
}

import React, { useState } from 'react';

const tools = [
  { name: 'Cobalt Strike', category: 'Red Ops', desc: 'Adversary simulation & Red Team operations.', color: '#FF3333' },
  { name: 'Metasploit', category: 'Red Ops', desc: 'The world\'s most used penetration testing framework.', color: '#FF3333' },
  { name: 'Burp Suite', category: 'Web/Mobile', desc: 'The gold standard for web vulnerability scanning.', color: '#00FFFF' },
  { name: 'Nmap', category: 'Recon', desc: 'Network discovery and security auditing.', color: '#00FF00' },
  { name: 'BloodHound', category: 'Recon', desc: 'Active Directory trust relationship analysis.', color: '#00FF00' },
  { name: 'Wireshark', category: 'Blue Ops', desc: 'Deep packet inspection and network analysis.', color: '#0088FF' },
  { name: 'Wazuh', category: 'Blue Ops', desc: 'Unified XDR and SIEM protection.', color: '#0088FF' },
  { name: 'Ghidra', category: 'Red Ops', desc: 'SRE framework developed by the NSA.', color: '#A020F0' },
  { name: 'Frida', category: 'Web/Mobile', desc: 'Dynamic instrumentation toolkit for mobile RE.', color: '#FFA500' },
  { name: 'Hashcat', category: 'Red Ops', desc: 'Advanced password recovery and cracking.', color: '#FF3333' },
  { name: 'Docker', category: 'Dev/Ops', desc: 'Containerization for consistent environments.', color: '#2496ED' },
  { name: 'Git', category: 'Dev/Ops', desc: 'Distributed version control system.', color: '#F05032' },
  { name: 'Ollama', category: 'AI/LLM', desc: 'Local LLM inference engine. Run models offline.', color: '#FF6B6B' },
  { name: 'LangChain', category: 'AI/LLM', desc: 'Framework for building AI applications with memory.', color: '#FF6B6B' },
  { name: 'PyTorch', category: 'AI/LLM', desc: 'Deep learning framework for model training.', color: '#FF6B6B' },
  { name: 'Transformers', category: 'AI/LLM', desc: 'Hugging Face library for pre-trained models.', color: '#FF6B6B' },
  { name: 'RAG Pipeline', category: 'AI/LLM', desc: 'Retrieval-Augmented Generation for custom knowledge bases.', color: '#FF6B6B' },
  { name: 'MCP Server', category: 'MCP', desc: 'Model Context Protocol server deployment.', color: '#9B59B6' },
  { name: 'Anthropic SDK', category: 'MCP', desc: 'Claude API integration for AI workflows.', color: '#9B59B6' },
  { name: 'OpenAI API', category: 'MCP', desc: 'GPT model integration and fine-tuning.', color: '#9B59B6' },
  { name: 'Vector DB', category: 'MCP', desc: 'Pinecone/Chroma for embeddings storage.', color: '#9B59B6' },
  { name: 'Fedora', category: 'OS', desc: 'Primary workstation. RPM/DNF, SELinux, Cockpit.', color: '#51A2DA' },
  { name: 'Ubuntu/Debian', category: 'OS', desc: 'Server deployments. APT, systemd, UFW.', color: '#E95420' },
  { name: 'Arch Linux', category: 'OS', desc: 'Custom builds. Pacman, AUR, bleeding edge.', color: '#1793D1' },
  { name: 'Windows Server', category: 'OS', desc: 'AD, Exchange, Hyper-V management.', color: '#0078D4' },
  { name: 'REST APIs', category: 'Integration', desc: 'Custom API development and consumption.', color: '#00D4AA' },
  { name: 'GraphQL', category: 'Integration', desc: 'Flexible query language for APIs.', color: '#00D4AA' },
  { name: 'Webhook Automation', category: 'Integration', desc: 'Serverless event-driven integrations.', color: '#00D4AA' },
  { name: 'Cron/Systemd', category: 'Integration', desc: 'Task scheduling and service management.', color: '#00D4AA' },
];

const categories = ['All', 'Red Ops', 'Blue Ops', 'Recon', 'Web/Mobile', 'Dev/Ops', 'AI/LLM', 'MCP', 'OS', 'Integration'];

export default function Armory() {
  const [filter, setFilter] = useState('All');

  const filteredTools = filter === 'All' 
    ? tools 
    : tools.filter(t => t.category === filter);

  return (
    <div className="md:col-span-12 mt-12 border-t border-[#00FF00]/20 pt-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h3 className="text-2xl font-bold text-white font-mono flex items-center gap-2">
            <span className="text-[#00FF00]">{'>'}</span> ARSENAL <span className="text-[#00FF00] text-sm opacity-50">// TOP DEMAND</span>
        </h3>
        
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 font-mono border
                ${filter === cat 
                  ? 'bg-[#00FF00] text-black border-[#00FF00] shadow-[0_0_10px_rgba(0,255,0,0.4)]' 
                  : 'text-[#00FF00] border-[#00FF00]/30 hover:bg-[#00FF00] hover:text-black bg-transparent'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      <div className="tool-cards">
        {filteredTools.map(tool => (
          <article 
            key={tool.name} 
            className="tool-card"
            style={{ '--tool-color': tool.color }}
          >
            <div>
              <h3>{tool.name}</h3>
              <span className="category">{tool.category}</span>
              <p>{tool.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
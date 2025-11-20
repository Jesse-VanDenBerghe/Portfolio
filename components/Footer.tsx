import React from 'react';
import { CV_DATA } from '../constants';
import { Github, Linkedin, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'github': return <Github size={20} />;
      case 'linkedin': return <Linkedin size={20} />;
      case 'twitter': return <Twitter size={20} />;
      default: return null;
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-white font-bold text-lg mb-1">{CV_DATA.name}</h3>
          <p className="text-sm">{CV_DATA.tagline}</p>
        </div>
        
        <div className="flex gap-6">
          {CV_DATA.socials.map((social, idx) => (
            <a
              key={idx}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors"
            >
              {getIcon(social.icon)}
            </a>
          ))}
        </div>
        
        <div className="text-xs text-slate-600">
          &copy; {new Date().getFullYear()} Built with React, Tailwind & Gemini.
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Smartphone, Brain, Cloud, MapPin } from 'lucide-react';
import { CV_DATA } from '../constants';
import { CodeBackground } from './CodeBackground';

export const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative bg-slate-900 text-white overflow-hidden px-4">
      {/* Coding Animation Background */}
      <CodeBackground />
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[100px]" />
      </div>

      <div className="z-10 max-w-4xl w-full text-center space-y-8 flex flex-col items-center">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-[2rem] blur opacity-30 group-hover:opacity-60 transition duration-500" />
          <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-[2rem] border-2 border-slate-700/50 bg-slate-800 overflow-hidden shadow-2xl">
            <img 
              src={CV_DATA.avatar} 
              alt={CV_DATA.name}
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-emerald-400 font-medium tracking-widest uppercase mb-4">
            Hello, I am {CV_DATA.name}
          </h2>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-emerald-200">
            {CV_DATA.title}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {CV_DATA.tagline}
          </p>
          <div className="flex items-center gap-2 text-slate-400 text-sm bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700">
            <MapPin size={14} className="text-emerald-500" />
            {CV_DATA.location}
          </div>
        </motion.div>

        {/* Skill Icons Row */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center gap-8 pt-8"
        >
          <div className="flex flex-col items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors">
            <Smartphone size={32} />
            <span className="text-xs uppercase tracking-wide">Mobile</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors">
            <Brain size={32} />
            <span className="text-xs uppercase tracking-wide">Agentic AI</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors">
            <Cloud size={32} />
            <span className="text-xs uppercase tracking-wide">Cloud</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 animate-bounce text-slate-500"
      >
        <ArrowDown size={24} />
      </motion.div>
    </section>
  );
};
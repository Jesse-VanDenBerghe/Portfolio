import React from 'react';
import { motion } from 'framer-motion';
import { CV_DATA } from '../constants';
import { SectionHeader } from './SectionHeader';
import { Heart, Mountain, Quote, Gamepad2 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-slate-800/30">
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="About Me" subtitle="Bio & Interests" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Bio Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-slate-800 p-8 rounded-xl border border-slate-700 relative"
          >
            <Quote className="absolute top-4 left-4 text-slate-700 transform -scale-x-100" size={48} />
            <p className="text-slate-300 leading-relaxed relative z-10 text-lg italic">
              "{CV_DATA.about}"
            </p>
          </motion.div>

          {/* Hobbies Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Heart className="text-emerald-500" size={20} /> Hobbies
            </h3>
            <div className="space-y-3">
              {CV_DATA.hobbies.map((hobby, idx) => (
                <div 
                  key={idx} 
                  className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex items-center gap-3 text-slate-300 hover:border-emerald-500 transition-colors"
                >
                  {getHobbyIcon(hobby)}
                  <span>{hobby}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const getHobbyIcon = (hobby: string) => {
  const lower = hobby.toLowerCase();
  if (lower.includes('dungeons') || lower.includes('dragons')) return <Gamepad2 size={18} className="text-purple-400" />;
  if (lower.includes('hiking') || lower.includes('running')) return <Mountain size={18} className="text-emerald-400" />;
  return <Heart size={18} className="text-blue-400" />;
};

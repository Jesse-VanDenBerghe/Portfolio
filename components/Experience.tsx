import React from 'react';
import { motion } from 'framer-motion';
import { CV_DATA } from '../constants';
import { SectionHeader } from './SectionHeader';
import { Briefcase, Calendar } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Experience" subtitle="My Journey" />

        <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-slate-800">
          {CV_DATA.experience.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              {/* Dot */}
              <div className="absolute left-0 md:left-1/2 w-10 h-10 bg-slate-900 border-2 border-emerald-500 rounded-full flex items-center justify-center z-10 md:-translate-x-1/2 shadow-lg shadow-emerald-900/20">
                <Briefcase size={16} className="text-emerald-500" />
              </div>

              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-slate-800 rounded-xl border border-slate-700 shadow-xl hover:shadow-2xl hover:border-slate-600 transition-all ml-16 md:ml-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h3 className="font-bold text-xl text-white">{item.role}</h3>
                  <div className="flex items-center gap-1 text-slate-400 text-sm mt-1 md:mt-0">
                    <Calendar size={14} />
                    <span>{item.period}</span>
                  </div>
                </div>
                <h4 className="text-emerald-400 font-medium mb-4">{item.company}</h4>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech, tIdx) => (
                    <span key={tIdx} className="text-xs text-slate-400 bg-slate-900 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

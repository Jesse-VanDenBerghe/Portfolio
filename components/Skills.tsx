import React from 'react';
import { motion } from 'framer-motion';
import { CV_DATA } from '../constants';
import { SectionHeader } from './SectionHeader';

export const Skills: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Technical Expertise" subtitle="My Stack" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CV_DATA.skills.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-colors"
            >
              <h3 className="text-xl font-semibold text-emerald-400 mb-6">{category.category}</h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1 bg-slate-700 text-slate-200 rounded-full text-sm font-medium border border-slate-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

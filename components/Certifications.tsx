import React from 'react';
import { motion } from 'framer-motion';
import { CV_DATA } from '../constants';
import { SectionHeader } from './SectionHeader';
import { Award } from 'lucide-react';

export const Certifications: React.FC = () => {
  if (!CV_DATA.certifications || CV_DATA.certifications.length === 0) return null;

  return (
    <section className="py-20 px-4 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Certifications" subtitle="Continuous Learning" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CV_DATA.certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-4 bg-slate-800/30 p-6 rounded-xl border border-slate-700/50 hover:border-emerald-500/30 transition-all"
            >
              <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400">
                <Award size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-100">{cert.name}</h3>
                <p className="text-emerald-400 text-sm mb-1">{cert.issuer}</p>
                <p className="text-slate-400 text-sm">{cert.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { CV_DATA } from '../constants';
import { SectionHeader } from './SectionHeader';
import { ExternalLink } from 'lucide-react';

export const Projects: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Featured Projects" subtitle="What I've Built" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CV_DATA.projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-emerald-500 transition-all"
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  {project.title}
                  {project.link && <ExternalLink size={16} className="text-slate-500 hover:text-emerald-400 cursor-pointer" />}
                </h3>
                <p className="text-slate-400 text-sm mb-4 min-h-[80px]">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-xs font-medium text-emerald-300 bg-emerald-900/30 px-2 py-1 rounded">
                      {tag}
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

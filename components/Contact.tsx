import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, ArrowRight } from 'lucide-react';
import { CV_DATA } from '../constants';
import { SectionHeader } from './SectionHeader';

export const Contact: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'github': return <Github size={24} />;
      case 'linkedin': return <Linkedin size={24} />;
      case 'twitter': return <Twitter size={24} />;
      default: return null;
    }
  };

  return (
    <section className="py-24 px-4 bg-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      
      <div className="max-w-4xl mx-auto text-center">
        <SectionHeader title="Get In Touch" subtitle="Let's Connect" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 md:p-12 shadow-2xl"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Interested in working together?
          </h3>
          
          <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions. 
            Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          <div className="flex flex-col items-center gap-8">
            <motion.a
              href={`mailto:${CV_DATA.email}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-emerald-500/25"
            >
              <Mail size={20} />
              <span>Say Hello</span>
              <ArrowRight size={20} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
            </motion.a>

            <div className="flex items-center gap-6 mt-4">
              {CV_DATA.socials.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, color: '#34d399' }}
                  className="text-slate-400 hover:text-emerald-400 transition-colors p-2"
                  title={social.platform}
                >
                  {getIcon(social.icon)}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
import React from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Certifications } from './components/Certifications';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { AgentChat } from './components/AgentChat';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-emerald-500/30">
      <Hero />
      <About />
      <Skills />
      <Certifications />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
      <AgentChat />
    </main>
  );
};

export default App;
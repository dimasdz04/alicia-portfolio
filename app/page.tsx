"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, PenTool, Layers, X, ChevronRight } from 'lucide-react';
import ProjectCard3D from '../components/ProjectCard3D';
import TypingTextLoop from '../components/TypingTextLoop';
import CircularGallery from '../components/CircularGallery';
import StaggeredMenu from '../components/StaggeredMenu';

const committeeData = [
  { 
    image: 'https://picsum.photos/seed/drone/800/600?grayscale', 
    text: 'Drone Racing',
    desc: 'Hardware Division. Managed drone repairs, frequency tuning, and track obstacle setups for the National FPV Drone Racing Championship 2023. Responsible for ensuring all video transmitters (VTX) operated on non-interfering channels.'
  },
  { 
    image: 'https://picsum.photos/seed/iot/800/600?grayscale', 
    text: 'IoT Seminar',
    desc: 'Staff Member. Coordinated logistics, microcontroller hardware demonstrations, and speaker equipment for a campus-wide IoT seminar attended by 500+ students. Assisted in live coding demonstrations using ESP32.'
  },
  { 
    image: 'https://picsum.photos/seed/robot/800/600?grayscale', 
    text: 'Robotics Comp',
    desc: 'Head of Logistics. Ensured all participating teams had required spare parts, sensors, and power supplies throughout a grueling 48-hour robotics hackathon. Managed inventory and fast-track 3D printing requests for participants.'
  }
];

// NAMA MENU SUDAH DIGANTI
const menuItems = [
  { label: 'Me', ariaLabel: 'Go to Me section', link: '#me' },
  { label: 'Specs', ariaLabel: 'Go to Specs section', link: '#specs' },
  { label: 'Experience', ariaLabel: 'Go to Experience section', link: '#experience' },
  { label: 'R&D', ariaLabel: 'Go to Projects section', link: '#projects' }
];

const socialItems = [
  { label: 'GitHub', link: 'https://github.com/dimasdz04' },
  { label: 'LinkedIn', link: '#' },
  { label: 'Email', link: '#' }
];

export default function Portfolio() {
  const [activeExperience, setActiveExperience] = useState<number | null>(null);

  return (
    <main className="min-h-screen selection:bg-cyan-500/30">
      
      {/* MENU STAGGERED FIXED */}
      <StaggeredMenu
        isFixed={true}
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#06b6d4" 
        openMenuButtonColor="#0f172a" 
        changeMenuColorOnOpen={true}
        colors={['#1e293b', '#0f172a']} 
        accentColor="#06b6d4" 
        logoUrl="/file.svg" 
      />

      {/* HERO SECTION - Ditambahkan id="me" */}
      <section id="me" className="min-h-screen flex items-center px-8 md:px-24">
        <div className="max-w-6xl w-full z-10 flex flex-col-reverse md:flex-row items-center justify-between gap-12 mt-12 md:mt-0">
          
          {/* Bagian Kiri: Teks */}
          <div className="w-full md:w-[55%]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-cyan-400 mb-6 font-mono"
            >
              <Terminal size={20} />
              <span>&gt; sys.init(alicia_maharani)</span>
            </motion.div>
            <TypingTextLoop />
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="text-lg text-slate-400 terminal-text leading-relaxed mt-4"
            >
              Computer Engineering Tech student at SV IPB. 
              Rooted in structural precision from SMK 1 Cibinong (Architecture). 
              Currently engineering IoT devices, custom drones, and 3D hardware components.
            </motion.p>
          </div>

          {/* Bagian Kanan: Foto Profil */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="w-full md:w-[45%] flex justify-center md:justify-end md:ml-auto md:translate-x-12 lg:translate-x-20"
          >
            <div className="relative w-64 md:w-80 h-auto group">
              <div className="absolute inset-0 bg-cyan-500/20 blur-[60px] rounded-full z-0 group-hover:bg-cyan-400/30 transition-colors duration-700"></div>
              <img 
                src="/dimas.png" 
                alt="Profile"
                className="w-full h-auto object-contain relative z-10 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* SECTION SPECS & SKILLS */}
      <section id="specs" className="py-24 px-8 md:px-24 border-t border-slate-800/50 bg-slate-900/30 backdrop-blur-sm relative z-20">
        <h2 className="text-3xl font-bold mb-12 font-mono flex items-center gap-4">
          <span className="text-orange-500">01.</span> Specs & Skills
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SkillBadge icon={<Cpu />} title="IoT Systems" desc="ESP32, Sensors, Logic" />
          <SkillBadge icon={<Layers />} title="Drone Assembly" desc="Flight Controllers, FPV" />
          <SkillBadge icon={<PenTool />} title="Fusion 360" desc="3D Hardware CAD" />
          <SkillBadge icon={<Layers />} title="Architecture" desc="Structural Blueprints" />
        </div>
      </section>

      {/* SECTION GALLERY - Ditambahkan id="experience" dan diganti judulnya */}
      <section id="experience" className="py-24 border-t border-slate-800/50 relative bg-slate-950 flex flex-col items-center">
        <div className="w-full px-8 md:px-24 mb-8">
           <h2 className="text-3xl font-bold font-mono">
            <span className="text-cyan-500">02.</span> Experience
          </h2>
          <p className="text-slate-400 mt-2 font-mono text-sm">&gt; Drag to rotate. Click to inspect data.</p>
        </div>
        
        <div style={{ height: '500px', width: '100%', position: 'relative' }}>
          <CircularGallery 
            items={committeeData}
            bend={3} 
            textColor="#ffffff" 
            borderRadius={0.05} 
            scrollEase={0.1} 
            onClick={(index) => setActiveExperience(index)} 
          />
        </div>
      </section>

      {/* POP-UP MODAL */}
      <AnimatePresence>
        {activeExperience !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm"
            onClick={() => setActiveExperience(null)} 
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row shadow-[0_0_40px_rgba(6,182,212,0.15)]"
              onClick={(e) => e.stopPropagation()} 
            >
              <div className="w-full md:w-1/2 h-[300px] md:h-[400px] relative">
                <img 
                  src={committeeData[activeExperience].image} 
                  alt={committeeData[activeExperience].text}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
                <button 
                  onClick={() => setActiveExperience(null)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>

                <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2 font-mono">
                  <ChevronRight size={24} />
                  {committeeData[activeExperience].text}
                </h3>
                
                <div className="h-px w-16 bg-orange-500 mb-6"></div>

                <p className="text-slate-300 leading-relaxed font-mono text-sm">
                  {committeeData[activeExperience].desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-24 px-8 md:px-24 border-t border-slate-800/50 bg-slate-900/30">
        <h2 className="text-3xl font-bold mb-12 font-mono">
          <span className="text-orange-500">03.</span> Hardware & R&D
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProjectCard3D 
            title="Custom FPV Frame"
            description="Aerodynamic frame designed in Fusion 360. Optimized for lightweight racing."
            modelUrl="/models/placeholder.glb" 
            tags={["Fusion 360", "Drone", "3D Printing"]}
          />
          <ProjectCard3D 
            title="Smart Hub Casing"
            description="Custom 3D-printed enclosure for ESP32 and climate sensors."
            modelUrl="/models/placeholder.glb" 
            tags={["Hardware Design", "IoT"]}
          />
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-orange-500/50 transition-colors">
            <div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">Greenhouse Logic</h3>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">Integrated soil moisture sensors and relays to automate water pumps. Microcontroller programmed in C++.</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">C++</span>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">ESP32</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-8 md:px-24 border-t border-slate-800 bg-slate-950 flex flex-col items-end text-right">
        <div className="flex gap-8 text-slate-400 mb-6 font-mono text-sm">
          <a href="#" className="hover:text-cyan-400 transition">GitHub</a>
          <a href="#" className="hover:text-cyan-400 transition">LinkedIn</a>
          <a href="#" className="hover:text-cyan-400 transition">Email</a>
        </div>
        <p className="font-mono text-slate-600 text-sm">
          &gt; System offline. End of transmission.
        </p>
      </footer>
    </main>
  );
}

export function SkillBadge({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-6 border border-slate-800 bg-slate-950 rounded-xl hover:border-slate-600 transition-colors group">
      <div className="text-orange-500 mb-4 group-hover:scale-110 transition-transform origin-left">{icon}</div>
      <h3 className="text-lg font-bold text-slate-200 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 font-mono">{desc}</p>
    </div>
  );
}
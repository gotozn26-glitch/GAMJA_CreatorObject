/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ChevronRight, Wrench, ArrowRight } from 'lucide-react';

export default function App() {
  const tools = [
    { 
      name: "Rotation", 
      desc: "오브젝트를 정교하게 회전시킵니다", 
      image: "https://picsum.photos/seed/cube/600/400",
      active: true 
    },
    { 
      name: "Object Create", 
      desc: "오브젝트를 생성합니다", 
      image: "https://picsum.photos/seed/puppy/600/400",
      active: true 
    },
    { 
      name: "SB Director", 
      desc: "스토리보드로 장면을 생성합니다", 
      image: "https://picsum.photos/seed/storyboard/600/400",
      active: true 
    },
    { 
      name: "Varivariaition", 
      desc: "다양한 사이즈로 베리에이션합니다", 
      image: null,
      active: false 
    },
    { 
      name: "...", 
      desc: "준비중 입니다", 
      image: null,
      active: false 
    },
    { 
      name: "...", 
      desc: "준비중 입니다", 
      image: null,
      active: false 
    },
  ];

  const scripts = [
    { title: "Init_System.py", size: "7.2 KB" },
    { title: "Data_Parser.js", size: "4.5 KB" },
    { title: "Auth_Guard.ts", size: "12.1 KB" },
    { title: "DB_Sync.sql", size: "3.2 KB" },
  ];

  return (
    <div className="min-h-screen bg-white text-[#111111] font-sans selection:bg-orange-500/10 overflow-x-hidden relative">
      {/* Sophisticated Atmospheric Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-orange-100/40 blur-[120px]" />
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-rose-50/50 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-50/40 blur-[100px]" />
        <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] rounded-full bg-amber-50/30 blur-[80px]" />
      </div>

      <main className="relative z-10 max-w-[1240px] mx-auto px-8 flex flex-col pt-[15vh]">
        
        {/* Header Section - Left Aligned, Clean */}
        <header className="mb-[18vh] text-left max-w-4xl space-y-8">
          <div className="h-8" /> {/* Maintain top padding/margin equivalent to removed elements */}
          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[72px] md:text-[100px] font-medium tracking-tighter uppercase leading-[0.85]"
            >
              <span className="block">찰싹찰싹</span>
              <span className="font-bold block mt-[10px]">AI STUDIO</span>
            </motion.h1>
          </div>
          <div className="h-[20vh]" /> {/* Maintain the airy spacing previously occupied by description and button */}
        </header>

        {/* 2단: Tools Grid (3x2) - Empty Photo Areas */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-24">
          {tools.map((tool, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/2] bg-white rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative flex items-center justify-center mb-8 border border-black/[0.03] overflow-hidden">
                {/* Empty photo part as requested */}
                <div className="w-full h-full bg-zinc-50/50 flex items-center justify-center">
                  <div className="w-12 h-12 bg-black/[0.02] rounded-full" />
                </div>
              </div>
              <div className="space-y-3 px-2">
                <h3 className="text-2xl font-bold tracking-tight leading-tight">{tool.name}</h3>
                <p className="text-[1rem] text-black/40 font-medium leading-relaxed">{tool.desc}</p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* 3단: Scripts Section - Minimalist without description */}
        <section className="mt-[150px] mb-[150px] border-t border-black/[0.05] pt-24 space-y-16">
          <div className="flex flex-col items-start text-left">
            <h2 className="text-4xl font-bold tracking-tight">Script Library</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {scripts.map((script, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -8 }}
                className="bg-white/40 backdrop-blur-xl rounded-[32px] p-8 border border-black/[0.05] shadow-sm flex flex-col justify-between min-h-[200px] group transition-all duration-500"
              >
                <div>
                  <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center mb-6 group-hover:bg-black transition-all duration-500">
                    <ArrowRight className="w-4 h-4 text-black group-hover:text-white" />
                  </div>
                  <h4 className="text-lg font-bold tracking-tight">{script.title}</h4>
                </div>
                <div className="mt-4 flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-black/20 uppercase tracking-widest">{script.size} — RAW SOURCE</span>
                  <div className="h-[1px] w-full bg-black/[0.05] overflow-hidden">
                    <div className="h-full w-0 group-hover:w-full bg-black transition-all duration-700 ease-in-out" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer - Sophisticated dark pill */}
        <footer className="mt-auto bg-[#111111] rounded-full px-12 py-6 flex flex-col md:flex-row items-center justify-between text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase mb-12 shadow-2xl">
          <span>Last Update 26.04.21 — Operational</span>
          <div className="flex items-center gap-8 mt-4 md:mt-0">
            <button className="hover:text-white transition-colors">Privacy</button>
            <button className="hover:text-white transition-colors">Nodes</button>
            <button className="flex items-center gap-2 hover:text-white transition-colors">
              Report Feedback <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}

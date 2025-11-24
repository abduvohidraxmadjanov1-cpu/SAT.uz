
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis } from 'recharts';
import { Calendar, CheckCircle, Clock, Target, ArrowRight, Brain, Layers, Zap } from 'lucide-react';
import SkillGraph from './SkillGraph';
import IoTFocusMode from './IoTFocusMode';
import { Page } from '../types';

interface CourseDashboardProps {
    setPage?: (page: Page) => void;
}

const DATA_BAR = [
  { name: 'Du', score: 1320 },
  { name: 'Se', score: 1350 },
  { name: 'Ch', score: 1410 },
  { name: 'Pa', score: 1380 },
  { name: 'Ju', score: 1520 },
  { name: 'Sh', score: 1580 },
  { name: 'Ya', score: 1600 },
];

const CourseDashboard: React.FC<CourseDashboardProps> = ({ setPage }) => {
  const navigateTo = (page: Page) => {
      if (setPage) setPage(page);
  };

  return (
    <div className="pt-32 pb-12 px-6 lg:px-8 max-w-[1800px] mx-auto min-h-screen bg-void">
      
      {/* Mission Control Header */}
      <div className="flex flex-col lg:flex-row justify-between items-end mb-10 gap-6 pb-8 border-b border-white/5">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                <span className="text-xs font-mono text-green-500 uppercase tracking-widest">System Online</span>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight">MENING KABINETIM</h1>
        </div>
        <div className="flex items-center gap-4">
            <button onClick={() => navigateTo(Page.SCHEDULER)} className="group px-5 py-3 bg-void-lighter border border-white/10 rounded-xl hover:border-white/30 transition-all">
                <Calendar size={20} className="text-gray-400 group-hover:text-white" />
            </button>
            <button onClick={() => navigateTo(Page.PRACTICE)} className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:scale-105 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                <Zap size={18} fill="currentColor" /> DAVOM ETISH
            </button>
        </div>
      </div>
      
      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
         
         {/* 1. Score Trend (Glass Diamond) */}
         <div className="md:col-span-4 lg:col-span-4 glass-diamond rounded-3xl p-8 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Prognoz (Score)</div>
                    <div className="text-6xl font-black text-white tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">1540</div>
                </div>
                <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-lg text-xs font-bold border border-green-500/20">
                    +40 Ball
                </div>
            </div>
            <div className="h-40 w-full -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={DATA_BAR}>
                        <defs>
                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Tooltip 
                            contentStyle={{backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px', fontSize: '12px'}} 
                            itemStyle={{color: '#00f0ff'}}
                            cursor={{stroke: 'rgba(255,255,255,0.1)'}}
                        />
                        <Area type="monotone" dataKey="score" stroke="#00f0ff" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
         </div>

         {/* 2. Focus Monitor */}
         <div className="md:col-span-2 lg:col-span-3 bg-black rounded-3xl border border-white/10 relative overflow-hidden group shadow-lg">
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div> 
                <span className="text-[10px] font-bold text-white uppercase tracking-widest font-mono">LIVE FEED</span>
            </div>
            <IoTFocusMode />
         </div>

         {/* 3. Quick Stats */}
         <div className="md:col-span-3 lg:col-span-2 flex flex-col gap-6">
             <div className="flex-1 bg-void-lighter border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center text-center relative group hover:border-cyber/50 transition-all">
                 <div className="mb-2 p-3 bg-cyber/10 rounded-full text-cyber group-hover:scale-110 transition-transform">
                    <Target size={24} />
                 </div>
                 <div className="text-3xl font-black text-white">85%</div>
                 <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Aniqlik</div>
             </div>
             <div className="flex-1 bg-void-lighter border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center text-center relative group hover:border-purple-500/50 transition-all">
                 <div className="mb-2 p-3 bg-purple-500/10 rounded-full text-purple-500 group-hover:scale-110 transition-transform">
                    <Brain size={24} />
                 </div>
                 <div className="text-3xl font-black text-white">142</div>
                 <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Mavzular</div>
             </div>
         </div>

         {/* 4. Daily Progress */}
         <div className="md:col-span-3 lg:col-span-3 bg-void-lighter border border-white/10 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden">
             <div className="absolute right-0 top-0 p-32 bg-blue-500/5 blur-[50px] rounded-full pointer-events-none"></div>
             <div className="flex justify-between items-center mb-6 relative z-10">
                 <div className="text-gray-400 text-xs font-bold uppercase flex items-center gap-2">
                    <Clock size={14} /> Kunlik Maqsad
                 </div>
                 <span className="text-xs font-bold text-white bg-white/5 px-2 py-1 rounded">3.5 / 4 soat</span>
             </div>
             <div className="w-full bg-black h-3 rounded-full overflow-hidden mb-4 border border-white/5">
                 <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyber h-full w-[85%] shadow-[0_0_20px_rgba(0,240,255,0.3)]"></div>
             </div>
             <p className="text-gray-400 text-xs leading-relaxed relative z-10">
                 Juda yaxshi. Yana <span className="text-white font-bold">2 ta modul</span> tugatsangiz, kunlik rejaga yetasiz.
             </p>
         </div>

         {/* 5. Skill Matrix */}
         <div className="md:col-span-3 lg:col-span-3 lg:row-span-2 glass-diamond rounded-3xl p-4 relative overflow-hidden">
             <div className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-2 ml-4 mt-4 z-10">Bilimlar Xaritasi</div>
             <div className="h-72 w-full">
                <SkillGraph />
             </div>
         </div>

         {/* 6. Modules List */}
         <div className="md:col-span-6 lg:col-span-5 lg:row-span-2 bg-void-lighter border border-white/10 rounded-3xl p-8">
             <div className="flex justify-between items-center mb-8">
                 <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                     <Layers size={16} className="text-cyber" /> Faol Kurslar
                 </h3>
                 <span className="text-[10px] text-gray-500 font-mono bg-white/5 px-2 py-1 rounded">4 TA JARAYONDA</span>
             </div>
             <div className="space-y-4">
                 {[
                     { title: "Chiziqli Tenglamalar", prog: 90, color: "bg-blue-500", type: "Math" },
                     { title: "Dalillar Bilan Ishlash", prog: 45, color: "bg-purple-500", type: "Reading" },
                     { title: "Standart Ingliz Tili", prog: 20, color: "bg-green-500", type: "Writing" },
                     { title: "Ma'lumotlar Tahlili", prog: 70, color: "bg-yellow-500", type: "Math" }
                 ].map((mod, i) => (
                     <div key={i} onClick={() => navigateTo(Page.VIDEO_LESSON)} className="group cursor-pointer bg-black/40 p-4 rounded-2xl border border-white/5 hover:border-white/20 transition-all hover:bg-black/60 flex items-center justify-between hover:translate-x-1">
                         <div className="flex items-center gap-4">
                             <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black bg-white/5 text-gray-400 border border-white/5`}>
                                 {mod.type.substring(0,1)}
                             </div>
                             <div>
                                 <div className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors">{mod.title}</div>
                                 <div className="text-[10px] text-gray-500 font-mono mt-0.5">Modul {i+1}</div>
                             </div>
                         </div>
                         <div className="flex items-center gap-4">
                             <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                 <div className={`${mod.color} h-full`} style={{width: `${mod.prog}%`}}></div>
                             </div>
                             <ArrowRight size={14} className="text-gray-600 group-hover:text-white transition-colors" />
                         </div>
                     </div>
                 ))}
             </div>
         </div>

         {/* 7. Recommendation AI */}
         <div className="md:col-span-6 lg:col-span-4 bg-gradient-to-br from-cyber/5 to-transparent border border-cyber/20 rounded-3xl p-8 flex items-center gap-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-cyber/10 rounded-full blur-[40px] pointer-events-none"></div>
             <div className="p-4 bg-cyber text-black rounded-2xl shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                 <Brain size={32} />
             </div>
             <div className="relative z-10">
                 <h4 className="text-white font-bold mb-1">AI Tavsiyasi</h4>
                 <p className="text-gray-400 text-sm leading-relaxed mb-3">
                     Siz "Inference" savollarida ko'p ikkilanyapsiz. Maxsus mashqni bajarishni tavsiya qilaman.
                 </p>
                 <button onClick={() => navigateTo(Page.PRACTICE)} className="text-xs font-bold text-cyber uppercase tracking-wider flex items-center gap-1 hover:text-white transition-colors group">
                     Mashqni Boshlash <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                 </button>
             </div>
         </div>

      </div>
    </div>
  );
};

export default CourseDashboard;
    
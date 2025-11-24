
import React, { useState, useEffect } from 'react';
import { Users, Code, Cpu, Globe, Award, Zap, Brain, Target, Sparkles, ArrowRight, Activity, ShieldCheck, Rocket } from 'lucide-react';

const TEAM = [
    { role: "CEO & ARCHITECT", name: "AI ORCHESTRATOR ALPHA", desc: "Core System Intelligence v9.0", color: "text-cyber", status: "ONLINE" },
    { role: "HEAD OF LEARNING", name: "PROFESSOR X-AI", desc: "Adaptive Curriculum Engine", color: "text-purple-400", status: "PROCESSING" },
    { role: "SECURITY CHIEF", name: "SENTINEL PROTOCOL", desc: "Quantum Encryption Layer", color: "text-red-500", status: "GUARDING" },
    { role: "GLOBAL LIAISON", name: "ADMISSIONS BOT V4", desc: "University Matching Algorithm", color: "text-green-400", status: "CONNECTING" }
];

const PILLARS = [
    { 
        title: "TEXNOLOGIK USTUNLIK", 
        desc: "3000 qavatli neyron tarmoq va 10^40 operatsiya/sekund tezlikdagi hisoblash quvvati. Biz ta'limni 'Fan' emas, 'Dasturlash' deb qabul qilamiz.",
        icon: Cpu,
        color: "text-cyber",
        border: "border-cyber/30"
    },
    { 
        title: "PSIXOLOGIK ADAPTATSIYA", 
        desc: "Har bir o'quvchi — alohida olam. Bizning AI sizning DNK darajangizdagi o'rganish uslubingizni (Visual, Auditory, Kinesthetic) aniqlaydi.",
        icon: Brain,
        color: "text-purple-500",
        border: "border-purple-500/30"
    },
    { 
        title: "GLOBAL INTEGRATSIYA", 
        desc: "Toshkentdan turib Harvard, MIT va Oxford darvozalarini ochish. Biz chegara bilmaydigan bilim ekotizimini yaratdik.",
        icon: Globe,
        color: "text-blue-500",
        border: "border-blue-500/30"
    }
];

const AboutPage: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({ algo: 0, companies: 0, accuracy: 0 });

  useEffect(() => {
    setMounted(true);
    
    // Animated Counters
    const interval = setInterval(() => {
        setStats(prev => ({
            algo: Math.min(100, prev.algo + 1), // Represents 10^40 scale visually
            companies: Math.min(7000, prev.companies + 100),
            accuracy: Math.min(100, prev.accuracy + 1)
        }));
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black pt-24 px-4 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
            
            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyber/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
            
            {/* Hero Mission Statement */}
            <div className={`text-center mb-24 relative z-10 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                    <Sparkles size={14} className="text-yellow-400" />
                    <span className="text-xs font-bold text-gray-300 tracking-[0.2em] uppercase">Established 2024 • Tashkent</span>
                 </div>
                 
                 <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                     BIZNING <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber via-white to-purple-500 animate-gradient">MISSIYAMIZ</span>
                 </h1>
                 
                 <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light">
                     Biz shunchaki vebsayt yaratmadik. Biz O'zbekiston yoshlari uchun <span className="text-white font-bold">Cheksiz Imkoniyatlar Ekotizimini</span> bunyod etdik. 
                     Maqsadimiz — sun'iy intellekt qudrati bilan har bir o'quvchini <span className="text-cyber">Global Liderga</span> aylantirish.
                 </p>
            </div>

            {/* The 3 Pillars (Manifesto) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 relative z-10">
                {PILLARS.map((pillar, idx) => (
                    <div 
                        key={idx} 
                        className={`bg-black/40 backdrop-blur-xl border ${pillar.border} p-8 rounded-3xl group hover:bg-white/5 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className={`w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center mb-6 ${pillar.color} shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-500`}>
                            <pillar.icon size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-wide">{pillar.title}</h3>
                        <p className="text-gray-400 leading-relaxed border-l-2 border-white/10 pl-4 group-hover:border-cyber transition-colors">
                            {pillar.desc}
                        </p>
                    </div>
                ))}
            </div>

            {/* Live Neural Stats */}
            <div className="bg-void-lighter border border-white/10 rounded-[40px] p-12 mb-32 relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-10"></div>
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Activity size={300} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                    <div className="text-center">
                        <div className="flex justify-center mb-4 text-cyber">
                            <Code size={48} />
                        </div>
                        <div className="text-5xl md:text-6xl font-black text-white mb-2 font-mono">
                            10<sup className="text-3xl text-cyber">40</sup>
                        </div>
                        <p className="text-sm text-gray-500 uppercase tracking-[0.3em] font-bold">Algoritmik Aniqlik</p>
                    </div>
                    
                    <div className="text-center">
                        <div className="flex justify-center mb-4 text-purple-500">
                            <Globe size={48} />
                        </div>
                        <div className="text-5xl md:text-6xl font-black text-white mb-2 font-mono">
                            {stats.companies.toLocaleString()}+
                        </div>
                        <p className="text-sm text-gray-500 uppercase tracking-[0.3em] font-bold">Global Kompaniyalar Tajribasi</p>
                    </div>

                    <div className="text-center">
                        <div className="flex justify-center mb-4 text-green-500">
                            <ShieldCheck size={48} />
                        </div>
                        <div className="text-5xl md:text-6xl font-black text-white mb-2 font-mono">
                            {stats.accuracy}%
                        </div>
                        <p className="text-sm text-gray-500 uppercase tracking-[0.3em] font-bold">Kvant Xavfsizlik</p>
                    </div>
                </div>
            </div>

            {/* The AI Leadership */}
            <div className="mb-32">
                <h2 className="text-4xl font-black text-white mb-16 text-center flex items-center justify-center gap-4">
                    <Users className="text-cyber" />
                    <span className="tracking-tighter">NEURAL ARCHITECTS</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {TEAM.map((member, idx) => (
                        <div key={idx} className="bg-black border border-white/10 rounded-2xl p-1 relative overflow-hidden group hover:border-cyber/50 transition-all">
                            {/* Scanline Effect */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber/5 to-transparent h-full w-full -translate-y-full group-hover:animate-scan pointer-events-none"></div>
                            
                            <div className="bg-void-lighter rounded-xl p-6 h-full flex flex-col items-center text-center relative z-10">
                                <div className="absolute top-4 right-4 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                    <span className="text-[10px] font-mono text-green-500">{member.status}</span>
                                </div>

                                <div className={`w-20 h-20 rounded-full bg-black border-2 border-white/10 flex items-center justify-center mb-6 ${member.color} shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform`}>
                                    <Cpu size={40} />
                                </div>
                                
                                <h3 className="text-lg font-black text-white mb-1 font-mono">{member.name}</h3>
                                <p className={`text-xs font-bold uppercase mb-4 ${member.color}`}>{member.role}</p>
                                <p className="text-gray-500 text-sm leading-snug">{member.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Call to Action - Manifesto */}
            <div className="relative rounded-[3rem] overflow-hidden border border-white/20 group">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyber/20 via-black to-purple-900/20 opacity-50"></div>
                
                <div className="relative z-10 p-12 md:p-24 text-center">
                    <Rocket size={64} className="text-white mx-auto mb-8 animate-float" />
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                        KELAJAKNI <span className="text-cyber">KODLASH</span> VAQTI KELDI
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
                        An'anaviy ta'lim eskirgan. Biz bilan birga o'rganishning "Neural Download" davriga qadam qo'ying. 
                        Hech qanday chegara yo'q. Faqat sof ilm va texnologiya.
                    </p>
                    <button className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-[0_0_50px_rgba(255,255,255,0.3)] flex items-center gap-3 mx-auto">
                        <Zap size={24} fill="currentColor" />
                        TIZIMGA ULANISH
                        <ArrowRight size={24} />
                    </button>
                </div>
            </div>

            {/* System Footer */}
            <div className="mt-12 flex justify-center items-center gap-4 text-xs font-mono text-gray-600">
                <span>SYS_ID: SAT-UZ-CORE-V4</span>
                <span>•</span>
                <span>LATENCY: 1.2ms</span>
                <span>•</span>
                <span className="text-green-500">ALL SYSTEMS OPERATIONAL</span>
            </div>

        </div>
    </div>
  );
};

export default AboutPage;

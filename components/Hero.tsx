
import React, { useEffect, useState, useRef } from 'react';
import { HERO_STATS } from '../constants';
import { ArrowRight, PlayCircle, CheckCircle, Award, Star, GraduationCap } from 'lucide-react';
import { Page } from '../types';

interface HeroProps {
  setPage: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ setPage }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 bg-void perspective-1000">
      {/* Professional Atmospheric Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#001020_0%,#020203_100%)] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      
      {/* Subtle Light Accents */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-cyber/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Left Content: Value Proposition */}
            <div className="text-left relative z-20 flex flex-col justify-center">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 w-fit backdrop-blur-xl hover:bg-white/10 transition-all cursor-default group">
                  <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                          <div key={i} className="w-6 h-6 rounded-full border-2 border-black bg-gray-300 flex items-center justify-center text-[8px] font-bold text-black">
                              <Star size={10} fill="currentColor" />
                          </div>
                      ))}
                  </div>
                  <span className="text-xs font-bold text-gray-300 tracking-wide group-hover:text-white transition-colors pl-2">
                      15,000+ Muvaffaqiyatli O'quvchi
                  </span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.95] font-display">
                  GLOBAL <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber via-white to-blue-400 animate-shimmer bg-[200%_auto]">
                    MUVAFFAQIYAT
                  </span>
                </h1>
                
                <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-lg font-light">
                  SAT.uz — bu shunchaki kurs emas. Bu sizning <strong className="text-white">Top Universitetlarga</strong> kirish strategiyangiz. 
                  Sun'iy intellekt yordamida o'z salohiyatingizni maksimal darajaga olib chiqing.
                </p>

                <div className="flex flex-col sm:flex-row gap-6">
                  <button 
                    onClick={() => setPage(Page.HUB)}
                    className="group relative bg-cyber text-black px-10 py-5 rounded-2xl font-black text-lg overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.2)] hover:shadow-[0_0_60px_rgba(0,240,255,0.4)] transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-white/50 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                    <span className="relative flex items-center gap-3">
                      BEPUL BOSHLASH <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                  
                  <button 
                    onClick={() => setPage(Page.EXAM_SIM)}
                    className="group px-10 py-5 rounded-2xl font-bold text-lg text-white border border-white/10 hover:bg-white/5 transition-all flex items-center gap-3 backdrop-blur-sm"
                  >
                    <PlayCircle size={20} className="text-gray-400 group-hover:text-cyber transition-colors" /> 
                    Demo Test
                  </button>
                </div>

                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-8">
                    {HERO_STATS.map((stat, index) => (
                        <div key={index} className="group">
                            <div className="text-3xl font-black text-white tracking-tight mb-1 group-hover:text-cyber transition-colors font-mono">{stat.value}</div>
                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Visual: Success Hologram */}
            <div className="relative hidden lg:flex h-[800px] w-full items-center justify-center" style={{ perspective: '1200px' }}>
                <div 
                    className="relative transition-transform duration-200 ease-out transform-style-3d"
                    style={{
                        transform: `rotateY(${mousePos.x * -8}deg) rotateX(${mousePos.y * 8}deg)`
                    }}
                >
                    {/* Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyber/10 rounded-full blur-[100px] animate-pulse"></div>

                    {/* Main Card: Acceptance Letter */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white text-black p-8 rounded-3xl shadow-2xl transform translate-z-20 rotate-y-12 rotate-z-6 transition-all duration-500 hover:rotate-0 hover:scale-105 group">
                        <div className="flex justify-between items-start mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-red-900 rounded-full flex items-center justify-center text-white font-serif font-bold text-xl">H</div>
                                <div>
                                    <div className="font-bold text-lg leading-none">Harvard</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wider">University</div>
                                </div>
                            </div>
                            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-green-200">
                                Accepted
                            </div>
                        </div>
                        <div className="space-y-2 mb-8">
                            <div className="h-2 bg-gray-100 rounded w-3/4"></div>
                            <div className="h-2 bg-gray-100 rounded w-full"></div>
                            <div className="h-2 bg-gray-100 rounded w-5/6"></div>
                        </div>
                        <div className="flex justify-between items-end pt-6 border-t border-gray-100">
                            <div>
                                <div className="text-xs text-gray-400 uppercase font-bold">Scholarship</div>
                                <div className="text-2xl font-black text-green-600">$320,000</div>
                            </div>
                            <Award className="text-yellow-500" size={32} />
                        </div>
                    </div>

                    {/* Floating Score Card */}
                    <div 
                        className="absolute bottom-20 -left-20 bg-black/80 backdrop-blur-xl border border-cyber/30 p-6 rounded-3xl shadow-[0_0_40px_rgba(0,240,255,0.2)] transform translate-z-50 animate-float"
                    >
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-2 bg-cyber/20 rounded-lg text-cyber">
                                <CheckCircle size={24} />
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Score</div>
                                <div className="text-4xl font-black text-white tracking-tighter">1590</div>
                            </div>
                        </div>
                        <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden mt-2">
                            <div className="bg-cyber h-full w-[99%]"></div>
                        </div>
                        <div className="text-right text-[10px] text-cyber mt-1 font-bold">TOP 0.1%</div>
                    </div>

                    {/* Floating Analytics Card */}
                    <div 
                        className="absolute -top-10 -right-10 bg-black/80 backdrop-blur-xl border border-purple-500/30 p-5 rounded-3xl shadow-lg transform translate-z-30 animate-float"
                        style={{ animationDelay: '1.5s' }}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-bold text-white uppercase">Math Mastery</span>
                        </div>
                        <div className="text-2xl font-black text-white mb-1">800 <span className="text-sm text-gray-500 font-normal">/ 800</span></div>
                        <div className="text-xs text-green-400 font-bold flex items-center gap-1">
                            <TrendingUp size={12} /> Perfect Score
                        </div>
                    </div>

                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// Helper for floating cards
import { TrendingUp } from 'lucide-react';

export default Hero;

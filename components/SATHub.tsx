
import React, { useState, useRef, useEffect } from 'react';
import { HubModule, Page } from '../types';
import { GraduationCap, Book, PlayCircle, Calculator, FileText, Search, Calendar, TrendingUp, Mic, Eye, Edit3, Database, DollarSign, PenTool, Rotate3d, Target, Swords, Network, Brain, Zap, CheckCircle, ArrowRight } from 'lucide-react';

interface SATHubProps {
    setPage?: (page: Page) => void;
}

const MODULES: HubModule[] = [
    // Asosiy (Core)
    { id: 'video', title: 'Video Darslar', description: 'Mukammal tushuntirishlar.', icon: PlayCircle, status: 'Active', stats: '500+ Soat', page: Page.VIDEO_LESSON, category: 'Asosiy' },
    { id: 'sim', title: 'Imtihon Simulyatori', description: 'Real Digital SAT muhiti.', icon: FileText, status: 'Active', stats: 'Bluebook', page: Page.EXAM_SIM, category: 'Asosiy' },
    { id: 'lib', title: 'Bilimlar Bazasi', description: 'Kitoblar va qo\'llanmalar.', icon: Book, status: 'Active', stats: 'Cheksiz', page: Page.NEURAL_LIBRARY, category: 'Asosiy' },
    { id: 'flash', title: 'Smart Lug\'at', description: '3000 ta eng muhim so\'z.', icon: Database, status: 'Active', stats: 'SRS Tizimi', page: Page.FLASHCARDS, category: 'Asosiy' },

    // Amaliyot (Practice)
    { id: 'sniper', title: 'Xatolar Ustida Ishlash', description: 'Faqat xato qilgan mavzular.', icon: Target, status: 'Active', stats: 'Adaptiv', page: Page.SNIPER, category: 'Amaliyot' },
    { id: 'battle', title: 'Jonli Bellashuv', description: 'Boshqa o\'quvchilar bilan duel.', icon: Swords, status: 'Active', stats: 'PvP', page: Page.QUANTUM_BATTLE, category: 'Amaliyot' },
    { id: 'calc', title: 'Ilmiy Kalkulyator', description: 'Desmos o\'rnini bosuvchi.', icon: Calculator, status: 'Active', stats: 'Grafik', page: Page.CALCULATOR, category: 'Amaliyot' },
    { id: 'reader', title: 'Tez O\'qish (Speed Read)', description: 'Reading bo\'limi uchun.', icon: Eye, status: 'Active', stats: '1000 WPM', page: Page.QUANTUM_READER, category: 'Amaliyot' },

    // AI Yordamchi (AI Tools)
    { id: 'coach', title: 'AI Nutq Murabbiyi', description: 'Mavzuni gapirib o\'rganing.', icon: Mic, status: 'Active', stats: 'Ovozli', page: Page.VOICE_COACH, category: 'AI Yordamchi' },
    { id: 'essay', title: 'Essay Tekshiruvi', description: 'Insholarni avtomatik baholash.', icon: PenTool, status: 'Active', stats: 'Instant', page: Page.ESSAY_GRADER, category: 'AI Yordamchi' },
    { id: 'solver', title: 'Kamera orqali Yechim', description: 'Masalani rasmga oling.', icon: Search, status: 'Active', stats: 'CV 4.0', page: Page.CV_LAB, category: 'AI Yordamchi' },
    { id: 'mind', title: 'Mind Map Generator', description: 'Mavzularni vizuallashtirish.', icon: Network, status: 'Active', stats: 'Auto-Gen', page: Page.MIND_MAP, category: 'AI Yordamchi' },

    // Analitika & Strategiya
    { id: 'pred', title: 'Natija Bashorati', description: 'Hozirgi holatga ko\'ra prognoz.', icon: TrendingUp, status: 'Active', stats: '±20 Ball', page: Page.PREDICTOR, category: 'Analitika' },
    { id: 'auto', title: 'Xatolar Tahlili', description: 'Nima uchun xato qilyapsiz?', icon: Search, status: 'Active', stats: 'Deep Scan', page: Page.AUTOPSY, category: 'Analitika' },
    { id: 'sched', title: 'Smart Rejalashtirish', description: 'Kun tartibini optimallash.', icon: Calendar, status: 'Active', stats: 'Bio-Rhythm', page: Page.SCHEDULER, category: 'Analitika' },
    { id: 'uni', title: 'Universitet Tanlash', description: 'Sizga mos OTMlarni topish.', icon: GraduationCap, status: 'Active', stats: 'AI Match', page: Page.UNIVERSITY, category: 'Strategiya' },
    { id: 'scholar', title: 'Grant Qidirish', description: 'Global stipendiyalar bazasi.', icon: DollarSign, status: 'Active', stats: '$1M+', page: Page.SCHOLARSHIP, category: 'Strategiya' },
];

const CATEGORIES = ['Barchasi', 'Asosiy', 'Amaliyot', 'AI Yordamchi', 'Analitika', 'Strategiya'];

const SATHub: React.FC<SATHubProps> = ({ setPage }) => {
    const [activeTab, setActiveTab] = useState('Barchasi');
    const [search, setSearch] = useState('');
    const gridRef = useRef<HTMLDivElement>(null);

    const filteredModules = MODULES.filter(m => {
        const matchesTab = activeTab === 'Barchasi' || m.category === activeTab;
        const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase()) || m.description.toLowerCase().includes(search.toLowerCase());
        return matchesTab && matchesSearch;
    });

    // Spotlight Effect Logic
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!gridRef.current) return;
            const cards = gridRef.current.getElementsByClassName('spotlight-card');
            
            for (const card of cards) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
                (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
            }
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-void pt-32 px-4 pb-24">
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h1 className="text-5xl font-black text-white mb-4 tracking-tight font-display">
                            RESURSLAR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber to-blue-500">MARKAZI</span>
                        </h1>
                        <p className="text-gray-400 text-lg font-light max-w-xl">
                            O'qish, mashq qilish va tahlil uchun barcha kerakli vositalar bir joyda.
                        </p>
                    </div>
                    
                    <div className="relative w-full md:w-96 group">
                        <div className="absolute inset-0 bg-cyber/20 blur-xl opacity-0 group-focus-within:opacity-50 transition-opacity"></div>
                        <input 
                            type="text" 
                            placeholder="Modulni qidirish..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 pl-12 text-white focus:border-cyber/50 outline-none transition-all relative z-10"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 z-10" size={20} />
                    </div>
                </div>

                {/* Categories */}
                <div className="flex overflow-x-auto pb-6 mb-4 gap-3 custom-scrollbar scrollbar-hide">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap border ${
                                activeTab === cat 
                                ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105' 
                                : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/30'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Spotlight Grid */}
                <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredModules.map((mod) => (
                        <div 
                            key={mod.id} 
                            onClick={() => mod.page && setPage && setPage(mod.page)}
                            className="spotlight-card group bg-void-lighter rounded-3xl p-6 cursor-pointer relative overflow-hidden flex flex-col justify-between h-64 hover:translate-y-[-4px] transition-transform duration-300"
                        >
                            {/* Glowing Border via CSS mask */}
                            <div className="spotlight-border"></div>
                            
                            {/* Background Shine */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-5">
                                    <div className="w-14 h-14 bg-black/50 rounded-2xl border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 group-hover:border-cyber/50 group-hover:bg-cyber/5 shadow-lg">
                                        <mod.icon size={28} className="text-gray-400 group-hover:text-cyber transition-colors" strokeWidth={1.5} />
                                    </div>
                                    {mod.status === 'Active' && (
                                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/10 border border-green-500/30">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]"></div>
                                        </div>
                                    )}
                                </div>
                                
                                <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-cyber transition-colors">{mod.title}</h3>
                                <p className="text-sm text-gray-500 font-medium leading-relaxed line-clamp-2 group-hover:text-gray-400 transition-colors">{mod.description}</p>
                            </div>

                            <div className="relative z-10 pt-4 border-t border-white/5 flex justify-between items-center mt-auto group-hover:border-white/20 transition-colors">
                                <span className="text-[10px] font-mono text-cyber/80 bg-cyber/5 px-2 py-1 rounded uppercase tracking-wider border border-cyber/10">
                                    {mod.stats}
                                </span>
                                <ArrowRight size={16} className="text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SATHub;
    
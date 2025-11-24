
import React, { useState } from 'react';
import { Calendar, Clock, Zap, Coffee, Moon, Sun, RefreshCw, CheckCircle, ArrowRight, Activity } from 'lucide-react';

interface ScheduleBlock {
    id: number;
    time: string;
    activity: string;
    type: 'focus' | 'recovery' | 'leisure' | 'sleep';
    energy: 'High' | 'Medium' | 'Low';
    duration: string;
}

const DEFAULT_SCHEDULE: ScheduleBlock[] = [
    { id: 1, time: "07:00", activity: "Wake Up & Hydrate", type: "leisure", energy: "Low", duration: "30m" },
    { id: 2, time: "07:30", activity: "Morning Priming (Neuro Games)", type: "focus", energy: "High", duration: "20m" },
    { id: 3, time: "08:00", activity: "Deep Work: Math Practice", type: "focus", energy: "High", duration: "90m" },
    { id: 4, time: "09:30", activity: "Cognitive Recovery (Walk)", type: "recovery", energy: "Low", duration: "20m" },
    { id: 5, time: "10:00", activity: "Reading Comprehension", type: "focus", energy: "Medium", duration: "60m" },
];

const SmartScheduler: React.FC = () => {
    const [schedule, setSchedule] = useState(DEFAULT_SCHEDULE);
    const [optimizing, setOptimizing] = useState(false);

    const optimizeSchedule = () => {
        setOptimizing(true);
        setTimeout(() => {
            setSchedule([
                { id: 1, time: "06:30", activity: "Bio-Rhythm Wake Up", type: "leisure", energy: "Low", duration: "30m" },
                { id: 2, time: "07:00", activity: "HIIT Exercise (Boost BDNF)", type: "recovery", energy: "High", duration: "30m" },
                { id: 3, time: "07:45", activity: "Hardest Task: Advanced Algebra", type: "focus", energy: "High", duration: "90m" },
                { id: 4, time: "09:15", activity: "NSDR (Non-Sleep Deep Rest)", type: "recovery", energy: "Low", duration: "20m" },
                { id: 5, time: "09:45", activity: "Rapid Essay Writing", type: "focus", energy: "Medium", duration: "45m" },
            ]);
            setOptimizing(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
                            <Calendar className="text-cyber" size={40} />
                            AI KUN <span className="text-purple-500">TARTIBI</span>
                        </h1>
                        <p className="text-gray-400">Circadian Rhythm Optimized Scheduler</p>
                    </div>
                    <button 
                        onClick={optimizeSchedule}
                        disabled={optimizing}
                        className="bg-cyber text-black px-8 py-3 rounded-xl font-bold hover:bg-white transition-all flex items-center gap-2 disabled:opacity-50 shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                    >
                        {optimizing ? <RefreshCw className="animate-spin" size={20} /> : <Zap size={20} />}
                        {optimizing ? 'OPTIMIZING...' : 'AI OPTIMIZE DAY'}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Timeline */}
                    <div className="lg:col-span-2 space-y-4">
                        {schedule.map((block, i) => (
                            <div 
                                key={block.id} 
                                className={`
                                    relative p-6 rounded-2xl border transition-all duration-500 group hover:translate-x-2
                                    ${block.type === 'focus' ? 'bg-cyber/5 border-cyber/30' : 
                                      block.type === 'recovery' ? 'bg-green-500/5 border-green-500/30' : 
                                      'bg-void-lighter border-white/10'}
                                `}
                            >
                                {/* Connector Line */}
                                {i < schedule.length - 1 && (
                                    <div className="absolute left-8 bottom-0 top-full w-0.5 bg-white/10 h-4 z-0"></div>
                                )}

                                <div className="flex items-center gap-6 relative z-10">
                                    <div className={`
                                        w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 border
                                        ${block.type === 'focus' ? 'bg-cyber/10 border-cyber text-cyber' : 
                                          block.type === 'recovery' ? 'bg-green-500/10 border-green-500 text-green-500' : 
                                          'bg-white/5 border-white/10 text-gray-400'}
                                    `}>
                                        {block.type === 'focus' ? <Zap size={24} /> : 
                                         block.type === 'recovery' ? <Coffee size={24} /> : 
                                         <Sun size={24} />}
                                    </div>
                                    
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-2xl font-black text-white font-mono">{block.time}</span>
                                            <span className="text-xs font-bold uppercase px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/5">
                                                {block.duration}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-1">{block.activity}</h3>
                                        <div className="flex items-center gap-2 text-xs">
                                            <span className={`uppercase font-bold ${block.energy === 'High' ? 'text-red-500' : block.energy === 'Medium' ? 'text-yellow-500' : 'text-blue-500'}`}>
                                                {block.energy} Energy
                                            </span>
                                            <span className="text-gray-600">•</span>
                                            <span className="text-gray-400 capitalize">{block.type} Phase</span>
                                        </div>
                                    </div>

                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 hover:bg-white/10 rounded-lg text-white">
                                            <ArrowRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        <div className="p-4 text-center border-2 border-dashed border-white/10 rounded-2xl text-gray-500 hover:border-cyber/50 hover:text-cyber transition-colors cursor-pointer">
                            + Add Custom Block
                        </div>
                    </div>

                    {/* Bio-Metrics Panel */}
                    <div className="space-y-6">
                        <div className="bg-void-lighter border border-white/10 rounded-3xl p-6">
                            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                                <Activity size={20} className="text-red-500" />
                                BIO-RHYTHM STATE
                            </h3>
                            
                            <div className="relative h-32 bg-black/50 rounded-xl border border-white/5 mb-6 overflow-hidden">
                                <div className="absolute inset-0 flex items-end px-2 pb-2 gap-1">
                                    {Array.from({length: 24}).map((_, i) => (
                                        <div 
                                            key={i} 
                                            className="flex-1 bg-cyber/20 rounded-t-sm hover:bg-cyber transition-colors"
                                            style={{ height: `${30 + Math.sin(i/3)*50}%` }}
                                            title={`${i}:00`}
                                        ></div>
                                    ))}
                                </div>
                                <div className="absolute top-2 left-2 text-xs text-cyber font-bold">ENERGY LEVELS (24H)</div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500"><Sun size={16} /></div>
                                        <div className="text-sm text-white">Peak Focus</div>
                                    </div>
                                    <span className="text-sm font-mono font-bold text-white">08:00 - 11:00</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Moon size={16} /></div>
                                        <div className="text-sm text-white">Deep Sleep</div>
                                    </div>
                                    <span className="text-sm font-mono font-bold text-white">23:00 - 06:30</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/30 rounded-3xl p-6">
                            <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                                <CheckCircle size={20} className="text-green-500" />
                                DAILY GOAL
                            </h3>
                            <div className="text-3xl font-black text-white mb-1">4.5 Hrs</div>
                            <p className="text-gray-400 text-sm mb-4">Deep Work Targeted</p>
                            <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                                <div className="bg-purple-500 h-full w-[35%]"></div>
                            </div>
                            <p className="text-right text-xs text-purple-400 mt-2 font-bold">35% COMPLETED</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmartScheduler;

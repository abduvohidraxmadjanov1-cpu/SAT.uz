
import React, { useState, useEffect } from 'react';
import { GitBranch, Target, Calendar, CheckCircle, ArrowRight, Cpu, Layers } from 'lucide-react';

const STEPS = [
    "Analyzing Cognitive Gaps...",
    "Scanning 500,000 Problem Sets...",
    "Optimizing for Exam Date (Aug 26)...",
    "Balancing Math/Verbal Load...",
    "Injecting Spaced Repetition...",
    "Curriculum Generated."
];

const CurriculumArchitect: React.FC = () => {
    const [generating, setGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [logIndex, setLogIndex] = useState(0);
    const [generated, setGenerated] = useState(false);

    const startGeneration = () => {
        setGenerating(true);
        setGenerated(false);
        setProgress(0);
        setLogIndex(0);

        let p = 0;
        const interval = setInterval(() => {
            p += 2;
            setProgress(p);
            if (p % 20 === 0 && p < 100) {
                setLogIndex(prev => prev + 1);
            }
            if (p >= 100) {
                clearInterval(interval);
                setGenerating(false);
                setGenerated(true);
                setLogIndex(STEPS.length - 1);
            }
        }, 50);
    };

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
                            <GitBranch className="text-cyber" size={40} />
                            CURRICULUM <span className="text-purple-500">ARCHITECT</span>
                        </h1>
                        <p className="text-gray-400">AI-Driven Personalized Learning Path Generator</p>
                    </div>
                    {!generating && !generated && (
                        <button 
                            onClick={startGeneration}
                            className="bg-cyber text-black px-8 py-3 rounded-xl font-bold hover:bg-white transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center gap-2"
                        >
                            <Cpu size={20} /> GENERATE PATH
                        </button>
                    )}
                </div>

                {generating && (
                    <div className="max-w-2xl mx-auto text-center mb-12">
                        <div className="w-full bg-gray-800 h-4 rounded-full overflow-hidden mb-4 border border-white/10">
                            <div className="bg-cyber h-full transition-all duration-100 relative" style={{width: `${progress}%`}}>
                                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                            </div>
                        </div>
                        <p className="text-cyber font-mono animate-pulse">{STEPS[logIndex]}</p>
                    </div>
                )}

                {generated && (
                    <div className="animate-in slide-in-from-bottom fade-in duration-700">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Timeline */}
                            <div className="lg:col-span-2 space-y-6">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <Calendar className="text-cyber" /> Your Strategic Roadmap
                                </h3>
                                
                                {[
                                    { week: "Week 1", focus: "Algebra Foundations & Reading Inference", status: "Ready" },
                                    { week: "Week 2", focus: "Advanced Math & Grammar Rules", status: "Locked" },
                                    { week: "Week 3", focus: "Data Analysis & Vocabulary Injection", status: "Locked" },
                                    { week: "Week 4", focus: "Full Simulation Exams (Adaptive)", status: "Locked" },
                                ].map((item, i) => (
                                    <div key={i} className="bg-void-lighter border border-white/10 p-6 rounded-2xl flex items-center gap-6 group hover:border-cyber/50 transition-all relative overflow-hidden">
                                        {i === 0 && <div className="absolute inset-0 bg-cyber/5 pointer-events-none"></div>}
                                        <div className="flex flex-col items-center gap-2">
                                            <div className={`w-3 h-full bg-gray-800 rounded-full absolute top-0 left-9 -z-10 ${i === 3 ? 'h-1/2' : ''} ${i===0 ? 'bg-cyber/30' : ''}`}></div>
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 ${i === 0 ? 'bg-cyber text-black border-cyber' : 'bg-black text-gray-500 border-gray-800'}`}>
                                                {i + 1}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h4 className={`text-lg font-bold ${i === 0 ? 'text-white' : 'text-gray-500'}`}>{item.week}</h4>
                                                <span className={`text-xs font-bold px-2 py-1 rounded ${i === 0 ? 'bg-green-500/20 text-green-500' : 'bg-gray-800 text-gray-500'}`}>
                                                    {item.status}
                                                </span>
                                            </div>
                                            <p className={`${i === 0 ? 'text-gray-300' : 'text-gray-600'} mt-1`}>{item.focus}</p>
                                        </div>
                                        <ArrowRight className={`text-gray-600 ${i === 0 ? 'text-cyber' : ''}`} />
                                    </div>
                                ))}
                            </div>

                            {/* Stats */}
                            <div className="space-y-6">
                                <div className="bg-gradient-to-br from-void-lighter to-black border border-white/10 p-6 rounded-3xl">
                                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                        <Target className="text-red-500" /> Projected Score
                                    </h3>
                                    <div className="text-5xl font-black text-white mb-2">1560</div>
                                    <p className="text-xs text-gray-400">
                                        If plan followed with 95% adherence.
                                    </p>
                                </div>

                                <div className="bg-void-lighter border border-white/10 p-6 rounded-3xl">
                                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                        <Layers className="text-blue-500" /> Workload
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm text-gray-400">
                                            <span>Daily Practice</span>
                                            <span className="text-white">45 mins</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-400">
                                            <span>New Concepts</span>
                                            <span className="text-white">12 / week</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-400">
                                            <span>Review</span>
                                            <span className="text-white">Daily (SRS)</span>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full bg-white/5 hover:bg-white/10 text-white py-4 rounded-xl font-bold border border-white/10 transition-all flex items-center justify-center gap-2">
                                    <CheckCircle size={20} className="text-green-500" /> ACCEPT PLAN
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {!generating && !generated && (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500 border-2 border-dashed border-white/10 rounded-3xl">
                        <GitBranch size={64} className="mb-4 opacity-20" />
                        <p>AI Model is ready to build your path.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CurriculumArchitect;

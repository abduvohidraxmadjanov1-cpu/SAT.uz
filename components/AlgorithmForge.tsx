
import React, { useState, useEffect } from 'react';
import { Network, Cpu, Save, ArrowRight, Sparkles, Code, Database } from 'lucide-react';

const AlgorithmForge: React.FC = () => {
    const [generating, setGenerating] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const [strategy, setStrategy] = useState<string | null>(null);

    const generateStrategy = () => {
        setGenerating(true);
        setStrategy(null);
        setLogs([]);
        
        const steps = [
            "Analyzing 50,000 recent SAT Math questions...",
            "Detecting common pattern in 'Circle Theorems'...",
            "Optimizing solution path...",
            "Reducing complexity from O(n) to O(1)...",
            "Validating against 1000 test cases...",
            "Strategy Forged Successfully."
        ];

        let i = 0;
        const interval = setInterval(() => {
            setLogs(prev => [...prev, steps[i]]);
            i++;
            if (i >= steps.length) {
                clearInterval(interval);
                setGenerating(false);
                setStrategy("Instant Circle Sector Area: A = (θ/360) * πr². SHORTCUT: If θ=60, Area is 1/6 of circle. Memorize 1/6, 1/4, 1/3 factors for speed.");
            }
        }, 800);
    };

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-5xl mx-auto h-[80vh] flex flex-col">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-white flex items-center gap-3">
                            <Network className="text-purple-500" size={32} />
                            ALGORITHM FORGE <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded">ALPHA</span>
                        </h1>
                        <p className="text-gray-400 text-sm">AI Research Lab for New Strategies</p>
                    </div>
                    <button 
                        onClick={generateStrategy}
                        disabled={generating}
                        className="bg-purple-500/10 border border-purple-500 text-purple-400 px-6 py-2 rounded-xl hover:bg-purple-500 hover:text-white transition-all flex items-center gap-2 font-bold disabled:opacity-50"
                    >
                        <Sparkles size={18} />
                        {generating ? 'FORGING...' : 'GENERATE NEW STRATEGY'}
                    </button>
                </div>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Visualization Panel */}
                    <div className="bg-void-lighter border border-white/10 rounded-3xl p-8 relative overflow-hidden flex flex-col">
                        <div className="absolute inset-0 grid-bg opacity-10"></div>
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2 z-10">
                            <Cpu size={18} className="text-purple-500" /> NEURAL DERIVATION
                        </h3>
                        
                        <div className="flex-1 bg-black/50 rounded-xl border border-white/5 p-4 font-mono text-xs text-green-400 overflow-hidden relative">
                            {generating ? (
                                <div className="space-y-2">
                                    {logs.map((log, i) => (
                                        <div key={i} className="flex gap-2 animate-in slide-in-from-left fade-in">
                                            <span className="text-gray-500">{`>`}</span>
                                            {log}
                                        </div>
                                    ))}
                                    <div className="w-2 h-4 bg-green-400 animate-pulse inline-block"></div>
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-gray-600">
                                    <Code size={48} className="mb-4 opacity-20" />
                                    <p>System Idle. Ready to forge.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Result Panel */}
                    <div className="bg-void-lighter border border-white/10 rounded-3xl p-8 flex flex-col relative">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <Database size={18} className="text-cyber" /> STRATEGY OUTPUT
                        </h3>

                        {strategy ? (
                            <div className="flex-1 flex flex-col justify-between animate-in zoom-in-95 duration-500">
                                <div className="bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/30 p-6 rounded-2xl">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded">MATH SHORTCUT #882</span>
                                        <Sparkles size={16} className="text-yellow-400" />
                                    </div>
                                    <p className="text-white text-lg leading-relaxed font-medium">
                                        {strategy}
                                    </p>
                                </div>
                                <button className="w-full bg-white/5 hover:bg-cyber hover:text-black text-white border border-white/10 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                                    <Save size={20} /> SAVE TO BRAIN BANK
                                </button>
                            </div>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-gray-500 text-sm text-center">
                                <p>Generate a strategy to view detailed analysis and save it to your profile.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlgorithmForge;

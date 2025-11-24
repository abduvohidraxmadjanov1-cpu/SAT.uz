
import React, { useState, useEffect } from 'react';
import { Swords, Shield, Zap, User, Cpu, Globe, Trophy, AlertCircle } from 'lucide-react';

const QuantumBattle: React.FC = () => {
    const [status, setStatus] = useState<'matching' | 'battle' | 'result'>('matching');
    const [opponent, setOpponent] = useState({ name: "Searching...", rank: "...", country: "..." });
    const [playerScore, setPlayerScore] = useState(0);
    const [opponentScore, setOpponentScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [question, setQuestion] = useState("Calculating...");

    useEffect(() => {
        if (status === 'matching') {
            setTimeout(() => {
                setOpponent({ name: "Hiroshi K.", rank: "Top 2%", country: "Japan" });
                setStatus('battle');
                setQuestion("If 3x + 7 = 22, what is the value of 2x - 5?");
            }, 3000);
        }
    }, [status]);

    useEffect(() => {
        if (status === 'battle') {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 0) {
                        setStatus('result');
                        return 0;
                    }
                    return prev - 1;
                });
                
                // Simulate opponent activity
                if (Math.random() > 0.8) {
                    setOpponentScore(prev => prev + 10);
                }
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [status]);

    const handleAnswer = (correct: boolean) => {
        if (correct) setPlayerScore(prev => prev + 20);
        else setPlayerScore(prev => Math.max(0, prev - 10));
        
        // Next question simulation
        setQuestion("Solving Quantum Derivative...");
        setTimeout(() => setQuestion("Simplify: (x^2 - 9) / (x - 3)"), 500);
    };

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12 select-none">
            <div className="max-w-6xl mx-auto h-[80vh] flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-black text-white flex items-center gap-3">
                        <Swords className="text-red-500" size={32} />
                        QUANTUM BATTLE <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">LIVE</span>
                    </h1>
                    <div className="bg-void-lighter border border-white/10 px-4 py-2 rounded-xl font-mono text-cyber">
                        LATENCY: 12ms
                    </div>
                </div>

                {status === 'matching' && (
                    <div className="flex-1 flex flex-col items-center justify-center bg-void-lighter border border-white/10 rounded-3xl relative overflow-hidden">
                        <div className="absolute inset-0 grid-bg opacity-20 animate-pulse"></div>
                        <Globe size={100} className="text-cyber animate-spin-slow mb-8" />
                        <h2 className="text-2xl font-bold text-white mb-2">SCANNING GLOBAL NODES...</h2>
                        <p className="text-gray-400 font-mono">Finding worthy opponent (MMR: 1450)</p>
                    </div>
                )}

                {status === 'battle' && (
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Player Side */}
                        <div className="bg-void-lighter border-2 border-cyber/30 rounded-3xl p-8 flex flex-col relative overflow-hidden">
                            <div className="flex justify-between items-start mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-cyber/20 rounded-2xl flex items-center justify-center border border-cyber">
                                        <User size={32} className="text-cyber" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">YOU</h3>
                                        <p className="text-xs text-gray-400">Uzbekistan</p>
                                    </div>
                                </div>
                                <div className="text-4xl font-black text-cyber">{playerScore}</div>
                            </div>
                            
                            <div className="flex-1 flex flex-col justify-center">
                                <div className="bg-black/50 p-6 rounded-2xl border border-white/10 mb-6 text-center">
                                    <p className="text-xl font-bold text-white">{question}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {[5, 10, 15, 20].map((ans, i) => (
                                        <button 
                                            key={i}
                                            onClick={() => handleAnswer(Math.random() > 0.5)}
                                            className="bg-white/5 hover:bg-cyber hover:text-black border border-white/10 py-4 rounded-xl font-bold transition-all"
                                        >
                                            {ans}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Opponent Side */}
                        <div className="bg-void-lighter border-2 border-red-500/30 rounded-3xl p-8 flex flex-col relative overflow-hidden opacity-90">
                            <div className="absolute inset-0 bg-red-500/5 pointer-events-none"></div>
                            <div className="flex justify-between items-start mb-8">
                                <div className="text-4xl font-black text-red-500">{opponentScore}</div>
                                <div className="flex items-center gap-4 text-right">
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{opponent.name}</h3>
                                        <p className="text-xs text-gray-400">{opponent.country}</p>
                                    </div>
                                    <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center border border-red-500">
                                        <Cpu size={32} className="text-red-500" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 flex items-center justify-center">
                                <div className="text-center space-y-4">
                                    <div className="w-24 h-24 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin mx-auto"></div>
                                    <p className="text-red-500 font-mono text-sm animate-pulse">OPPONENT CALCULATING...</p>
                                </div>
                            </div>
                        </div>

                        {/* Center Timer */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black border border-white/20 px-6 py-3 rounded-full shadow-2xl z-20">
                            <span className={`text-3xl font-black font-mono ${timeLeft < 10 ? 'text-red-500 animate-ping' : 'text-white'}`}>
                                {timeLeft}
                            </span>
                        </div>
                    </div>
                )}

                {status === 'result' && (
                    <div className="flex-1 flex flex-col items-center justify-center bg-void-lighter border border-white/10 rounded-3xl text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-cyber/10 to-transparent"></div>
                        <Trophy size={80} className="text-yellow-400 mb-6 animate-bounce" />
                        <h2 className="text-5xl font-black text-white mb-4">{playerScore > opponentScore ? 'VICTORY' : 'DEFEAT'}</h2>
                        <p className="text-xl text-gray-300 mb-8">
                            {playerScore > opponentScore ? '+25 MMR gained' : '-15 MMR lost'}
                        </p>
                        <button 
                            onClick={() => setStatus('matching')}
                            className="bg-white/10 border border-white/20 text-white px-8 py-3 rounded-xl font-bold hover:bg-white/20 transition-all"
                        >
                            Find Next Match
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuantumBattle;

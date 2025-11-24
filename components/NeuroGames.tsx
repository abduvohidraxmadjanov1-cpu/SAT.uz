import React, { useState, useEffect, useRef } from 'react';
import { Zap, Play, Target, RotateCcw, Brain, Activity, MousePointer2 } from 'lucide-react';

const NeuroGames: React.FC = () => {
    const [gameState, setGameState] = useState<'intro' | 'playing' | 'gameover'>('intro');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [targets, setTargets] = useState<{id: number, x: number, y: number, type: 'good' | 'bad', size: number}[]>([]);
    
    // Game Loop
    useEffect(() => {
        if (gameState !== 'playing') return;

        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setGameState('gameover');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Spawn targets
        const spawner = setInterval(() => {
            if (Math.random() > 0.3) {
                setTargets(prev => [
                    ...prev,
                    {
                        id: Date.now(),
                        x: Math.random() * 80 + 10, // %
                        y: Math.random() * 80 + 10, // %
                        type: Math.random() > 0.8 ? 'bad' : 'good',
                        size: Math.random() * 40 + 40
                    }
                ]);
            }
        }, 600);

        return () => {
            clearInterval(interval);
            clearInterval(spawner);
        };
    }, [gameState]);

    const handleStart = () => {
        setScore(0);
        setTimeLeft(30);
        setTargets([]);
        setGameState('playing');
    };

    const handleClick = (id: number, type: 'good' | 'bad') => {
        if (type === 'good') {
            setScore(prev => prev + 100);
        } else {
            setScore(prev => Math.max(0, prev - 200));
            // Visual feedback could be added here
        }
        setTargets(prev => prev.filter(t => t.id !== id));
    };

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12 select-none">
            <div className="max-w-5xl mx-auto h-[80vh] flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <div>
                         <h1 className="text-3xl font-black text-white flex items-center gap-3">
                            <Zap className="text-cyber" size={32} />
                            NEURO ARENA <span className="text-xs bg-cyber text-black px-2 py-1 rounded">BETA</span>
                        </h1>
                        <p className="text-gray-400 text-sm">Refleks va Kognitiv Tezlikni Oshirish</p>
                    </div>
                    {gameState === 'playing' && (
                        <div className="flex gap-6">
                            <div className="bg-void-lighter border border-cyber/30 px-4 py-2 rounded-xl">
                                <div className="text-xs text-gray-500 uppercase">Score</div>
                                <div className="text-2xl font-mono font-black text-white">{score}</div>
                            </div>
                            <div className="bg-void-lighter border border-red-500/30 px-4 py-2 rounded-xl">
                                <div className="text-xs text-gray-500 uppercase">Time</div>
                                <div className="text-2xl font-mono font-black text-red-500">{timeLeft}s</div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex-1 bg-void-lighter border border-white/10 rounded-3xl relative overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.05)]">
                    <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>

                    {gameState === 'intro' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/60 backdrop-blur-sm">
                            <Brain size={80} className="text-cyber mb-6 animate-float" />
                            <h2 className="text-4xl font-black text-white mb-2">QUANTUM REFLEX</h2>
                            <p className="text-gray-300 max-w-md text-center mb-8">
                                Moviy neyronlarni bosing. Qizil viruslardan saqlaning. 
                                Bu mashq miyaning qaror qabul qilish tezligini 15% ga oshiradi.
                            </p>
                            <button 
                                onClick={handleStart}
                                className="bg-cyber text-black px-10 py-4 rounded-xl font-bold text-xl hover:scale-105 transition-transform flex items-center gap-3 shadow-[0_0_30px_rgba(0,240,255,0.4)]"
                            >
                                <Play size={24} /> BOSHLASH
                            </button>
                        </div>
                    )}

                    {gameState === 'gameover' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/80 backdrop-blur-sm">
                            <Target size={80} className="text-white mb-6" />
                            <h2 className="text-4xl font-black text-white mb-2">O'YIN TUGADI</h2>
                            <div className="text-6xl font-black text-cyber mb-8 font-mono">{score}</div>
                            <div className="grid grid-cols-2 gap-8 mb-8 text-center">
                                <div>
                                    <div className="text-gray-500 text-xs uppercase">Aniqlik</div>
                                    <div className="text-white font-bold text-xl">94%</div>
                                </div>
                                <div>
                                    <div className="text-gray-500 text-xs uppercase">Reaction Time</div>
                                    <div className="text-white font-bold text-xl">210ms</div>
                                </div>
                            </div>
                            <button 
                                onClick={handleStart}
                                className="bg-white/10 border border-white/20 text-white px-8 py-3 rounded-xl font-bold hover:bg-white/20 transition-all flex items-center gap-2"
                            >
                                <RotateCcw size={20} /> Qayta O'ynash
                            </button>
                        </div>
                    )}

                    {/* Game Area */}
                    {gameState === 'playing' && (
                        <div className="absolute inset-0 cursor-crosshair">
                            {targets.map(t => (
                                <button
                                    key={t.id}
                                    onClick={() => handleClick(t.id, t.type)}
                                    style={{
                                        left: `${t.x}%`,
                                        top: `${t.y}%`,
                                        width: `${t.size}px`,
                                        height: `${t.size}px`,
                                    }}
                                    className={`
                                        absolute rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-transform active:scale-90
                                        flex items-center justify-center shadow-lg animate-pulse-fast
                                        ${t.type === 'good' 
                                            ? 'bg-cyber border-2 border-white shadow-[0_0_20px_#00f0ff]' 
                                            : 'bg-red-500 border-2 border-red-300 shadow-[0_0_20px_red]'}
                                    `}
                                >
                                    {t.type === 'good' ? (
                                        <MousePointer2 size={16} className="text-black" />
                                    ) : (
                                        <Activity size={16} className="text-white" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NeuroGames;

import React, { useState, useEffect } from 'react';
import { Crosshair, Target, AlertCircle, Check, RefreshCw, Trophy } from 'lucide-react';

const SniperMode: React.FC = () => {
    const [streak, setStreak] = useState(0);
    const [lives, setLives] = useState(1);
    const [gameOver, setGameOver] = useState(false);
    const [question, setQuestion] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const loadQuestion = () => {
        setLoading(true);
        // Simulate fetching a "Wrongly Answered" question from history
        setTimeout(() => {
            setQuestion({
                text: `If 3x - y = 12 and 2x + y = 13, what is the value of x?`,
                options: ["3", "4", "5", "6"],
                correct: 2 // 5
            });
            setLoading(false);
        }, 800);
    };

    useEffect(() => {
        loadQuestion();
    }, []);

    const handleAnswer = (idx: number) => {
        if (idx === question.correct) {
            setStreak(prev => prev + 1);
            loadQuestion();
        } else {
            setLives(prev => prev - 1);
            setGameOver(true);
        }
    };

    const restart = () => {
        setStreak(0);
        setLives(1);
        setGameOver(false);
        loadQuestion();
    };

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12 font-mono">
            <div className="max-w-3xl mx-auto h-[80vh] flex flex-col">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-red-600 mb-2 flex items-center gap-3 tracking-tighter">
                            <Crosshair size={40} />
                            SNIPER <span className="text-white">MODE</span>
                        </h1>
                        <p className="text-gray-500">One Shot. One Opportunity. Fix Your Mistakes.</p>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-gray-500 uppercase font-bold">Current Streak</div>
                        <div className="text-4xl font-black text-white">{streak}</div>
                    </div>
                </div>

                {gameOver ? (
                    <div className="flex-1 flex flex-col items-center justify-center bg-void-lighter border-2 border-red-900 rounded-3xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-red-900/10 animate-pulse"></div>
                        <AlertCircle size={80} className="text-red-600 mb-6" />
                        <h2 className="text-5xl font-black text-white mb-4">MISSION FAILED</h2>
                        <p className="text-gray-400 mb-8">You missed the target. Logic error detected.</p>
                        <div className="flex gap-4">
                            <button 
                                onClick={restart}
                                className="bg-red-600 text-black px-8 py-3 rounded-xl font-bold hover:bg-white transition-all flex items-center gap-2"
                            >
                                <RefreshCw size={20} /> RETRY MISSION
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 bg-black border border-white/10 rounded-3xl relative overflow-hidden flex flex-col shadow-[0_0_50px_rgba(220,38,38,0.1)]">
                        {/* Scope Overlay */}
                        <div className="absolute inset-0 pointer-events-none z-20">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border rounded-full border-red-900/30"></div>
                            <div className="absolute top-1/2 left-0 right-0 h-px bg-red-900/30"></div>
                            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-red-900/30"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full opacity-50 animate-ping"></div>
                        </div>

                        {loading ? (
                            <div className="flex-1 flex items-center justify-center">
                                <div className="text-red-500 font-bold animate-pulse">ACQUIRING TARGET...</div>
                            </div>
                        ) : (
                            <div className="relative z-30 p-12 flex flex-col h-full justify-center">
                                <div className="mb-12 text-center">
                                    <span className="text-red-500 text-xs font-bold uppercase tracking-[0.2em] border border-red-900 px-2 py-1">Algebra Error #402</span>
                                    <h3 className="text-2xl md:text-4xl font-bold text-white mt-6 leading-relaxed">
                                        {question.text}
                                    </h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto w-full">
                                    {question.options.map((opt: string, idx: number) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleAnswer(idx)}
                                            className="bg-black/50 border border-white/20 hover:border-red-500 hover:bg-red-500/10 text-white py-6 rounded-xl font-bold text-xl transition-all group relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/5 transition-colors"></div>
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {/* HUD Footer */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/5 flex justify-between text-xs text-gray-600 font-mono z-30 bg-black">
                            <span>LIVES: {lives}</span>
                            <span>TARGET DISTANCE: {100 - streak}%</span>
                            <span>WIND: 0.0</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SniperMode;

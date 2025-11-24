
import React, { useState, useEffect } from 'react';
import { Brain, Grid, Timer, CheckCircle, XCircle, Zap } from 'lucide-react';

const IQTestArena: React.FC = () => {
    const [level, setLevel] = useState(1);
    const [score, setScore] = useState(120);
    const [pattern, setPattern] = useState<number[][]>([]);
    const [options, setOptions] = useState<number[]>([]);
    const [correctIndex, setCorrectIndex] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

    // Generate a Raven's Matrix style puzzle (Simplified logic for demo)
    const generatePuzzle = () => {
        // Logic: 3x3 grid where the last cell is missing.
        // Simple pattern: Sum of items, rotation, or simple addition
        const grid: number[][] = [];
        const base = Math.floor(Math.random() * 5);
        
        // Pattern: Row sum is consistent or incrementing
        for(let i=0; i<3; i++) {
            const r1 = Math.floor(Math.random() * 4) + 1;
            const r2 = Math.floor(Math.random() * 4) + 1;
            const r3 = r1 + r2 + base; // Simple additive pattern
            grid.push([r1, r2, r3]);
        }

        const answer = grid[2][2];
        grid[2][2] = -1; // Hidden

        // Generate options
        const opts = [
            answer,
            answer + 1,
            answer - 1,
            answer + 2
        ].sort(() => Math.random() - 0.5);

        setPattern(grid);
        setOptions(opts);
        setCorrectIndex(opts.indexOf(answer));
        setSelected(null);
        setFeedback(null);
    };

    useEffect(() => {
        generatePuzzle();
    }, [level]);

    const handleSelect = (idx: number) => {
        if (selected !== null) return;
        setSelected(idx);
        
        if (idx === correctIndex) {
            setFeedback('correct');
            setScore(prev => prev + 5);
            setTimeout(() => {
                setLevel(prev => prev + 1);
            }, 1000);
        } else {
            setFeedback('wrong');
            setScore(prev => prev - 2);
            setTimeout(() => {
                generatePuzzle(); // Reset or fail logic
            }, 1000);
        }
    };

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12 select-none">
            <div className="max-w-4xl mx-auto h-[80vh] flex flex-col">
                <div className="flex justify-between items-center mb-8">
                    <div>
                         <h1 className="text-3xl font-black text-white flex items-center gap-3">
                            <Brain className="text-purple-500" size={32} />
                            LOGIC MATRIX <span className="text-cyber">IQ</span>
                        </h1>
                        <p className="text-gray-400 text-sm">Pattern Recognition & Spatial Reasoning</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-void-lighter border border-purple-500/30 px-4 py-2 rounded-xl text-center">
                            <div className="text-xs text-gray-500 uppercase">IQ Score (Est)</div>
                            <div className="text-2xl font-black text-white">{score}</div>
                        </div>
                        <div className="bg-void-lighter border border-cyber/30 px-4 py-2 rounded-xl text-center">
                            <div className="text-xs text-gray-500 uppercase">Level</div>
                            <div className="text-2xl font-black text-cyber">{level}</div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* The Matrix */}
                    <div className="bg-void-lighter border border-white/10 rounded-3xl p-8 aspect-square flex flex-col items-center justify-center relative shadow-[0_0_50px_rgba(168,85,247,0.1)]">
                        <div className="grid grid-cols-3 gap-4 w-full h-full">
                            {pattern.flat().map((val, i) => (
                                <div 
                                    key={i} 
                                    className={`
                                        rounded-xl border-2 flex items-center justify-center text-4xl font-black text-white transition-all
                                        ${val === -1 
                                            ? 'border-dashed border-cyber/50 bg-cyber/5 animate-pulse' 
                                            : 'border-white/10 bg-white/5'}
                                    `}
                                >
                                    {val === -1 ? '?' : (
                                        // Visual representation of number (Shapes)
                                        <div className="grid grid-cols-3 gap-1">
                                            {Array.from({length: val}).map((_, j) => (
                                                <div key={j} className="w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_5px_#a855f7]"></div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Options */}
                    <div className="flex flex-col gap-4 justify-center h-full">
                        <h3 className="text-white font-bold mb-4 text-center uppercase tracking-widest">Select the missing pattern</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {options.map((opt, i) => {
                                let statusClass = 'border-white/10 hover:border-cyber hover:bg-white/5';
                                if (selected === i) {
                                    if (feedback === 'correct') statusClass = 'border-green-500 bg-green-500/20';
                                    else if (feedback === 'wrong') statusClass = 'border-red-500 bg-red-500/20';
                                }

                                return (
                                    <button
                                        key={i}
                                        onClick={() => handleSelect(i)}
                                        disabled={selected !== null}
                                        className={`
                                            h-32 rounded-2xl border-2 transition-all flex items-center justify-center group
                                            ${statusClass}
                                        `}
                                    >
                                        <div className="grid grid-cols-3 gap-1 group-hover:scale-110 transition-transform">
                                            {Array.from({length: opt}).map((_, j) => (
                                                <div key={j} className={`w-3 h-3 rounded-full shadow-[0_0_5px_currentColor] ${selected === i && feedback === 'correct' ? 'bg-green-500' : selected === i && feedback === 'wrong' ? 'bg-red-500' : 'bg-purple-500'}`}></div>
                                            ))}
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IQTestArena;

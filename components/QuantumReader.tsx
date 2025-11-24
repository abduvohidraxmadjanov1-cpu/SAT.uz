
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, FastForward, RefreshCw, Eye, Zap, BookOpen } from 'lucide-react';

const DEFAULT_TEXT = `The Digital SAT represents a fundamental shift in standardized testing, moving from a paper-based format to an adaptive digital interface. This transition not only alters the logistics of the exam but also introduces a multistage adaptive design where the difficulty of the second module depends on the student's performance in the first. Consequently, developing reading speed and comprehension efficiency is more critical than ever. By utilizing Rapid Serial Visual Presentation (RSVP) technology, students can suppress subvocalization—the habit of silently pronouncing words—and significantly increase their words-per-minute (WPM) processing rate. Mastery of this skill allows for deeper cognitive allocation towards critical analysis rather than mere decoding of text.`;

const QuantumReader: React.FC = () => {
    const [text, setText] = useState(DEFAULT_TEXT);
    const [words, setWords] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [wpm, setWpm] = useState(400);
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        setWords(text.split(/\s+/).filter(w => w.length > 0));
    }, [text]);

    useEffect(() => {
        if (isPlaying) {
            const interval = 60000 / wpm;
            timerRef.current = window.setInterval(() => {
                setCurrentIndex(prev => {
                    if (prev >= words.length - 1) {
                        setIsPlaying(false);
                        return prev;
                    }
                    return prev + 1;
                });
            }, interval);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPlaying, wpm, words]);

    const handleReset = () => {
        setIsPlaying(false);
        setCurrentIndex(0);
    };

    const currentWord = words[currentIndex] || "";
    // Calculate optimal viewing position (slightly left of center)
    const pivot = Math.ceil(currentWord.length / 2);
    const leftPart = currentWord.slice(0, pivot - 1);
    const centerChar = currentWord.slice(pivot - 1, pivot);
    const rightPart = currentWord.slice(pivot);

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-4xl mx-auto h-[80vh] flex flex-col">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black text-white mb-2 flex items-center justify-center gap-3">
                        <Eye className="text-cyber" size={40} />
                        QUANTUM <span className="text-white">READER</span>
                    </h1>
                    <p className="text-gray-400">Rapid Serial Visual Presentation (RSVP) Engine</p>
                </div>

                {/* Reader Display */}
                <div className="flex-1 bg-void-lighter border border-white/10 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.1)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.05)_0%,transparent_70%)]"></div>
                    
                    {/* Guide Lines */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/10"></div>
                    <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-24 border-x border-cyber/20 rounded-xl"></div>

                    {/* The Word */}
                    <div className="relative z-10 text-6xl md:text-8xl font-mono font-bold flex items-baseline">
                        <span className="text-white text-right w-full">{leftPart}</span>
                        <span className="text-cyber">{centerChar}</span>
                        <span className="text-white text-left w-full">{rightPart}</span>
                    </div>

                    {/* Stats Overlay */}
                    <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-8">
                        <div className="text-center">
                            <div className="text-xs text-gray-500 uppercase font-bold">Speed</div>
                            <div className="text-xl font-black text-cyber">{wpm} WPM</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs text-gray-500 uppercase font-bold">Progress</div>
                            <div className="text-xl font-black text-white">{Math.round((currentIndex / words.length) * 100)}%</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs text-gray-500 uppercase font-bold">Time Saved</div>
                            <div className="text-xl font-black text-green-500">3.2x</div>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="mt-8 bg-void-lighter border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <button 
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-16 h-16 bg-cyber text-black rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
                        >
                            {isPlaying ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
                        </button>
                        <button 
                            onClick={handleReset}
                            className="p-4 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-all"
                        >
                            <RefreshCw size={20} />
                        </button>
                    </div>

                    <div className="flex-1 w-full px-4">
                        <div className="flex justify-between text-xs text-gray-400 mb-2 font-bold uppercase">
                            <span>Speed Control</span>
                            <span>{wpm} WPM</span>
                        </div>
                        <input 
                            type="range" 
                            min="200" 
                            max="1500" 
                            step="50"
                            value={wpm}
                            onChange={(e) => setWpm(Number(e.target.value))}
                            className="w-full h-2 bg-gray-800 rounded-full appearance-none cursor-pointer accent-cyber"
                        />
                        <div className="flex justify-between text-[10px] text-gray-600 mt-1">
                            <span>Beginner (200)</span>
                            <span>Superhuman (1500)</span>
                        </div>
                    </div>

                    <div className="w-full md:w-auto">
                        <textarea 
                            value={text}
                            onChange={(e) => {
                                setText(e.target.value);
                                handleReset();
                            }}
                            className="w-full md:w-64 h-16 bg-black border border-white/20 rounded-lg p-2 text-xs text-gray-300 resize-none focus:border-cyber outline-none"
                            placeholder="Paste custom text here..."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuantumReader;

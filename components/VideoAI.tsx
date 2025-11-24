
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Brain, Eye, FileText, Activity, Volume2, Maximize, SkipForward, AlertTriangle, Loader2 } from 'lucide-react';

interface VideoAIProps {
    // Optional prop to simulate "Generated" state if passed from Search
    generating?: boolean; 
}

const VideoAI: React.FC<VideoAIProps> = ({ generating = false }) => {
    const [isGenerating, setIsGenerating] = useState(generating);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [distracted, setDistracted] = useState(false);
    const [ingestionRate, setIngestionRate] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (isGenerating) {
            setTimeout(() => setIsGenerating(false), 3000);
        }
    }, [isGenerating]);

    // Simulate playback and AI metrics
    useEffect(() => {
        let interval: any;
        if (playing) {
            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        setPlaying(false);
                        return 100;
                    }
                    return prev + 0.5;
                });

                // Simulate AI metrics
                const isDistracted = Math.random() > 0.95; // 5% chance of distraction
                setDistracted(isDistracted);
                setIngestionRate(isDistracted ? 0 : Math.floor(Math.random() * 20 + 80));

            }, 500);
        }
        return () => clearInterval(interval);
    }, [playing]);

    // Visualizer effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let frameId: number;
        
        const render = () => {
            if (!canvas.parentElement) return;
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (playing) {
                const bars = 50;
                const barWidth = canvas.width / bars;
                
                ctx.fillStyle = '#00f0ff';
                for(let i=0; i<bars; i++) {
                    const h = Math.random() * (canvas.height * 0.5);
                    ctx.fillRect(i * barWidth, canvas.height - h, barWidth - 2, h);
                }
            }
            frameId = requestAnimationFrame(render);
        };
        render();
        return () => cancelAnimationFrame(frameId);
    }, [playing]);

    if (isGenerating) {
        return (
            <div className="min-h-screen bg-black pt-24 px-4 pb-12 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-6">
                        <div className="absolute inset-0 border-4 border-cyber/30 rounded-full animate-spin-slow"></div>
                        <div className="absolute inset-2 border-4 border-t-cyber rounded-full animate-spin"></div>
                        <Brain className="absolute inset-0 m-auto text-cyber animate-pulse" size={32} />
                    </div>
                    <h2 className="text-3xl font-black text-white mb-2">GENERATING CONTENT</h2>
                    <p className="text-gray-400 font-mono text-sm">
                        Synthesizing Video & Audio from 10,000+ Sources...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-7xl mx-auto h-[85vh] flex flex-col lg:flex-row gap-8">
                {/* Video Player */}
                <div className="flex-1 flex flex-col">
                    <div className="relative bg-black border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.1)] aspect-video group">
                        {/* Placeholder for real video */}
                        <div className="absolute inset-0 bg-void-lighter flex items-center justify-center">
                            <canvas ref={canvasRef} className="absolute bottom-0 left-0 w-full h-32 opacity-20 pointer-events-none" />
                            {!playing && (
                                <button 
                                    onClick={() => setPlaying(true)}
                                    className="w-20 h-20 bg-cyber text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_30px_rgba(0,240,255,0.5)] z-10"
                                >
                                    <Play size={32} fill="currentColor" />
                                </button>
                            )}
                            {distracted && playing && (
                                <div className="absolute inset-0 bg-red-500/20 backdrop-blur-sm flex items-center justify-center z-20 animate-pulse">
                                    <div className="bg-black/80 border border-red-500 p-6 rounded-2xl text-center">
                                        <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
                                        <h3 className="text-2xl font-bold text-white mb-2">DIQQAT YO'QOLDI!</h3>
                                        <p className="text-gray-300">IoT Kamerasi sizni chalg'iganingizni aniqladi.<br/>Video avtomatik to'xtatildi.</p>
                                        <button onClick={() => setDistracted(false)} className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg font-bold">Davom Etish</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Controls Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-full bg-gray-700 h-1.5 rounded-full mb-4 cursor-pointer overflow-hidden">
                                <div className="bg-cyber h-full relative" style={{width: `${progress}%`}}>
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_#00f0ff]"></div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center text-white">
                                <div className="flex items-center gap-4">
                                    <button onClick={() => setPlaying(!playing)}>
                                        {playing ? <Pause size={20} /> : <Play size={20} />}
                                    </button>
                                    <span className="text-xs font-mono">04:20 / 12:45</span>
                                    <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs">
                                        <Brain size={12} className="text-cyber" />
                                        <span>AI ANALYSIS ON</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Volume2 size={20} />
                                    <Maximize size={20} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold text-white mb-2">Kvant Fizikasi va SAT Math</h1>
                            <p className="text-gray-400 text-sm">Professor AI • 12,402 views • Updated Today</p>
                        </div>
                        <div className="flex gap-4">
                             <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-white font-bold hover:bg-cyber hover:text-black transition-colors flex items-center gap-2">
                                <FileText size={16} /> Notes
                             </button>
                        </div>
                    </div>
                </div>

                {/* AI Sidebar */}
                <div className="w-full lg:w-96 bg-void-lighter border border-white/10 rounded-3xl p-6 flex flex-col h-full overflow-hidden">
                    <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                        <Activity className="text-cyber" size={20} />
                        REAL-TIME METRICS
                    </h3>

                    {/* Knowledge Ingestion Graph */}
                    <div className="bg-black/40 border border-white/5 p-4 rounded-xl mb-6">
                        <div className="flex justify-between text-xs text-gray-400 mb-2">
                            <span>Knowledge Ingestion</span>
                            <span className="text-cyber font-bold">{ingestionRate}%</span>
                        </div>
                        <div className="flex items-end gap-1 h-24">
                            {Array.from({length: 20}).map((_, i) => (
                                <div 
                                    key={i} 
                                    className="flex-1 bg-cyber/30 rounded-t-sm transition-all duration-300"
                                    style={{
                                        height: `${playing ? Math.random() * 100 : 10}%`,
                                        opacity: i/20
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>

                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-4">AI GENERATED NOTES</h4>
                    <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-2">
                        {[
                            { time: "00:45", text: "Introduction to Quantum Superposition in Math" },
                            { time: "02:12", text: "Key Formula: E = mc^2 application in Geometry" },
                            { time: "05:30", text: "Trick: Solving Quadratics in 5 seconds" },
                            { time: "08:15", text: "Critical Thinking Pattern #4 identified" },
                        ].map((note, i) => (
                            <div key={i} className="flex gap-3 items-start group cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
                                <span className="text-cyber font-mono text-xs mt-1">{note.time}</span>
                                <p className="text-gray-300 text-sm leading-snug group-hover:text-white">{note.text}</p>
                            </div>
                        ))}
                         {playing && (
                            <div className="flex gap-3 items-start animate-pulse">
                                <span className="text-cyber font-mono text-xs mt-1">...</span>
                                <p className="text-gray-500 text-sm italic">AI is analyzing audio stream...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoAI;

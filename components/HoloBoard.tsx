
import React, { useRef, useState, useEffect } from 'react';
import { PenTool, Eraser, Trash2, Brain, Download, Share2, Sparkles, Check } from 'lucide-react';

const HoloBoard: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
    const [color, setColor] = useState('#00f0ff');
    const [analyzing, setAnalyzing] = useState(false);
    const [suggestion, setSuggestion] = useState<string | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resize = () => {
            canvas.width = canvas.parentElement?.clientWidth || 800;
            canvas.height = canvas.parentElement?.clientHeight || 600;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
        };
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    const startDrawing = (e: React.MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        setIsDrawing(true);
        const rect = canvas.getBoundingClientRect();
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    };

    const draw = (e: React.MouseEvent) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        ctx.lineWidth = tool === 'pen' ? 2 : 20;
        ctx.strokeStyle = tool === 'pen' ? color : '#000000'; // Eraser paints black (bg color)
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearBoard = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setSuggestion(null);
    };

    const analyzeBoard = () => {
        setAnalyzing(true);
        setSuggestion(null);
        // Simulate AI Vision
        setTimeout(() => {
            setAnalyzing(false);
            setSuggestion("AI Recognition: It looks like you're solving a Quadratic Equation. Hint: Use the formula x = (-b ± √Δ) / 2a");
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-6xl mx-auto h-[85vh] flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-black text-white flex items-center gap-3">
                            <PenTool className="text-cyber" size={32} />
                            HOLO <span className="text-white">BOARD</span>
                        </h1>
                        <p className="text-gray-400 text-sm">AI-Powered Interactive Whiteboard</p>
                    </div>
                    <div className="flex gap-4">
                        <button 
                            onClick={analyzeBoard}
                            disabled={analyzing}
                            className="bg-cyber text-black px-6 py-2 rounded-xl font-bold hover:bg-white transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                            {analyzing ? <Sparkles className="animate-spin" size={18} /> : <Brain size={18} />}
                            {analyzing ? 'ANALYZING STROKES...' : 'AI ASSIST'}
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex gap-4">
                    {/* Tools */}
                    <div className="w-16 bg-void-lighter border border-white/10 rounded-2xl flex flex-col items-center py-4 gap-4">
                        <button 
                            onClick={() => setTool('pen')}
                            className={`p-3 rounded-xl transition-all ${tool === 'pen' ? 'bg-cyber text-black' : 'text-gray-400 hover:bg-white/10'}`}
                        >
                            <PenTool size={20} />
                        </button>
                        <button 
                            onClick={() => setTool('eraser')}
                            className={`p-3 rounded-xl transition-all ${tool === 'eraser' ? 'bg-white text-black' : 'text-gray-400 hover:bg-white/10'}`}
                        >
                            <Eraser size={20} />
                        </button>
                        <div className="h-px w-8 bg-white/10"></div>
                        {[ '#00f0ff', '#a855f7', '#22c55e', '#ffffff' ].map(c => (
                            <button
                                key={c}
                                onClick={() => { setColor(c); setTool('pen'); }}
                                className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${color === c && tool === 'pen' ? 'border-white scale-110' : 'border-transparent'}`}
                                style={{ backgroundColor: c }}
                            />
                        ))}
                        <div className="flex-1"></div>
                        <button onClick={clearBoard} className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all">
                            <Trash2 size={20} />
                        </button>
                    </div>

                    {/* Canvas */}
                    <div className="flex-1 bg-black border border-cyber/30 rounded-3xl relative overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.1)] cursor-crosshair">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
                        <canvas 
                            ref={canvasRef}
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            className="w-full h-full"
                        />
                        
                        {suggestion && (
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur border border-cyber/50 px-6 py-4 rounded-2xl max-w-xl animate-in slide-in-from-bottom">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-cyber/20 rounded-lg text-cyber">
                                        <Brain size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-cyber font-bold text-sm mb-1">AI Insight</h4>
                                        <p className="text-white text-sm leading-relaxed">{suggestion}</p>
                                    </div>
                                    <button onClick={() => setSuggestion(null)} className="text-gray-500 hover:text-white">
                                        <Check size={16} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HoloBoard;

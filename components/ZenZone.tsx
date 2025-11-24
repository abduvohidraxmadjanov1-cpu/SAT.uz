
import React, { useState, useEffect, useRef } from 'react';
import { Headphones, Wind, Play, Pause, Volume2, Activity } from 'lucide-react';

const ZenZone: React.FC = () => {
    const [playing, setPlaying] = useState(false);
    const [mode, setMode] = useState<'focus' | 'relax' | 'sleep'>('focus');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let offset = 0;

        const render = () => {
            canvas.width = canvas.parentElement?.clientWidth || 800;
            canvas.height = canvas.parentElement?.clientHeight || 400;
            const w = canvas.width;
            const h = canvas.height;

            ctx.clearRect(0, 0, w, h);
            
            if (playing) {
                offset += 0.05;
                ctx.lineWidth = 2;
                
                const colors = mode === 'focus' ? ['#00f0ff', '#004a4d'] : mode === 'relax' ? ['#a855f7', '#581c87'] : ['#3b82f6', '#1e3a8a'];

                for (let i = 0; i < 3; i++) {
                    ctx.beginPath();
                    ctx.strokeStyle = colors[0];
                    ctx.globalAlpha = 0.5 - (i * 0.1);
                    for (let x = 0; x < w; x++) {
                        const y = h/2 + Math.sin(x * 0.01 + offset + i) * (50 + i * 20);
                        if (x === 0) ctx.moveTo(x, y);
                        else ctx.lineTo(x, y);
                    }
                    ctx.stroke();
                }
            }

            animationId = requestAnimationFrame(render);
        };
        render();
        return () => cancelAnimationFrame(animationId);
    }, [playing, mode]);

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black text-white mb-2 flex items-center justify-center gap-3">
                        <Headphones className="text-cyber" size={40} />
                        ZEN <span className="text-white">ZONE</span>
                    </h1>
                    <p className="text-gray-400">Neuro-Acoustic Focus Optimization</p>
                </div>

                <div className="bg-void-lighter border border-white/10 rounded-3xl p-1 relative overflow-hidden h-96 mb-12 shadow-[0_0_50px_rgba(0,240,255,0.1)]">
                    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                    
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <button 
                            onClick={() => setPlaying(!playing)}
                            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all transform hover:scale-110 ${playing ? 'bg-white/10 text-white border border-white/20' : 'bg-cyber text-black shadow-[0_0_30px_rgba(0,240,255,0.5)]'}`}
                        >
                            {playing ? <Pause size={40} /> : <Play size={40} fill="currentColor" />}
                        </button>
                    </div>

                    <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 z-10">
                        {['focus', 'relax', 'sleep'].map((m) => (
                            <button 
                                key={m}
                                onClick={() => setMode(m as any)}
                                className={`px-6 py-2 rounded-full text-sm font-bold uppercase transition-all border ${mode === m ? 'bg-white text-black border-white' : 'bg-black/50 text-gray-400 border-white/10 hover:border-white/30'}`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-void-lighter border border-white/10 p-6 rounded-2xl flex items-center gap-4">
                        <div className="p-3 bg-cyber/10 rounded-xl text-cyber">
                            <Activity size={24} />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-sm">Binaural Beats</h3>
                            <p className="text-gray-400 text-xs">40Hz Gamma Waves</p>
                        </div>
                    </div>
                    <div className="bg-void-lighter border border-white/10 p-6 rounded-2xl flex items-center gap-4">
                        <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500">
                            <Wind size={24} />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-sm">Breathing</h3>
                            <p className="text-gray-400 text-xs">4-7-8 Technique</p>
                        </div>
                    </div>
                    <div className="bg-void-lighter border border-white/10 p-6 rounded-2xl flex items-center gap-4">
                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                            <Volume2 size={24} />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-sm">Pink Noise</h3>
                            <p className="text-gray-400 text-xs">Background masking</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ZenZone;

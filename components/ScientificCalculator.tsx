
import React, { useState, useRef, useEffect } from 'react';
import { Calculator, Delete, Hash, Activity, TrendingUp, RefreshCcw } from 'lucide-react';

const ScientificCalculator: React.FC = () => {
    const [display, setDisplay] = useState('0');
    const [equation, setEquation] = useState('');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handlePress = (val: string) => {
        if (val === 'AC') {
            setDisplay('0');
            setEquation('');
        } else if (val === 'DEL') {
            setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
        } else if (val === '=') {
            try {
                // eslint-disable-next-line no-eval
                const res = eval(display.replace('x', '*').replace('÷', '/').replace('^', '**').replace('π', 'Math.PI').replace('e', 'Math.E'));
                setEquation(display + ' =');
                setDisplay(String(res));
            } catch {
                setDisplay('Error');
            }
        } else {
            setDisplay(prev => prev === '0' ? val : prev + val);
        }
    };

    // Render Graph Visualization (Simulated)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrame: number;
        let offset = 0;

        const render = () => {
            canvas.width = canvas.parentElement?.clientWidth || 400;
            canvas.height = canvas.parentElement?.clientHeight || 200;
            const w = canvas.width;
            const h = canvas.height;
            const cy = h / 2;

            ctx.clearRect(0, 0, w, h);
            
            // Grid
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, cy); ctx.lineTo(w, cy); // X-axis
            ctx.moveTo(w/2, 0); ctx.lineTo(w/2, h); // Y-axis
            ctx.stroke();

            // Sine Wave Simulation
            offset += 0.05;
            ctx.strokeStyle = '#00f0ff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            for (let x = 0; x < w; x++) {
                const y = cy - Math.sin((x / 50) + offset) * 50;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            animationFrame = requestAnimationFrame(render);
        };
        render();
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    const BTNS = [
        ['AC', 'DEL', '%', '÷'],
        ['7', '8', '9', 'x'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '+'],
        ['0', '.', 'π', '=']
    ];

    const SCI_BTNS = ['sin', 'cos', 'tan', 'log', 'ln', '√', '^', '(', ')', 'e'];

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12 select-none">
            <div className="max-w-5xl mx-auto h-[80vh] flex flex-col md:flex-row gap-8">
                {/* Calculator */}
                <div className="w-full md:w-96 bg-void-lighter border border-white/10 rounded-3xl p-6 shadow-[0_0_50px_rgba(0,240,255,0.1)]">
                    <div className="mb-6 bg-black border border-white/10 rounded-2xl p-6 text-right h-32 flex flex-col justify-end">
                        <div className="text-gray-500 text-sm font-mono h-6">{equation}</div>
                        <div className="text-4xl font-black text-white font-mono overflow-hidden">{display}</div>
                    </div>

                    <div className="grid grid-cols-5 gap-2 mb-2">
                        {SCI_BTNS.map(btn => (
                            <button 
                                key={btn}
                                onClick={() => handlePress(btn)}
                                className="py-2 bg-white/5 text-cyber text-xs font-bold rounded-lg hover:bg-white/10 transition-all"
                            >
                                {btn}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                        {BTNS.map((row, i) => (
                            <React.Fragment key={i}>
                                {row.map(btn => (
                                    <button 
                                        key={btn}
                                        onClick={() => handlePress(btn)}
                                        className={`
                                            py-4 rounded-2xl font-bold text-xl transition-all active:scale-95
                                            ${btn === '=' ? 'bg-cyber text-black shadow-[0_0_20px_rgba(0,240,255,0.3)]' : 
                                              ['AC', 'DEL'].includes(btn) ? 'bg-red-500/20 text-red-500' : 
                                              ['÷', 'x', '-', '+', '%'].includes(btn) ? 'bg-white/10 text-cyber' : 
                                              'bg-black border border-white/10 text-white hover:bg-white/5'}
                                        `}
                                    >
                                        {btn}
                                    </button>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Graph Area */}
                <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-3xl font-black text-white flex items-center gap-3">
                                <Calculator className="text-cyber" size={32} />
                                NEURAL <span className="text-white">CALC</span>
                            </h1>
                            <p className="text-gray-400 text-sm">Scientific Graphing Engine</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2">
                            <Activity size={16} className="text-green-500" />
                            <span className="text-xs font-bold text-white">PLOT MODE: ACTIVE</span>
                        </div>
                    </div>

                    <div className="flex-1 bg-black border border-cyber/30 rounded-3xl relative overflow-hidden shadow-lg">
                        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                        
                        <div className="absolute top-6 left-6 bg-black/80 backdrop-blur border border-white/10 p-4 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-3 h-3 bg-cyber rounded-full"></div>
                                <span className="text-cyber font-mono text-sm font-bold">y = sin(x)</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500 text-xs">
                                <TrendingUp size={12} /> Real-time rendering
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScientificCalculator;

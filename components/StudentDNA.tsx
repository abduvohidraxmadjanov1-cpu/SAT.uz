
import React, { useEffect, useRef, useState } from 'react';
import { Dna, Brain, Cpu, Zap, Activity } from 'lucide-react';

const StudentDNA: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stats, setStats] = useState({
        cognitive: "Visual Learner",
        memory: "98% Retention",
        logic: "Quantum Tier",
        speed: "1.2ms Reaction"
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let frameId: number;
        let t = 0;

        const render = () => {
            canvas.width = canvas.parentElement?.clientWidth || 800;
            canvas.height = canvas.parentElement?.clientHeight || 600;
            const w = canvas.width;
            const h = canvas.height;
            
            ctx.clearRect(0, 0, w, h);
            
            // Draw DNA Helix
            const strands = 2;
            const amplitude = 50;
            const frequency = 0.02;
            const speed = 0.05;
            const points = 40;
            const spacing = h / points;

            t += speed;

            for (let i = 0; i < points; i++) {
                const y = i * spacing + (spacing / 2);
                
                // Strand 1
                const x1 = w / 2 + Math.sin(y * frequency + t) * amplitude;
                const z1 = Math.cos(y * frequency + t); // Depth simulated by size/opacity
                
                // Strand 2
                const x2 = w / 2 + Math.sin(y * frequency + t + Math.PI) * amplitude;
                const z2 = Math.cos(y * frequency + t + Math.PI);

                // Draw Connections (Base Pairs)
                ctx.beginPath();
                ctx.moveTo(x1, y);
                ctx.lineTo(x2, y);
                ctx.strokeStyle = `rgba(0, 240, 255, 0.2)`;
                ctx.lineWidth = 1;
                ctx.stroke();

                // Draw Particles
                const drawParticle = (x: number, y: number, z: number, color: string) => {
                    const size = (z + 2) * 3; // Scale by depth
                    const alpha = (z + 1.5) / 2.5; // Opacity by depth
                    
                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fillStyle = color.replace('ALPHA', alpha.toString());
                    ctx.fill();

                    // Glow effect for front particles
                    if (z > 0) {
                        ctx.shadowBlur = 10;
                        ctx.shadowColor = color.replace('ALPHA', '1');
                    } else {
                        ctx.shadowBlur = 0;
                    }
                };

                drawParticle(x1, y, z1, `rgba(0, 240, 255, ALPHA)`); // Cyber Blue
                drawParticle(x2, y, z2, `rgba(168, 85, 247, ALPHA)`); // Purple
                ctx.shadowBlur = 0; // Reset
            }

            frameId = requestAnimationFrame(render);
        };
        render();
        return () => cancelAnimationFrame(frameId);
    }, []);

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-6xl mx-auto h-[80vh] flex flex-col md:flex-row gap-8">
                {/* 3D Visualizer */}
                <div className="flex-1 bg-void-lighter border border-cyber/30 rounded-3xl relative overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.1)]">
                    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                    
                    <div className="absolute top-6 left-6">
                        <h2 className="text-2xl font-black text-white flex items-center gap-2">
                            <Dna className="text-cyber animate-spin-slow" />
                            STUDENT <span className="text-purple-500">DNA</span>
                        </h2>
                        <p className="text-gray-400 text-sm font-mono mt-1">Digital Learning Profile v4.0</p>
                    </div>

                    <div className="absolute bottom-6 right-6 text-right">
                         <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Genome Sequence</div>
                         <div className="font-mono text-cyber text-sm">AGCT-8821-X99-QA</div>
                    </div>
                </div>

                {/* Analysis Panel */}
                <div className="w-full md:w-96 flex flex-col gap-6">
                    <div className="bg-void-lighter border border-white/10 p-6 rounded-2xl">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <Brain className="text-cyber" size={18} /> COGNITIVE STYLE
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-sm">Visual</span>
                                <div className="w-32 bg-gray-800 h-2 rounded-full overflow-hidden">
                                    <div className="bg-cyber h-full w-[85%]"></div>
                                </div>
                            </div>
                             <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-sm">Auditory</span>
                                <div className="w-32 bg-gray-800 h-2 rounded-full overflow-hidden">
                                    <div className="bg-purple-500 h-full w-[45%]"></div>
                                </div>
                            </div>
                             <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-sm">Kinesthetic</span>
                                <div className="w-32 bg-gray-800 h-2 rounded-full overflow-hidden">
                                    <div className="bg-green-500 h-full w-[60%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/40 border border-white/10 p-4 rounded-xl text-center">
                            <Cpu size={24} className="text-blue-400 mx-auto mb-2" />
                            <div className="text-xs text-gray-500 uppercase">Logic Tier</div>
                            <div className="text-white font-bold">Quantum</div>
                        </div>
                         <div className="bg-black/40 border border-white/10 p-4 rounded-xl text-center">
                            <Zap size={24} className="text-yellow-400 mx-auto mb-2" />
                            <div className="text-xs text-gray-500 uppercase">Reaction</div>
                            <div className="text-white font-bold">1.2ms</div>
                        </div>
                         <div className="bg-black/40 border border-white/10 p-4 rounded-xl text-center">
                            <Activity size={24} className="text-red-400 mx-auto mb-2" />
                            <div className="text-xs text-gray-500 uppercase">Stamina</div>
                            <div className="text-white font-bold">High</div>
                        </div>
                         <div className="bg-black/40 border border-white/10 p-4 rounded-xl text-center">
                            <Brain size={24} className="text-green-400 mx-auto mb-2" />
                            <div className="text-xs text-gray-500 uppercase">Memory</div>
                            <div className="text-white font-bold">98%</div>
                        </div>
                    </div>

                    <div className="bg-cyber/10 border border-cyber/20 p-6 rounded-2xl flex-1 flex flex-col justify-center text-center">
                        <p className="text-cyber text-sm font-bold mb-2">AI RECOMMENDATION</p>
                        <p className="text-gray-300 text-sm">
                            Sizning vizual xotirangiz kuchli. Video darsliklar va sxemalar orqali o'qish samaradorligingizni 40% ga oshiradi.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDNA;

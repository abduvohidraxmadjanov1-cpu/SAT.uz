
import React, { useState, useEffect, useRef } from 'react';
import { Box, Circle, Triangle, Layers, Maximize, Rotate3d, Calculator } from 'lucide-react';

const GeometryVoid: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [shape, setShape] = useState<'cube' | 'sphere' | 'cone'>('cube');
    const [dimension, setDimension] = useState(50); // Base dimension (radius or side)
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [stats, setStats] = useState({ volume: 0, surfaceArea: 0 });

    useEffect(() => {
        // Calculate Stats
        let v = 0, sa = 0;
        const d = dimension / 10; // Normalize for calculation display
        if (shape === 'cube') {
            v = Math.pow(d, 3);
            sa = 6 * Math.pow(d, 2);
        } else if (shape === 'sphere') {
            v = (4/3) * Math.PI * Math.pow(d, 3);
            sa = 4 * Math.PI * Math.pow(d, 2);
        } else if (shape === 'cone') {
            const h = d * 2; // Assume height = 2r for visualization simplicity
            v = (1/3) * Math.PI * Math.pow(d, 2) * h;
            sa = Math.PI * d * (d + Math.sqrt(Math.pow(h, 2) + Math.pow(d, 2)));
        }
        setStats({ volume: parseFloat(v.toFixed(2)), surfaceArea: parseFloat(sa.toFixed(2)) });
    }, [shape, dimension]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrame: number;
        let rotX = 0;
        let rotY = 0;

        const render = () => {
            if (!canvas.parentElement) return;
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#00f0ff';
            ctx.lineWidth = 2;
            ctx.fillStyle = 'rgba(0, 240, 255, 0.1)';

            rotX += 0.01;
            rotY += 0.015;

            const project = (x: number, y: number, z: number) => {
                // Rotate Y
                let x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
                let z1 = z * Math.cos(rotY) + x * Math.sin(rotY);
                // Rotate X
                let y1 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
                let z2 = z1 * Math.cos(rotX) + y * Math.sin(rotX);
                
                const scale = 400 / (400 + z2);
                return { x: cx + x1 * scale, y: cy + y1 * scale };
            };

            if (shape === 'cube') {
                const s = dimension * 1.5;
                const vertices = [
                    {x:-s,y:-s,z:-s}, {x:s,y:-s,z:-s}, {x:s,y:s,z:-s}, {x:-s,y:s,z:-s},
                    {x:-s,y:-s,z:s}, {x:s,y:-s,z:s}, {x:s,y:s,z:s}, {x:-s,y:s,z:s}
                ];
                const projected = vertices.map(v => project(v.x, v.y, v.z));

                const edges = [
                    [0,1], [1,2], [2,3], [3,0], // Front face
                    [4,5], [5,6], [6,7], [7,4], // Back face
                    [0,4], [1,5], [2,6], [3,7]  // Connecting lines
                ];

                ctx.beginPath();
                edges.forEach(e => {
                    ctx.moveTo(projected[e[0]].x, projected[e[0]].y);
                    ctx.lineTo(projected[e[1]].x, projected[e[1]].y);
                });
                ctx.stroke();
            } 
            else if (shape === 'sphere') {
                // Simplified wireframe sphere (latitudes/longitudes)
                const r = dimension * 1.5;
                
                // Longitudes
                for (let i = 0; i < Math.PI; i += Math.PI / 4) {
                    ctx.beginPath();
                    for (let j = 0; j <= Math.PI * 2; j += 0.1) {
                        const x = r * Math.sin(j) * Math.cos(i);
                        const y = r * Math.cos(j);
                        const z = r * Math.sin(j) * Math.sin(i);
                        const p = project(x, y, z);
                        if (j === 0) ctx.moveTo(p.x, p.y);
                        else ctx.lineTo(p.x, p.y);
                    }
                    ctx.stroke();
                }
                // Latitudes
                for (let i = -1; i <= 1; i += 0.5) {
                     ctx.beginPath();
                     const rLat = r * Math.cos(i * Math.PI/2);
                     const yLat = r * Math.sin(i * Math.PI/2);
                     for (let j = 0; j <= Math.PI * 2; j += 0.1) {
                         const x = rLat * Math.cos(j);
                         const z = rLat * Math.sin(j);
                         const p = project(x, yLat, z);
                         if(j===0) ctx.moveTo(p.x, p.y);
                         else ctx.lineTo(p.x, p.y);
                     }
                     ctx.stroke();
                }
            }
            else if (shape === 'cone') {
                const r = dimension * 1.5;
                const h = dimension * 3;
                const segments = 8;
                
                // Base circle
                ctx.beginPath();
                for(let i=0; i<=Math.PI*2; i+=0.1) {
                    const x = r * Math.cos(i);
                    const z = r * Math.sin(i);
                    const p = project(x, h/2, z);
                    if(i===0) ctx.moveTo(p.x, p.y);
                    else ctx.lineTo(p.x, p.y);
                }
                ctx.stroke();

                // Lines to apex
                const apex = project(0, -h/2, 0);
                for(let i=0; i<segments; i++) {
                    const angle = (i / segments) * Math.PI * 2;
                    const basePt = project(r * Math.cos(angle), h/2, r * Math.sin(angle));
                    ctx.beginPath();
                    ctx.moveTo(apex.x, apex.y);
                    ctx.lineTo(basePt.x, basePt.y);
                    ctx.stroke();
                }
            }

            animationFrame = requestAnimationFrame(render);
        };
        render();
        return () => cancelAnimationFrame(animationFrame);
    }, [shape, dimension]);

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-6xl mx-auto h-[80vh] flex flex-col">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-white flex items-center gap-3">
                            <Rotate3d className="text-cyber" size={32} />
                            GEOMETRY VOID
                        </h1>
                        <p className="text-gray-400 text-sm">3D Spatial Reasoning Lab</p>
                    </div>
                    <div className="flex bg-white/5 rounded-xl p-1">
                        <button 
                            onClick={() => setShape('cube')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${shape === 'cube' ? 'bg-cyber text-black' : 'text-gray-400 hover:text-white'}`}
                        >
                            <Box size={16} /> CUBE
                        </button>
                        <button 
                            onClick={() => setShape('sphere')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${shape === 'sphere' ? 'bg-cyber text-black' : 'text-gray-400 hover:text-white'}`}
                        >
                            <Circle size={16} /> SPHERE
                        </button>
                        <button 
                            onClick={() => setShape('cone')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${shape === 'cone' ? 'bg-cyber text-black' : 'text-gray-400 hover:text-white'}`}
                        >
                            <Triangle size={16} /> CONE
                        </button>
                    </div>
                </div>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Canvas */}
                    <div className="lg:col-span-2 bg-black border border-white/10 rounded-3xl relative overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.1)]">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.05)_0%,transparent_70%)] pointer-events-none"></div>
                        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                        
                        <div className="absolute bottom-8 left-8 right-8">
                            <label className="text-xs text-cyber font-bold uppercase mb-2 block">Dimension Scale: {dimension}</label>
                            <input 
                                type="range" 
                                min="20" 
                                max="100" 
                                value={dimension} 
                                onChange={(e) => setDimension(Number(e.target.value))}
                                className="w-full h-2 bg-gray-800 rounded-full appearance-none cursor-pointer accent-cyber"
                            />
                        </div>
                    </div>

                    {/* Stats Panel */}
                    <div className="bg-void-lighter border border-white/10 rounded-3xl p-8 flex flex-col">
                        <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                            <Calculator size={20} className="text-cyber" />
                            REAL-TIME METRICS
                        </h3>

                        <div className="space-y-6 flex-1">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 group hover:border-cyber/50 transition-all">
                                <div className="text-gray-500 text-xs font-bold uppercase mb-1">Volume</div>
                                <div className="text-3xl font-black text-white group-hover:text-cyber transition-colors">
                                    {stats.volume} <span className="text-sm text-gray-500">units³</span>
                                </div>
                                <div className="text-xs text-gray-600 font-mono mt-2 bg-black/20 p-2 rounded">
                                    {shape === 'cube' && 'V = a³'}
                                    {shape === 'sphere' && 'V = (4/3)πr³'}
                                    {shape === 'cone' && 'V = (1/3)πr²h'}
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 group hover:border-purple-500/50 transition-all">
                                <div className="text-gray-500 text-xs font-bold uppercase mb-1">Surface Area</div>
                                <div className="text-3xl font-black text-white group-hover:text-purple-500 transition-colors">
                                    {stats.surfaceArea} <span className="text-sm text-gray-500">units²</span>
                                </div>
                                <div className="text-xs text-gray-600 font-mono mt-2 bg-black/20 p-2 rounded">
                                    {shape === 'cube' && 'A = 6a²'}
                                    {shape === 'sphere' && 'A = 4πr²'}
                                    {shape === 'cone' && 'A = πr(r + √(h² + r²))'}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                            <div className="flex items-start gap-3">
                                <Maximize size={18} className="text-blue-400 mt-1" />
                                <div>
                                    <h4 className="text-blue-400 font-bold text-sm">Spatial Tip</h4>
                                    <p className="text-gray-400 text-xs mt-1">
                                        SAT geometry problems often require visualizing 3D cross-sections. Try to imagine slicing this {shape} in half.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeometryVoid;

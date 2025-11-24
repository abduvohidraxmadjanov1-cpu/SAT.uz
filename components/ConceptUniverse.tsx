
import React, { useEffect, useRef, useState } from 'react';
import { Globe, Search, Maximize, Database, Share2 } from 'lucide-react';

const ConceptUniverse: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedNode, setSelectedNode] = useState<string | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.parentElement?.clientWidth || 800;
        let height = canvas.parentElement?.clientHeight || 600;
        
        const nodes: {x: number, y: number, z: number, label: string, color: string, size: number}[] = [];
        const connections: {source: number, target: number}[] = [];

        // Generate Universe Data
        const topics = ["Algebra", "Geometry", "Trig", "Calc", "Reading", "Grammar", "Vocab", "Essay", "Logic", "Data"];
        for (let i = 0; i < 50; i++) {
            nodes.push({
                x: (Math.random() - 0.5) * 800,
                y: (Math.random() - 0.5) * 600,
                z: (Math.random() - 0.5) * 800,
                label: topics[Math.floor(Math.random() * topics.length)],
                color: Math.random() > 0.5 ? '#00f0ff' : '#a855f7',
                size: Math.random() * 3 + 1
            });
        }

        // Generate Connections
        for(let i=0; i<nodes.length; i++) {
            const target = Math.floor(Math.random() * nodes.length);
            if (target !== i) connections.push({source: i, target});
        }

        let rotation = 0;

        const render = () => {
            width = canvas.parentElement?.clientWidth || 800;
            height = canvas.parentElement?.clientHeight || 600;
            canvas.width = width;
            canvas.height = height;
            
            const cx = width / 2;
            const cy = height / 2;

            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, width, height);

            rotation += 0.002;

            // Sort nodes by depth for proper z-indexing
            const projectedNodes = nodes.map((node, index) => {
                // Rotate Y
                let x = node.x * Math.cos(rotation) - node.z * Math.sin(rotation);
                let z = node.z * Math.cos(rotation) + node.x * Math.sin(rotation);
                
                // Perspective
                const scale = 600 / (600 + z);
                const screenX = cx + x * scale;
                const screenY = cy + node.y * scale;
                
                return { ...node, screenX, screenY, scale, index };
            }).sort((a, b) => b.scale - a.scale);

            // Draw Connections
            ctx.lineWidth = 0.5;
            connections.forEach(conn => {
                const source = projectedNodes.find(n => n.index === conn.source);
                const target = projectedNodes.find(n => n.index === conn.target);
                
                if (source && target && source.scale > 0 && target.scale > 0) {
                    const dist = Math.hypot(source.screenX - target.screenX, source.screenY - target.screenY);
                    const alpha = Math.max(0, 1 - dist / 300) * 0.5;
                    
                    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                    ctx.beginPath();
                    ctx.moveTo(source.screenX, source.screenY);
                    ctx.lineTo(target.screenX, target.screenY);
                    ctx.stroke();
                }
            });

            // Draw Nodes
            projectedNodes.forEach(node => {
                if (node.scale <= 0) return;
                
                ctx.beginPath();
                ctx.arc(node.screenX, node.screenY, node.size * node.scale, 0, Math.PI * 2);
                ctx.fillStyle = node.color;
                
                // Glow
                if (node.scale > 0.8) {
                    ctx.shadowColor = node.color;
                    ctx.shadowBlur = 10 * node.scale;
                } else {
                    ctx.shadowBlur = 0;
                }
                
                ctx.fill();
                ctx.shadowBlur = 0;

                // Labels for close nodes
                if (node.scale > 0.9) {
                    ctx.fillStyle = '#fff';
                    ctx.font = `${10 * node.scale}px Inter`;
                    ctx.fillText(node.label, node.screenX + 10, node.screenY);
                }
            });

            requestAnimationFrame(render);
        };

        render();
    }, []);

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-7xl mx-auto h-[85vh] flex flex-col">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
                            <Globe className="text-cyber" size={40} />
                            TUSHUNCHALAR <span className="text-white">KOINOTI</span>
                        </h1>
                        <p className="text-gray-400">Interactive 3D Knowledge Graph</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Search Concept..." 
                                className="bg-void-lighter border border-white/10 rounded-xl px-4 py-2 pl-10 text-white focus:border-cyber outline-none"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        </div>
                    </div>
                </div>

                <div className="flex-1 bg-black border border-white/10 rounded-3xl relative overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.1)]">
                    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                    
                    <div className="absolute bottom-8 left-8 p-6 bg-black/60 backdrop-blur border border-white/10 rounded-2xl max-w-xs">
                        <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                            <Database size={16} className="text-cyber" /> Selected Node
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Hover over nodes to see connections. Blue nodes represent mastered topics; Purple nodes need review.
                        </p>
                        <div className="flex gap-2">
                            <span className="w-3 h-3 rounded-full bg-cyber"></span> <span className="text-xs text-gray-400">Mastered</span>
                            <span className="w-3 h-3 rounded-full bg-purple-500"></span> <span className="text-xs text-gray-400">Review</span>
                        </div>
                    </div>

                    <div className="absolute top-8 right-8 flex flex-col gap-2">
                        <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all">
                            <Maximize size={20} />
                        </button>
                        <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all">
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConceptUniverse;


import React, { useState, useRef, useEffect } from 'react';
import { Network, GitBranch, ZoomIn, ZoomOut, Search, Sparkles, Share2, Download } from 'lucide-react';

interface Node {
    id: number;
    label: string;
    x: number;
    y: number;
    type: 'root' | 'main' | 'sub';
    connections: number[];
}

const MindMapGenerator: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [topic, setTopic] = useState('');
    const [generating, setGenerating] = useState(false);
    const [nodes, setNodes] = useState<Node[]>([]);
    const [zoom, setZoom] = useState(1);

    // Simulate AI Generation
    const generateMap = () => {
        if (!topic.trim()) return;
        setGenerating(true);
        setNodes([]);

        setTimeout(() => {
            const newNodes: Node[] = [];
            const centerX = 400;
            const centerY = 300;

            // Root
            newNodes.push({ id: 0, label: topic.toUpperCase(), x: centerX, y: centerY, type: 'root', connections: [] });

            // Main Branches
            const branches = 5;
            for (let i = 0; i < branches; i++) {
                const angle = (i / branches) * Math.PI * 2;
                const dist = 150;
                const x = centerX + Math.cos(angle) * dist;
                const y = centerY + Math.sin(angle) * dist;
                newNodes.push({ 
                    id: i + 1, 
                    label: `Concept ${i + 1}`, 
                    x, 
                    y, 
                    type: 'main', 
                    connections: [0] 
                });

                // Sub Branches
                const subs = 3;
                for (let j = 0; j < subs; j++) {
                    const subAngle = angle + (j - 1) * 0.5;
                    const subDist = 80;
                    newNodes.push({
                        id: (i + 1) * 10 + j,
                        label: `Detail ${i}.${j}`,
                        x: x + Math.cos(subAngle) * subDist,
                        y: y + Math.sin(subAngle) * subDist,
                        type: 'sub',
                        connections: [i + 1]
                    });
                }
            }

            setNodes(newNodes);
            setGenerating(false);
        }, 2000);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const render = () => {
            canvas.width = canvas.parentElement?.clientWidth || 800;
            canvas.height = canvas.parentElement?.clientHeight || 600;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.scale(zoom, zoom);
            ctx.translate(canvas.width/2 * (1-1/zoom), canvas.height/2 * (1-1/zoom)); // Center zoom

            // Draw Connections
            ctx.lineWidth = 2;
            nodes.forEach(node => {
                node.connections.forEach(targetId => {
                    const target = nodes.find(n => n.id === targetId);
                    if (target) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(target.x, target.y);
                        ctx.strokeStyle = node.type === 'sub' ? 'rgba(0, 240, 255, 0.3)' : 'rgba(0, 240, 255, 0.6)';
                        ctx.stroke();
                    }
                });
            });

            // Draw Nodes
            nodes.forEach(node => {
                ctx.beginPath();
                const radius = node.type === 'root' ? 40 : node.type === 'main' ? 25 : 15;
                ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
                ctx.fillStyle = node.type === 'root' ? '#000' : '#0a0a0a';
                ctx.fill();
                ctx.lineWidth = node.type === 'root' ? 3 : 1;
                ctx.strokeStyle = node.type === 'root' ? '#00f0ff' : '#ffffff';
                ctx.stroke();

                if (node.type === 'root') {
                    ctx.shadowColor = '#00f0ff';
                    ctx.shadowBlur = 20;
                    ctx.stroke();
                    ctx.shadowBlur = 0;
                }

                // Text
                ctx.fillStyle = '#fff';
                ctx.font = `${node.type === 'root' ? 'bold 14px' : '10px'} Inter`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(node.label, node.x, node.y);
            });

            ctx.restore();
        };

        render();
    }, [nodes, zoom]);

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-6xl mx-auto h-[85vh] flex flex-col">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
                            <Network className="text-cyber" size={40} />
                            MIND MAP <span className="text-white">AI</span>
                        </h1>
                        <p className="text-gray-400">Intelligent Knowledge Graph Generator</p>
                    </div>
                    
                    <div className="flex-1 w-full max-w-xl flex gap-2 relative">
                        <input 
                            type="text" 
                            value={topic} 
                            onChange={(e) => setTopic(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && generateMap()}
                            placeholder="Enter topic (e.g. 'Linear Algebra', 'French Revolution')"
                            className="w-full bg-void-lighter border border-white/20 rounded-xl px-6 py-3 pl-12 text-white focus:border-cyber outline-none"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <button 
                            onClick={generateMap}
                            disabled={generating}
                            className="bg-cyber text-black px-6 rounded-xl font-bold hover:bg-white transition-all flex items-center gap-2 whitespace-nowrap disabled:opacity-50"
                        >
                            {generating ? <Sparkles className="animate-spin" size={18} /> : "GENERATE"}
                        </button>
                    </div>
                </div>

                <div className="flex-1 bg-void-lighter border border-white/10 rounded-3xl relative overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.1)]">
                    <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>
                    <canvas ref={canvasRef} className="w-full h-full" />

                    {/* Controls */}
                    <div className="absolute bottom-8 right-8 flex flex-col gap-2">
                        <button onClick={() => setZoom(z => Math.min(2, z + 0.1))} className="p-3 bg-black/80 border border-white/20 rounded-xl text-white hover:text-cyber hover:border-cyber transition-all">
                            <ZoomIn size={20} />
                        </button>
                        <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} className="p-3 bg-black/80 border border-white/20 rounded-xl text-white hover:text-cyber hover:border-cyber transition-all">
                            <ZoomOut size={20} />
                        </button>
                    </div>

                    <div className="absolute top-8 right-8 flex gap-2">
                        <button className="p-3 bg-black/80 border border-white/20 rounded-xl text-white hover:text-cyber transition-all">
                            <Share2 size={20} />
                        </button>
                        <button className="p-3 bg-black/80 border border-white/20 rounded-xl text-white hover:text-cyber transition-all">
                            <Download size={20} />
                        </button>
                    </div>

                    {nodes.length === 0 && !generating && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 pointer-events-none">
                            <GitBranch size={64} className="mb-4 opacity-20" />
                            <p className="text-lg">Enter a topic to visualize the knowledge structure.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MindMapGenerator;

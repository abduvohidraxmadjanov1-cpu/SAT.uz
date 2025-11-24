
import React, { useState, useRef, useEffect } from 'react';
import { Network, GitCommit, ArrowRight, FileText, RefreshCw, ZoomIn } from 'lucide-react';

interface LogicNode {
    id: number;
    text: string;
    type: 'premise' | 'evidence' | 'conclusion' | 'counter';
    x: number;
    y: number;
    connections: number[];
}

const DEFAULT_PASSAGE = `Although digital art has gained popularity, traditional painting remains valuable. The tactile feedback of a brush on canvas allows for intuitive expression that screens cannot replicate. Furthermore, original physical artworks possess a unique texture and provenance that digital files lack. Therefore, despite technological advancements, traditional mediums will persist.`;

const LogicGraph: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [passage, setPassage] = useState(DEFAULT_PASSAGE);
    const [analyzing, setAnalyzing] = useState(false);
    const [nodes, setNodes] = useState<LogicNode[]>([]);

    const analyzeLogic = () => {
        setAnalyzing(true);
        setNodes([]);
        
        // Simulating NLP Parsing
        setTimeout(() => {
            const width = canvasRef.current?.width || 800;
            const cx = width / 2;
            
            setNodes([
                { id: 1, text: "Traditional painting remains valuable", type: 'conclusion', x: cx, y: 100, connections: [] },
                { id: 2, text: "Tactile feedback allows intuitive expression", type: 'premise', x: cx - 150, y: 250, connections: [1] },
                { id: 3, text: "Physical art has unique texture/provenance", type: 'evidence', x: cx + 150, y: 250, connections: [1] },
                { id: 4, text: "Digital art has gained popularity", type: 'counter', x: cx - 200, y: 400, connections: [2] },
                { id: 5, text: "Screens cannot replicate tactile feedback", type: 'evidence', x: cx, y: 400, connections: [2] }
            ]);
            setAnalyzing(false);
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

            // Draw Connections
            ctx.lineWidth = 2;
            nodes.forEach(node => {
                node.connections.forEach(targetId => {
                    const target = nodes.find(n => n.id === targetId);
                    if (target) {
                        // Draw arrow line
                        const angle = Math.atan2(target.y - node.y, target.x - node.x);
                        const r = 40; // Node radius approx
                        
                        const startX = node.x + Math.cos(angle) * r;
                        const startY = node.y + Math.sin(angle) * r;
                        const endX = target.x - Math.cos(angle) * r;
                        const endY = target.y - Math.sin(angle) * r;

                        ctx.beginPath();
                        ctx.moveTo(startX, startY);
                        ctx.lineTo(endX, endY);
                        ctx.strokeStyle = '#555';
                        ctx.stroke();

                        // Arrowhead
                        ctx.beginPath();
                        ctx.moveTo(endX, endY);
                        ctx.lineTo(endX - 10 * Math.cos(angle - Math.PI / 6), endY - 10 * Math.sin(angle - Math.PI / 6));
                        ctx.lineTo(endX - 10 * Math.cos(angle + Math.PI / 6), endY - 10 * Math.sin(angle + Math.PI / 6));
                        ctx.fillStyle = '#555';
                        ctx.fill();
                    }
                });
            });

            // Draw Nodes
            nodes.forEach(node => {
                ctx.beginPath();
                // Hexagon shape for nodes
                for (let i = 0; i < 6; i++) {
                    const angle = (Math.PI / 3) * i;
                    const r = 45;
                    const x = node.x + r * Math.cos(angle);
                    const y = node.y + r * Math.sin(angle);
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                
                let color = '#333';
                if (node.type === 'conclusion') color = '#00f0ff';
                if (node.type === 'premise') color = '#a855f7';
                if (node.type === 'evidence') color = '#22c55e';
                if (node.type === 'counter') color = '#ef4444';

                ctx.fillStyle = '#000';
                ctx.fill();
                ctx.strokeStyle = color;
                ctx.lineWidth = 2;
                ctx.stroke();

                // Icon
                ctx.fillStyle = color;
                ctx.font = 'bold 10px Inter';
                ctx.textAlign = 'center';
                ctx.fillText(node.type.toUpperCase(), node.x, node.y - 15);
                
                // Text wrap
                const words = node.text.split(' ');
                let line = '';
                let lineY = node.y;
                ctx.fillStyle = '#fff';
                ctx.font = '9px Inter';
                
                words.forEach(word => {
                    if (ctx.measureText(line + word).width > 70) {
                        ctx.fillText(line, node.x, lineY);
                        line = word + ' ';
                        lineY += 12;
                    } else {
                        line += word + ' ';
                    }
                });
                ctx.fillText(line, node.x, lineY);
            });
        };

        render();
    }, [nodes]);

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-6xl mx-auto h-[85vh] flex flex-col">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-white flex items-center gap-3">
                            <GitCommit className="text-cyber" size={32} />
                            LOGIC <span className="text-white">GRAPH</span>
                        </h1>
                        <p className="text-gray-400 text-sm">Reading Passage Structure Visualizer</p>
                    </div>
                    <button 
                        onClick={analyzeLogic}
                        disabled={analyzing}
                        className="bg-white/10 border border-white/20 text-white px-6 py-2 rounded-xl hover:bg-cyber hover:text-black transition-all flex items-center gap-2 font-bold"
                    >
                        {analyzing ? <RefreshCw className="animate-spin" size={18} /> : <Network size={18} />}
                        {analyzing ? 'PARSING LOGIC...' : 'VISUALIZE ARGUMENT'}
                    </button>
                </div>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Text Input */}
                    <div className="bg-void-lighter border border-white/10 rounded-3xl p-6 flex flex-col">
                        <div className="flex items-center gap-2 mb-4 text-gray-400 text-xs font-bold uppercase">
                            <FileText size={14} /> Source Passage
                        </div>
                        <textarea 
                            value={passage}
                            onChange={(e) => setPassage(e.target.value)}
                            className="flex-1 bg-black/50 border border-white/5 rounded-xl p-4 text-sm leading-relaxed text-gray-300 resize-none focus:outline-none focus:border-cyber/30 font-serif"
                        />
                        <div className="mt-4 flex gap-2">
                            <span className="text-[10px] bg-cyber/10 text-cyber px-2 py-1 rounded">Conclusion</span>
                            <span className="text-[10px] bg-purple-500/10 text-purple-500 px-2 py-1 rounded">Premise</span>
                            <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-1 rounded">Evidence</span>
                            <span className="text-[10px] bg-red-500/10 text-red-500 px-2 py-1 rounded">Counter</span>
                        </div>
                    </div>

                    {/* Canvas */}
                    <div className="lg:col-span-2 bg-black border border-cyber/30 rounded-3xl relative overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.1)]">
                        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>
                        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                        
                        {nodes.length === 0 && !analyzing && (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                                <div className="text-center">
                                    <Network size={48} className="mx-auto mb-2 opacity-20" />
                                    <p>Enter text and click Visualize</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogicGraph;

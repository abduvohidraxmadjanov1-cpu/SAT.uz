
import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle, CheckCircle, Bug, Activity, RefreshCw, ArrowRight } from 'lucide-react';

interface Node {
    id: number;
    x: number;
    y: number;
    status: 'corrupt' | 'fixed' | 'healthy';
    topic: string;
}

const ErrorNeuralNet: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [nodes, setNodes] = useState<Node[]>([]);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [fixing, setFixing] = useState(false);

    useEffect(() => {
        // Init simulated error nodes
        const initNodes: Node[] = [];
        for(let i=0; i<15; i++) {
            initNodes.push({
                id: i,
                x: Math.random() * 80 + 10, // %
                y: Math.random() * 80 + 10, // %
                status: Math.random() > 0.6 ? 'corrupt' : 'healthy',
                topic: ['Algebra', 'Comma Splice', 'Inference', 'Trig', 'Vocab'][Math.floor(Math.random()*5)]
            });
        }
        setNodes(initNodes);
    }, []);

    // Render Network
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
            ctx.lineWidth = 1;
            nodes.forEach((node, i) => {
                nodes.slice(i + 1).forEach(other => {
                    const dist = Math.sqrt(Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2));
                    if (dist < 30) { // Simple distance check based on % logic requires conversion, simplified here visually
                        // For visualization, we just draw random connections or nearest neighbors
                    }
                });
                
                // Nearest neighbor lines for visual effect
                const nearest = nodes.filter(n => n.id !== node.id).sort((a, b) => {
                    return Math.hypot(a.x - node.x, a.y - node.y) - Math.hypot(b.x - node.x, b.y - node.y);
                })[0];

                if (nearest) {
                    ctx.beginPath();
                    ctx.moveTo(node.x/100 * canvas.width, node.y/100 * canvas.height);
                    ctx.lineTo(nearest.x/100 * canvas.width, nearest.y/100 * canvas.height);
                    const isCorruptPath = node.status === 'corrupt' || nearest.status === 'corrupt';
                    ctx.strokeStyle = isCorruptPath ? 'rgba(239, 68, 68, 0.3)' : 'rgba(0, 240, 255, 0.2)';
                    ctx.stroke();
                }
            });
        };
        render();
    }, [nodes]);

    const handleFix = () => {
        setFixing(true);
        setTimeout(() => {
            if (selectedNode) {
                setNodes(prev => prev.map(n => n.id === selectedNode.id ? { ...n, status: 'fixed' } : n));
                setSelectedNode(null);
            }
            setFixing(false);
        }, 1500);
    };

    const corruptCount = nodes.filter(n => n.status === 'corrupt').length;

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-6xl mx-auto h-[80vh] flex flex-col lg:flex-row gap-8">
                {/* Visualizer */}
                <div className="flex-1 bg-void-lighter border border-white/10 rounded-3xl relative overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.1)]">
                    <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>
                    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
                    
                    {/* Interactive Nodes Layer */}
                    <div className="absolute inset-0">
                        {nodes.map(node => (
                            <button
                                key={node.id}
                                onClick={() => setSelectedNode(node)}
                                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                                className={`
                                    absolute w-4 h-4 -ml-2 -mt-2 rounded-full border-2 transition-all transform hover:scale-150
                                    ${node.status === 'corrupt' ? 'bg-red-500 border-red-300 shadow-[0_0_15px_red] animate-pulse' : 
                                      node.status === 'fixed' ? 'bg-green-500 border-green-300 shadow-[0_0_10px_green]' : 
                                      'bg-cyber border-white shadow-[0_0_10px_#00f0ff]'}
                                `}
                            />
                        ))}
                    </div>

                    <div className="absolute top-6 left-6">
                        <h2 className="text-2xl font-black text-white flex items-center gap-2">
                            <Bug className="text-red-500" />
                            ERROR <span className="text-cyber">NET</span>
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">Neural Graph Debugging</p>
                    </div>

                    <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur border border-white/10 px-4 py-2 rounded-xl">
                        <div className="flex items-center gap-3 text-xs font-bold uppercase">
                            <span className="flex items-center gap-1 text-red-500"><div className="w-2 h-2 bg-red-500 rounded-full"></div> {corruptCount} Corrupt</span>
                            <span className="flex items-center gap-1 text-green-500"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Fixed</span>
                            <span className="flex items-center gap-1 text-cyber"><div className="w-2 h-2 bg-cyber rounded-full"></div> Healthy</span>
                        </div>
                    </div>
                </div>

                {/* Debug Panel */}
                <div className="w-full lg:w-96 bg-void-lighter border border-white/10 rounded-3xl p-6 flex flex-col">
                    <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                        <Activity className="text-cyber" size={20} />
                        DEBUG CONSOLE
                    </h3>

                    {selectedNode ? (
                        <div className="flex-1 flex flex-col animate-in slide-in-from-right">
                            <div className="bg-black/40 border border-white/5 rounded-2xl p-6 mb-6">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-xs font-mono text-gray-500">NODE_ID: {selectedNode.id}</span>
                                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                                        selectedNode.status === 'corrupt' ? 'bg-red-500/20 text-red-500' : 
                                        selectedNode.status === 'fixed' ? 'bg-green-500/20 text-green-500' : 'bg-cyber/20 text-cyber'
                                    }`}>
                                        {selectedNode.status.toUpperCase()}
                                    </span>
                                </div>
                                <h4 className="text-xl font-bold text-white mb-2">{selectedNode.topic} Error</h4>
                                <p className="text-sm text-gray-400 mb-4">
                                    {selectedNode.status === 'corrupt' 
                                        ? "Neural pathway disconnected. Concept comprehension below 60%. Requires immediate intervention."
                                        : "Pathway restored. Concept reinforced."}
                                </p>
                                
                                {selectedNode.status === 'corrupt' && (
                                    <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                                        <p className="text-xs text-red-300 font-mono">
                                            WARN: If 3x + 5 = 20, solve for x.<br/>
                                            You answered: 4 (Wrong)<br/>
                                            Correct: 5
                                        </p>
                                    </div>
                                )}
                            </div>

                            {selectedNode.status === 'corrupt' && (
                                <button 
                                    onClick={handleFix}
                                    disabled={fixing}
                                    className="w-full bg-white/10 hover:bg-green-500 hover:text-black text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 border border-white/10"
                                >
                                    {fixing ? <RefreshCw className="animate-spin" size={20} /> : <CheckCircle size={20} />}
                                    {fixing ? 'REPAIRING NODES...' : 'FIX CONCEPT'}
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500">
                            <AlertTriangle size={48} className="mb-4 opacity-20" />
                            <p>Select a corrupted node to begin debugging your knowledge graph.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ErrorNeuralNet;

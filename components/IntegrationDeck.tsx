
import React, { useState, useEffect, useRef } from 'react';
import { Server, Database, Globe, Activity, Shield, Cpu, Wifi, Lock, Layers, Terminal, Zap } from 'lucide-react';

interface Node {
    id: string;
    x: number;
    y: number;
    type: 'gateway' | 'service' | 'db';
    label: string;
    icon: any;
    status: 'active' | 'idle' | 'error';
    load: number;
    pulseOffset: number;
    cx?: number;
    cy?: number;
}

const SERVICES: Node[] = [
    { id: 'gateway', x: 0.5, y: 0.5, type: 'gateway', label: 'API GATEWAY', icon: Globe, status: 'active', load: 45, pulseOffset: 0 },
    { id: 'auth', x: 0.2, y: 0.3, type: 'service', label: 'AUTH SERVICE', icon: Shield, status: 'active', load: 12, pulseOffset: 1 },
    { id: 'ai', x: 0.8, y: 0.3, type: 'service', label: 'AI CORE', icon: Cpu, status: 'active', load: 89, pulseOffset: 2 },
    { id: 'db', x: 0.5, y: 0.8, type: 'db', label: 'NEURAL DB', icon: Database, status: 'active', load: 67, pulseOffset: 3 },
    { id: 'iot', x: 0.2, y: 0.7, type: 'service', label: 'IOT MESH', icon: Wifi, status: 'active', load: 34, pulseOffset: 4 },
    { id: 'pay', x: 0.8, y: 0.7, type: 'service', label: 'PAYMENT', icon: Lock, status: 'idle', load: 5, pulseOffset: 5 },
];

const IntegrationDeck: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [logs, setLogs] = useState<string[]>([]);
    const [activeNode, setActiveNode] = useState<Node | null>(null);

    // Generate random logs
    useEffect(() => {
        const interval = setInterval(() => {
            const actions = ["POST /generate", "GET /user", "AUTH_VERIFY", "DB_WRITE", "IOT_STREAM", "NEURAL_SYNC"];
            const status = ["200 OK", "PROCESSING", "OPTIMIZING"];
            const latency = Math.floor(Math.random() * 20) + 2;
            const log = `[${new Date().toISOString().split('T')[1].slice(0, -1)}] ${actions[Math.floor(Math.random() * actions.length)]} - ${status[Math.floor(Math.random() * status.length)]} (${latency}ms)`;
            setLogs(prev => [log, ...prev.slice(0, 12)]);
        }, 200);
        return () => clearInterval(interval);
    }, []);

    // Neural Animation Loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let packets: { from: string, to: string, progress: number, speed: number, color: string }[] = [];
        let t = 0;
        let animationFrame: number;

        const resize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            }
        };
        resize();
        window.addEventListener('resize', resize);

        const render = () => {
            const w = canvas.width;
            const h = canvas.height;
            
            // Create fading trails effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, w, h);
            
            t += 0.01;

            // Map nodes to canvas coordinates with subtle organic movement
            const nodes = SERVICES.map(node => ({
                ...node,
                cx: node.x * w + Math.sin(t + node.pulseOffset) * 10,
                cy: node.y * h + Math.cos(t * 0.8 + node.pulseOffset) * 10
            }));

            // Spawn Synaptic Impulses
            if (Math.random() > 0.92) {
                const source = nodes[Math.floor(Math.random() * nodes.length)];
                const target = nodes.find(n => n.id === 'gateway') || nodes[0];
                
                if (source.id !== target.id) {
                    packets.push({
                        from: source.id,
                        to: target.id,
                        progress: 0,
                        speed: 0.02 + Math.random() * 0.03,
                        color: source.id === 'ai' ? '#a855f7' : '#00f0ff'
                    });
                } else {
                    // Outbound from gateway
                    const dest = nodes.filter(n => n.id !== 'gateway')[Math.floor(Math.random() * (nodes.length - 1))];
                    if (dest) {
                        packets.push({
                            from: 'gateway',
                            to: dest.id,
                            progress: 0,
                            speed: 0.02 + Math.random() * 0.03,
                            color: '#22c55e'
                        });
                    }
                }
            }

            // Draw Synaptic Connections (Bezier Curves)
            nodes.forEach(source => {
                nodes.forEach(target => {
                    if (source.id === target.id) return;
                    
                    // Only connect specific logical paths or everything to gateway
                    if (source.id === 'gateway' || target.id === 'gateway') {
                        const dist = Math.hypot(source.cx - target.cx, source.cy - target.cy);
                        const opacity = Math.max(0.05, 0.2 - dist / 2000);
                        
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
                        ctx.lineWidth = 1;
                        
                        // Control point for curve
                        const cpX = (source.cx + target.cx) / 2 + Math.sin(t * 2 + source.pulseOffset) * 20;
                        const cpY = (source.cy + target.cy) / 2 + Math.cos(t * 2 + target.pulseOffset) * 20;
                        
                        ctx.moveTo(source.cx, source.cy);
                        ctx.quadraticCurveTo(cpX, cpY, target.cx, target.cy);
                        ctx.stroke();
                    }
                });
            });

            // Draw Packets (Synaptic Firing)
            packets.forEach((pkt, i) => {
                const source = nodes.find(n => n.id === pkt.from)!;
                const target = nodes.find(n => n.id === pkt.to)!;
                
                pkt.progress += pkt.speed;
                
                // Calculate position along curve
                const cpX = (source.cx + target.cx) / 2 + Math.sin(t * 2 + source.pulseOffset) * 20;
                const cpY = (source.cy + target.cy) / 2 + Math.cos(t * 2 + target.pulseOffset) * 20;
                
                // Quadratic bezier point
                const inv = 1 - pkt.progress;
                const x = inv * inv * source.cx + 2 * inv * pkt.progress * cpX + pkt.progress * pkt.progress * target.cx;
                const y = inv * inv * source.cy + 2 * inv * pkt.progress * cpY + pkt.progress * pkt.progress * target.cy;

                ctx.beginPath();
                ctx.fillStyle = pkt.color;
                ctx.shadowBlur = 15;
                ctx.shadowColor = pkt.color;
                ctx.arc(x, y, 3 * (1 + Math.sin(t * 20)), 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;

                if (pkt.progress >= 1) packets.splice(i, 1);
            });

            // Draw Nodes (Neural Soma)
            nodes.forEach(node => {
                const isActive = activeNode?.id === node.id;
                const pulseSize = Math.sin(t * 5 + node.pulseOffset) * 3;
                const size = (node.type === 'gateway' ? 20 : 12);

                // Outer Glow
                const gradient = ctx.createRadialGradient(node.cx, node.cy, size, node.cx, node.cy, size + 15 + pulseSize);
                gradient.addColorStop(0, node.type === 'gateway' ? 'rgba(0, 240, 255, 0.5)' : 'rgba(255, 255, 255, 0.1)');
                gradient.addColorStop(1, 'rgba(0,0,0,0)');
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(node.cx, node.cy, size + 15 + pulseSize, 0, Math.PI * 2);
                ctx.fill();

                // Core
                ctx.fillStyle = '#000';
                ctx.strokeStyle = node.type === 'gateway' ? '#00f0ff' : '#fff';
                ctx.lineWidth = 2;
                if (isActive) {
                    ctx.shadowColor = '#00f0ff';
                    ctx.shadowBlur = 25;
                    ctx.strokeStyle = '#00f0ff';
                }

                ctx.beginPath();
                ctx.arc(node.cx, node.cy, size, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                ctx.shadowBlur = 0;

                // Label
                ctx.fillStyle = '#fff';
                ctx.font = '10px Inter';
                ctx.textAlign = 'center';
                ctx.fillText(node.label, node.cx, node.cy + size + 20);
            });

            animationFrame = requestAnimationFrame(render);
        };

        render();
        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrame);
        };
    }, [activeNode]);

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12 font-mono overflow-hidden">
            <div className="max-w-[1800px] mx-auto h-[85vh] flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-end mb-8 px-4">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2 flex items-center gap-3 tracking-tighter">
                            <Server className="text-cyber animate-pulse" size={40} />
                            NEURO <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber to-white">BACKEND</span>
                        </h1>
                        <p className="text-gray-400 text-sm flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            System Status: OPERATIONAL
                        </p>
                    </div>
                    <div className="flex gap-6 text-right">
                        <div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest">Throughput</div>
                            <div className="text-2xl font-black text-white">45.2 TB/s</div>
                        </div>
                        <div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest">Latency</div>
                            <div className="text-2xl font-black text-cyber">1.2ms</div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
                    {/* Left: Visualizer */}
                    <div className="lg:col-span-3 bg-black border border-white/10 rounded-[40px] relative overflow-hidden shadow-[0_0_100px_rgba(0,240,255,0.05)] group">
                        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />
                        
                        <div className="absolute top-6 left-6 bg-black/80 backdrop-blur border border-white/10 p-4 rounded-2xl z-20">
                            <h3 className="text-cyber text-xs font-bold uppercase mb-2 flex items-center gap-2">
                                <Activity size={14} /> Active Synapses
                            </h3>
                            <div className="flex gap-2">
                                {SERVICES.map(s => (
                                    <div key={s.id} className="w-2 h-8 bg-gray-800 rounded-full overflow-hidden" title={s.label}>
                                        <div className={`w-full h-full ${s.load > 80 ? 'bg-red-500' : s.load > 50 ? 'bg-yellow-500' : 'bg-cyber'} opacity-80 animate-pulse`} style={{height: `${s.load}%`}}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Terminal & Details */}
                    <div className="flex flex-col gap-6 h-full">
                        {/* Live Logs */}
                        <div className="flex-1 bg-black border border-cyber/30 rounded-3xl p-6 overflow-hidden flex flex-col relative shadow-[0_0_30px_rgba(0,240,255,0.1)]">
                            <div className="absolute inset-0 bg-cyber/5 animate-pulse pointer-events-none"></div>
                            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
                                <h3 className="text-white font-bold text-sm flex items-center gap-2">
                                    <Terminal size={16} className="text-cyber" /> NEURAL LOGS
                                </h3>
                                <span className="text-[10px] text-green-500 font-mono animate-pulse">LIVE</span>
                            </div>
                            <div className="flex-1 overflow-hidden relative">
                                <div className="absolute bottom-0 left-0 w-full space-y-2 font-mono text-[10px]">
                                    {logs.map((log, i) => (
                                        <div key={i} className="text-gray-400 border-l-2 border-transparent hover:border-cyber pl-2 transition-all truncate">
                                            <span className="text-cyber mr-2">{'>'}</span>
                                            {log}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Microservice Stats */}
                        <div className="h-1/3 bg-void-lighter border border-white/10 rounded-3xl p-6 flex flex-col justify-between">
                            <div>
                                <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                                    <Layers size={16} className="text-purple-500" /> LOAD BALANCER
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-xs text-gray-400">
                                        <span>Primary Cluster</span>
                                        <span className="text-white">US-EAST-1</span>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-400">
                                        <span>Replica Lag</span>
                                        <span className="text-green-500">0.0ms</span>
                                    </div>
                                    <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden mt-2">
                                        <div className="bg-purple-500 h-full w-[45%] animate-progress"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <button className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-xl text-xs font-bold border border-white/5">
                                    SCALE UP
                                </button>
                                <button className="flex-1 bg-cyber/10 hover:bg-cyber/20 text-cyber py-2 rounded-xl text-xs font-bold border border-cyber/20">
                                    DEPLOY
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntegrationDeck;

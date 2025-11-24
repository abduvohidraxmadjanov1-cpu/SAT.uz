
import React, { useState, useEffect } from 'react';
import { Shield, Activity, Users, Database, Globe, Server, AlertTriangle, Terminal, Cpu, Lock, Zap, Wifi } from 'lucide-react';

const LOGS = [
    "[SYSTEM] Core Layer 2401 initialized.",
    "[AGENT] Math_Agent_04 connected to User_9921.",
    "[SECURITY] Threat detected IP 192.168.x.x - Blocked by Layer 9.",
    "[IoT] Camera feed optimized for focus tracking.",
    "[DATA] 1.2TB learning data processed in 2ms.",
    "[ORCHESTRATOR] Rebalancing load across 5000 nodes.",
    "[VOICE] Uzbek language model updated (v4.5).",
    "[AI] Generating personalized curriculum for ID #8821.",
];

const MCPHub: React.FC = () => {
    const [logs, setLogs] = useState<string[]>(LOGS);
    const [systemHealth, setSystemHealth] = useState(100);

    useEffect(() => {
        const interval = setInterval(() => {
            const newLog = LOGS[Math.floor(Math.random() * LOGS.length)];
            const timestamp = new Date().toISOString().split('T')[1].slice(0, -1);
            setLogs(prev => [`[${timestamp}] ${newLog}`, ...prev.slice(0, 8)]);
            setSystemHealth(prev => Math.max(98, Math.min(100, prev + (Math.random() - 0.5))));
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-black pt-20 px-4 pb-12 font-mono">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-8 border-b border-cyber/30 pb-4">
                    <div>
                        <h1 className="text-4xl font-black text-white flex items-center gap-3">
                            <Cpu className="text-cyber animate-spin-slow" size={40} />
                            MCP HUB <span className="text-sm bg-cyber text-black px-2 py-1 rounded font-bold align-top mt-1">v10.0</span>
                        </h1>
                        <p className="text-gray-400 mt-2">Master Control Platform - 5000 Active Nodes</p>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-gray-500 uppercase tracking-widest">System Uptime</div>
                        <div className="text-2xl font-bold text-cyber">99.9999%</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* System Status Card */}
                    <div className="col-span-1 bg-void-lighter border border-cyber/20 p-6 rounded-2xl relative overflow-hidden group hover:border-cyber/50 transition-all">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Activity size={100} className="text-cyber" />
                        </div>
                        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Server size={14} /> Core Architecture
                        </h3>
                        <div className="flex items-end gap-2 mb-2">
                            <span className="text-5xl font-black text-white">{systemHealth.toFixed(2)}%</span>
                            <span className="text-green-500 text-sm font-bold mb-2">OPTIMAL</span>
                        </div>
                        <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                            <div className="bg-cyber h-full transition-all duration-500" style={{ width: `${systemHealth}%` }}></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-6">
                             <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                                 <div className="text-xs text-gray-500">Active Layers</div>
                                 <div className="text-xl font-bold text-white">3,000</div>
                             </div>
                             <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                                 <div className="text-xs text-gray-500">Processing</div>
                                 <div className="text-xl font-bold text-white">10^40 FLOPS</div>
                             </div>
                        </div>
                    </div>

                    {/* Security Card */}
                    <div className="col-span-1 bg-void-lighter border border-red-500/20 p-6 rounded-2xl relative overflow-hidden group hover:border-red-500/50 transition-all">
                         <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Shield size={100} className="text-red-500" />
                        </div>
                        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Lock size={14} /> Security Matrix
                        </h3>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full border-4 border-red-500 flex items-center justify-center animate-pulse">
                                <Shield size={24} className="text-red-500" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">Level 9</div>
                                <div className="text-red-400 text-xs">Quantum Encryption Active</div>
                            </div>
                        </div>
                        <div className="space-y-2">
                             <div className="flex justify-between text-xs text-gray-400">
                                 <span>Threats Blocked</span>
                                 <span className="text-white">1,402/sec</span>
                             </div>
                             <div className="flex justify-between text-xs text-gray-400">
                                 <span>Biometric Auth</span>
                                 <span className="text-green-500">Secure</span>
                             </div>
                        </div>
                    </div>

                    {/* Agent Grid */}
                    <div className="col-span-1 bg-void-lighter border border-purple-500/20 p-6 rounded-2xl relative overflow-hidden group hover:border-purple-500/50 transition-all">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Users size={100} className="text-purple-500" />
                        </div>
                        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Database size={14} /> Agent Swarm
                        </h3>
                        <div className="grid grid-cols-4 gap-2 mb-4">
                            {Array.from({ length: 16 }).map((_, i) => (
                                <div key={i} className={`h-8 rounded flex items-center justify-center border ${Math.random() > 0.1 ? 'border-purple-500/30 bg-purple-500/10' : 'border-gray-700 bg-gray-800'}`}>
                                    <div className={`w-2 h-2 rounded-full ${Math.random() > 0.1 ? 'bg-purple-400 animate-pulse' : 'bg-gray-600'}`}></div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Total Agents</span>
                            <span className="text-purple-400 font-bold">4,000 Online</span>
                        </div>
                    </div>
                </div>

                {/* Main Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
                    {/* Live Terminal */}
                    <div className="col-span-2 bg-black border border-cyber/30 rounded-2xl p-6 font-mono text-xs overflow-hidden flex flex-col relative shadow-[0_0_30px_rgba(0,240,255,0.05)]">
                        <div className="flex justify-between items-center mb-4 border-b border-cyber/10 pb-2">
                            <span className="text-cyber flex items-center gap-2"><Terminal size={14} /> LIVE SYSTEM LOGS</span>
                            <div className="flex gap-2">
                                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                            </div>
                        </div>
                        <div className="flex-1 overflow-hidden relative">
                             <div className="absolute inset-0 overflow-y-auto space-y-2 custom-scrollbar pb-4">
                                {logs.map((log, i) => (
                                    <div key={i} className="text-gray-300 hover:bg-white/5 p-1 rounded transition-colors">
                                        <span className="text-cyber mr-2">{'>'}</span>
                                        {log}
                                    </div>
                                ))}
                             </div>
                        </div>
                    </div>

                    {/* IoT Network Visualizer (Abstract Neural Node) */}
                    <div className="col-span-1 bg-void-lighter border border-white/10 rounded-2xl p-6 flex flex-col">
                        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Wifi size={14} /> Global IoT Mesh
                        </h3>
                        <div className="flex-1 relative flex items-center justify-center">
                            {/* Abstract Data Points */}
                            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-4 opacity-10 pointer-events-none">
                                {Array.from({length: 36}).map((_, i) => (
                                    <div key={i} className="flex items-center justify-center">
                                        <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Central Neural Node Replacement for Globe */}
                            <div className="relative z-10 flex items-center justify-center">
                                {/* Pulsating Outer Field */}
                                <div className="absolute w-48 h-48 border border-cyber/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
                                <div className="absolute w-32 h-32 border border-white/5 rounded-full animate-[spin_10s_linear_infinite_reverse]"></div>
                                
                                {/* Core Connector */}
                                <div className="w-24 h-24 bg-black border border-cyber/50 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(0,240,255,0.2)]">
                                    <div className="w-12 h-12 bg-cyber/10 rounded-full flex items-center justify-center animate-pulse">
                                        <div className="w-4 h-4 bg-cyber rounded-full shadow-[0_0_20px_#00f0ff]"></div>
                                    </div>
                                </div>
                                
                                {/* Orbiting Data Packets */}
                                <div className="absolute w-full h-full animate-[spin_4s_linear_infinite]">
                                    <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-white rounded-full -translate-x-1/2 -translate-y-8"></div>
                                </div>
                            </div>

                            {/* Floating Stats */}
                            <div className="absolute top-4 left-4 text-xs">
                                <div className="text-gray-500">Nodes</div>
                                <div className="text-white font-bold">10M+</div>
                            </div>
                            <div className="absolute bottom-4 right-4 text-xs text-right">
                                <div className="text-gray-500">Latency</div>
                                <div className="text-cyber font-bold">1ms</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MCPHub;

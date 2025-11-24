import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, DollarSign, Target, Activity, Share2, Mail, MessageCircle, BarChart2 } from 'lucide-react';
import { MarketingNode } from '../types';

const AutoMarketing: React.FC = () => {
    const [nodes, setNodes] = useState<MarketingNode[]>([
        { id: '1', label: 'Lead Gen', value: 4500, status: 'Active', type: 'Acquisition' },
        { id: '2', label: 'Neuro Analysis', value: 3200, status: 'Optimizing', type: 'Neuro' },
        { id: '3', label: 'Personal Offer', value: 2800, status: 'Active', type: 'Revenue' },
        { id: '4', label: 'Conversion', value: 1500, status: 'Active', type: 'Revenue' },
        { id: '5', label: 'Retention', value: 98, status: 'Idle', type: 'Retention' },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setNodes(prev => prev.map(n => ({
                ...n,
                value: n.value + Math.floor(Math.random() * 10),
                status: Math.random() > 0.7 ? (Math.random() > 0.5 ? 'Active' : 'Optimizing') : n.status
            })));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
                            <TrendingUp className="text-cyber" size={40} /> AUTO-SALE ENGINE
                        </h1>
                        <p className="text-gray-400">Avtomatik Neyromarketing va Sotuv Tizimi (10,000 Models)</p>
                    </div>
                </div>

                {/* Top Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-void-lighter border border-green-500/20 p-6 rounded-2xl">
                        <div className="flex items-center gap-2 text-green-500 mb-2">
                            <DollarSign size={20} />
                            <span className="text-xs font-bold uppercase">Revenue (24h)</span>
                        </div>
                        <div className="text-3xl font-black text-white">$124,592</div>
                        <div className="text-xs text-green-400 mt-2 flex items-center gap-1">
                            <TrendingUp size={12} /> +12.5% vs yesterday
                        </div>
                    </div>
                    <div className="bg-void-lighter border border-blue-500/20 p-6 rounded-2xl">
                         <div className="flex items-center gap-2 text-blue-500 mb-2">
                            <Users size={20} />
                            <span className="text-xs font-bold uppercase">New Users</span>
                        </div>
                        <div className="text-3xl font-black text-white">4,203</div>
                        <div className="text-xs text-blue-400 mt-2">Auto-onboarded</div>
                    </div>
                    <div className="bg-void-lighter border border-purple-500/20 p-6 rounded-2xl">
                         <div className="flex items-center gap-2 text-purple-500 mb-2">
                            <Target size={20} />
                            <span className="text-xs font-bold uppercase">Conversion Rate</span>
                        </div>
                        <div className="text-3xl font-black text-white">18.2%</div>
                        <div className="text-xs text-purple-400 mt-2">AI Optimized</div>
                    </div>
                    <div className="bg-void-lighter border border-cyber/20 p-6 rounded-2xl">
                         <div className="flex items-center gap-2 text-cyber mb-2">
                            <Activity size={20} />
                            <span className="text-xs font-bold uppercase">Active Campaigns</span>
                        </div>
                        <div className="text-3xl font-black text-white">1,204</div>
                        <div className="text-xs text-cyber mt-2">Running on Autopilot</div>
                    </div>
                </div>

                {/* Pipeline Visualization */}
                <div className="bg-void-lighter border border-white/10 rounded-3xl p-8 mb-12 relative overflow-hidden">
                    <div className="absolute inset-0 grid-bg opacity-10"></div>
                    <h3 className="text-lg font-bold text-white mb-8 relative z-10 flex items-center gap-2">
                        <Activity className="text-cyber" size={18} /> LIVE SALES PIPELINE
                    </h3>

                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
                        {nodes.map((node, i) => (
                            <div key={node.id} className="relative flex-1 w-full md:w-auto">
                                <div className={`
                                    bg-black border-2 rounded-2xl p-6 text-center relative transition-all duration-300
                                    ${node.status === 'Optimizing' ? 'border-cyber shadow-[0_0_20px_rgba(0,240,255,0.2)]' : 'border-white/10'}
                                `}>
                                    <div className="text-xs text-gray-500 uppercase font-bold mb-2">{node.type}</div>
                                    <div className="text-xl font-black text-white mb-1">{node.label}</div>
                                    <div className="text-2xl font-mono text-cyber">{node.value.toLocaleString()}</div>
                                    
                                    {node.status === 'Optimizing' && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyber text-black text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                                            OPTIMIZING
                                        </div>
                                    )}
                                </div>
                                
                                {/* Connector Line */}
                                {i < nodes.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 -right-6 w-8 h-0.5 bg-gray-700">
                                        <div className="absolute top-1/2 left-0 w-2 h-2 bg-cyber rounded-full -translate-y-1/2 animate-float" style={{animationDuration: '1s'}}></div>
                                    </div>
                                )}
                                {i < nodes.length - 1 && (
                                     <div className="md:hidden absolute -bottom-6 left-1/2 w-0.5 h-8 bg-gray-700 -translate-x-1/2"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Integration Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div className="bg-black/40 border border-white/5 rounded-2xl p-6">
                         <h4 className="text-white font-bold mb-4 flex items-center gap-2"><Mail size={16} /> Email AI</h4>
                         <div className="space-y-3">
                             <div className="flex justify-between text-sm text-gray-400">
                                 <span>Sent Today</span>
                                 <span className="text-white">45,200</span>
                             </div>
                             <div className="flex justify-between text-sm text-gray-400">
                                 <span>Open Rate</span>
                                 <span className="text-green-500">42%</span>
                             </div>
                             <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
                                 <div className="bg-green-500 h-full w-[42%]"></div>
                             </div>
                         </div>
                     </div>
                     <div className="bg-black/40 border border-white/5 rounded-2xl p-6">
                         <h4 className="text-white font-bold mb-4 flex items-center gap-2"><Share2 size={16} /> Social Ads</h4>
                         <div className="space-y-3">
                             <div className="flex justify-between text-sm text-gray-400">
                                 <span>Active Ads</span>
                                 <span className="text-white">142</span>
                             </div>
                             <div className="flex justify-between text-sm text-gray-400">
                                 <span>CTR</span>
                                 <span className="text-blue-500">4.8%</span>
                             </div>
                              <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
                                 <div className="bg-blue-500 h-full w-[48%]"></div>
                             </div>
                         </div>
                     </div>
                     <div className="bg-black/40 border border-white/5 rounded-2xl p-6">
                         <h4 className="text-white font-bold mb-4 flex items-center gap-2"><MessageCircle size={16} /> SMS/Telegram</h4>
                         <div className="space-y-3">
                             <div className="flex justify-between text-sm text-gray-400">
                                 <span>Delivered</span>
                                 <span className="text-white">99.9%</span>
                             </div>
                             <div className="flex justify-between text-sm text-gray-400">
                                 <span>Response</span>
                                 <span className="text-purple-500">15%</span>
                             </div>
                              <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
                                 <div className="bg-purple-500 h-full w-[15%]"></div>
                             </div>
                         </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default AutoMarketing;
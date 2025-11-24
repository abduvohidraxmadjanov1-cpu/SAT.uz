
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts';
import { TrendingUp, Target, AlertTriangle, ArrowUpRight } from 'lucide-react';

const DATA = [
    { date: 'Jan', score: 1200, min: 1180, max: 1220 },
    { date: 'Feb', score: 1250, min: 1220, max: 1280 },
    { date: 'Mar', score: 1320, min: 1290, max: 1350 },
    { date: 'Apr', score: 1380, min: 1340, max: 1420 },
    { date: 'May (Now)', score: 1410, min: 1380, max: 1440 },
    { date: 'Jun (Est)', score: 1450, min: 1400, max: 1500 },
    { date: 'Jul (Est)', score: 1500, min: 1440, max: 1560 },
    { date: 'Aug (Exam)', score: 1540, min: 1480, max: 1600 },
];

const PerformancePredictor: React.FC = () => {
    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black text-white mb-4 flex items-center justify-center gap-3">
                        <TrendingUp className="text-green-500" size={40} />
                        NATIJA <span className="text-white">BASHORATI</span>
                    </h1>
                    <p className="text-gray-400">Monte Carlo Simulation & Probabilistic Modeling</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    <div className="bg-void-lighter border border-white/10 p-6 rounded-3xl text-center">
                        <div className="text-xs text-gray-500 uppercase font-bold mb-2">Current Probability</div>
                        <div className="text-5xl font-black text-white mb-2">85%</div>
                        <div className="text-green-500 text-sm font-bold">Chance of 1500+</div>
                    </div>
                    <div className="bg-void-lighter border border-white/10 p-6 rounded-3xl text-center">
                        <div className="text-xs text-gray-500 uppercase font-bold mb-2">Projected Score</div>
                        <div className="text-5xl font-black text-cyber mb-2">1540</div>
                        <div className="text-gray-400 text-sm">Confidence Interval: ±30</div>
                    </div>
                    <div className="bg-void-lighter border border-white/10 p-6 rounded-3xl text-center">
                        <div className="text-xs text-gray-500 uppercase font-bold mb-2">Learning Velocity</div>
                        <div className="text-5xl font-black text-purple-500 mb-2">2.4x</div>
                        <div className="text-gray-400 text-sm">Faster than average</div>
                    </div>
                </div>

                <div className="bg-void-lighter border border-white/10 rounded-3xl p-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
                    <div className="flex justify-between items-center mb-8 relative z-10">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Target className="text-red-500" /> Score Trajectory
                        </h3>
                        <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 bg-cyber rounded-full"></span> Expected
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 bg-blue-500/30 rounded-full"></span> Range
                            </div>
                        </div>
                    </div>

                    <div className="h-96 w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={DATA}>
                                <defs>
                                    <linearGradient id="colorRange" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.5}/>
                                        <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                <XAxis dataKey="date" stroke="#666" />
                                <YAxis domain={[1000, 1600]} stroke="#666" />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#000', borderColor: '#333' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="max" stackId="1" stroke="none" fill="none" />
                                <Area type="monotone" dataKey="min" stackId="1" stroke="none" fill="#1e3a8a" fillOpacity={0.2} />
                                <Area type="monotone" dataKey="score" stroke="#00f0ff" strokeWidth={3} fill="url(#colorScore)" />
                                <ReferenceLine y={1500} stroke="green" strokeDasharray="3 3" label={{ value: 'Target', fill: 'green', position: 'right' }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="mt-8 bg-black/40 border border-white/10 p-6 rounded-2xl flex items-start gap-4">
                    <div className="p-3 bg-yellow-500/10 rounded-xl text-yellow-500">
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-1">AI Strategic Advice</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Your math score trajectory is excellent, but reading comprehension volatility is high. 
                            To guarantee 1500+, focus 70% of your study time on "Command of Evidence" questions for the next 2 weeks.
                        </p>
                        <button className="mt-4 text-cyber text-sm font-bold flex items-center gap-1 hover:underline">
                            View Action Plan <ArrowUpRight size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerformancePredictor;

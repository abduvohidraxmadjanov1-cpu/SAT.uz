
import React from 'react';
import { AlertTriangle, Brain, Clock, Eye, Search, TrendingDown, CheckCircle } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';

const ERROR_DATA = [
    { name: 'Concept Gap', value: 45, color: '#ef4444' },
    { name: 'Careless', value: 25, color: '#eab308' },
    { name: 'Time Pressure', value: 20, color: '#3b82f6' },
    { name: 'Misread', value: 10, color: '#a855f7' },
];

const RECENT_MISTAKES = [
    { id: 1, q: "Algebra: System of Eq", type: "Concept Gap", time: "1m 12s", diagnosis: "Failed to substitute Y correctly." },
    { id: 2, q: "Reading: Inference", type: "Misread", time: "45s", diagnosis: "Missed the word 'NOT' in the prompt." },
    { id: 3, q: "Geometry: Circle", type: "Careless", time: "2m 05s", diagnosis: "Calculation error in final step (2*3=5)." },
    { id: 4, q: "Writing: Punctuation", type: "Concept Gap", time: "30s", diagnosis: "Confused Colon vs Semicolon rules." },
];

const MistakeAutopsy: React.FC = () => {
    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
                            <Search className="text-red-500" size={40} />
                            MISTAKE <span className="text-white">AUTOPSY</span>
                        </h1>
                        <p className="text-gray-400">Deep Root Cause Analysis of Errors</p>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/30 px-6 py-3 rounded-2xl">
                        <div className="text-xs text-red-500 font-bold uppercase mb-1">Error Rate</div>
                        <div className="text-2xl font-black text-white">12.4%</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Chart */}
                    <div className="bg-void-lighter border border-white/10 rounded-3xl p-8 flex flex-col items-center">
                        <h3 className="text-white font-bold mb-4 w-full">Why You Lose Points</h3>
                        <div className="w-full h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={ERROR_DATA}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {ERROR_DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: '#333', color: '#fff' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-2 gap-4 w-full mt-4">
                            {ERROR_DATA.map((entry) => (
                                <div key={entry.name} className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                                    <span className="text-xs text-gray-400">{entry.name} ({entry.value}%)</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Analysis */}
                    <div className="lg:col-span-2 bg-void-lighter border border-white/10 rounded-3xl p-8">
                        <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                            <Brain className="text-cyber" /> NEURAL DIAGNOSIS
                        </h3>
                        <div className="space-y-4">
                            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex gap-4">
                                <div className="p-3 bg-black rounded-lg text-red-500 h-fit">
                                    <AlertTriangle size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm mb-1">Major Pattern Detected: Algebra Substitution</h4>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        You have missed 5 questions involving "Systems of Equations" in the last 3 days. 
                                        Analysis shows you frequently drop negative signs when substituting variables.
                                    </p>
                                    <button className="mt-3 text-xs font-bold text-red-400 hover:text-white flex items-center gap-1 transition-colors">
                                        PRACTICE THIS TOPIC <Search size={12} />
                                    </button>
                                </div>
                            </div>

                            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex gap-4">
                                <div className="p-3 bg-black rounded-lg text-yellow-500 h-fit">
                                    <Eye size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm mb-1">Focus Lapse: Minute 45-60</h4>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        Your error rate spikes by 40% during the last 15 minutes of the reading section. 
                                        IoT data shows eye tracking deviations.
                                    </p>
                                    <button className="mt-3 text-xs font-bold text-yellow-400 hover:text-white flex items-center gap-1 transition-colors">
                                        VIEW STAMINA TRAINING <Brain size={12} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Mistakes List */}
                <div className="bg-void-lighter border border-white/10 rounded-3xl overflow-hidden">
                    <div className="p-6 border-b border-white/5 bg-black/20">
                        <h3 className="text-white font-bold">Recent Analysis Logs</h3>
                    </div>
                    <div className="divide-y divide-white/5">
                        {RECENT_MISTAKES.map((item) => (
                            <div key={item.id} className="p-6 flex flex-col md:flex-row items-center gap-6 hover:bg-white/5 transition-colors group">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-white font-bold">{item.q}</span>
                                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                                            item.type === 'Concept Gap' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                            item.type === 'Misread' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' :
                                            'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                        }`}>
                                            {item.type}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 text-sm">{item.diagnosis}</p>
                                </div>
                                <div className="flex items-center gap-6 text-sm text-gray-500">
                                    <span className="flex items-center gap-1"><Clock size={14} /> {item.time}</span>
                                    <button className="text-cyber font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                        FIX NOW <CheckCircle size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MistakeAutopsy;


import React from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, LineChart, Line, CartesianGrid, Legend } from 'recharts';
import { Database, TrendingUp, Activity, Brain, GitCommit, Calculator } from 'lucide-react';

const CORRELATION_DATA = [
  { x: 60, y: 1100, z: 200 }, // x: Focus%, y: Score, z: Hours
  { x: 70, y: 1200, z: 250 },
  { x: 85, y: 1350, z: 400 },
  { x: 90, y: 1480, z: 500 },
  { x: 65, y: 1150, z: 220 },
  { x: 95, y: 1550, z: 600 },
  { x: 50, y: 1000, z: 150 },
  { x: 80, y: 1400, z: 450 },
];

const PREDICTION_DATA = [
  { day: 'Current', score: 1450, min: 1430, max: 1470 },
  { day: '+1 Week', score: 1480, min: 1450, max: 1510 },
  { day: '+2 Weeks', score: 1510, min: 1470, max: 1550 },
  { day: '+3 Weeks', score: 1540, min: 1490, max: 1580 },
  { day: '+1 Month', score: 1560, min: 1510, max: 1600 },
];

const DataScienceLab: React.FC = () => {
    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
                            <Database className="text-blue-500" size={40} />
                            DATA SCIENCE <span className="text-white">LAB</span>
                        </h1>
                        <p className="text-gray-400">Advanced Analytics & Predictive Modeling Engine</p>
                    </div>
                    <div className="bg-blue-900/20 border border-blue-500/30 px-6 py-3 rounded-xl">
                        <div className="text-xs text-blue-400 uppercase font-bold mb-1">Data Points</div>
                        <div className="text-2xl font-black text-white">1.2M+</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Correlation Analysis */}
                    <div className="bg-void-lighter border border-white/10 rounded-3xl p-8">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <GitCommit className="text-cyber" /> Multi-Variable Correlation
                        </h3>
                        <div className="h-80 bg-black/40 rounded-2xl border border-white/5 p-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                    <XAxis type="number" dataKey="x" name="IoT Focus" unit="%" stroke="#666" />
                                    <YAxis type="number" dataKey="y" name="SAT Score" unit="" stroke="#666" domain={[800, 1600]} />
                                    <ZAxis type="number" dataKey="z" range={[50, 400]} name="Study Hours" />
                                    <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#000', borderColor: '#333' }} />
                                    <Scatter name="Performance" data={CORRELATION_DATA} fill="#00f0ff" />
                                </ScatterChart>
                            </ResponsiveContainer>
                        </div>
                        <p className="text-xs text-gray-400 mt-4 bg-white/5 p-3 rounded-xl">
                            <strong className="text-cyber">INSIGHT:</strong> 85%+ IoT Focus levels strongly correlate with 1400+ SAT scores. Sleep duration (Z-axis) acts as a multiplier.
                        </p>
                    </div>

                    {/* Predictive Modeling */}
                    <div className="bg-void-lighter border border-white/10 rounded-3xl p-8">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <TrendingUp className="text-green-500" /> Monte Carlo Score Prediction
                        </h3>
                        <div className="h-80 bg-black/40 rounded-2xl border border-white/5 p-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={PREDICTION_DATA} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                    <XAxis dataKey="day" stroke="#666" />
                                    <YAxis domain={[1400, 1600]} stroke="#666" />
                                    <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: '#333' }} />
                                    <Legend />
                                    <Line type="monotone" dataKey="min" stroke="#ef4444" strokeDasharray="5 5" name="Conservative" />
                                    <Line type="monotone" dataKey="score" stroke="#22c55e" strokeWidth={3} name="Projected" />
                                    <Line type="monotone" dataKey="max" stroke="#00f0ff" strokeDasharray="5 5" name="Optimistic" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <p className="text-xs text-gray-400 mt-4 bg-white/5 p-3 rounded-xl">
                            <strong className="text-green-500">FORECAST:</strong> Based on your current "Learning Velocity", you are on track to hit 1560 by next month.
                        </p>
                    </div>
                </div>

                {/* KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-black/40 border border-white/10 p-6 rounded-2xl hover:border-cyber/50 transition-all">
                        <Activity className="text-cyber mb-4" size={24} />
                        <div className="text-2xl font-black text-white">1.8ms</div>
                        <div className="text-xs text-gray-500 uppercase">Cognitive Latency</div>
                    </div>
                    <div className="bg-black/40 border border-white/10 p-6 rounded-2xl hover:border-purple-500/50 transition-all">
                        <Brain className="text-purple-500 mb-4" size={24} />
                        <div className="text-2xl font-black text-white">92%</div>
                        <div className="text-xs text-gray-500 uppercase">Retention Rate</div>
                    </div>
                    <div className="bg-black/40 border border-white/10 p-6 rounded-2xl hover:border-yellow-500/50 transition-all">
                        <Calculator className="text-yellow-500 mb-4" size={24} />
                        <div className="text-2xl font-black text-white">Top 2%</div>
                        <div className="text-xs text-gray-500 uppercase">Math Precision</div>
                    </div>
                    <div className="bg-black/40 border border-white/10 p-6 rounded-2xl hover:border-red-500/50 transition-all">
                        <TrendingUp className="text-red-500 mb-4" size={24} />
                        <div className="text-2xl font-black text-white">+450</div>
                        <div className="text-xs text-gray-500 uppercase">Lifetime XP Gain</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataScienceLab;

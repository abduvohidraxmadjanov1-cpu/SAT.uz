import React, { useState } from 'react';
import { DollarSign, TrendingUp, GraduationCap, Calculator, ArrowRight, Wallet } from 'lucide-react';

const CareerROI: React.FC = () => {
    const [score, setScore] = useState(1450);
    const [university, setUniversity] = useState('MIT');
    
    // Fake calculation logic
    const calculateStats = (s: number) => {
        const scholarship = s > 1550 ? 320000 : s > 1500 ? 180000 : s > 1400 ? 80000 : 0;
        const careerBoost = s > 1500 ? 1200000 : s > 1400 ? 800000 : 500000;
        const roi = ((scholarship + careerBoost) / 100).toFixed(0) + '%';
        return { scholarship, careerBoost, roi };
    };

    const stats = calculateStats(score);

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                        KELAJAK <span className="text-cyber">KAPITALI</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        SAT ballingizning moliyaviy qiymatini hisoblang. Grantlar va kelajakdagi daromadlar prognozi.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Controls */}
                    <div className="bg-void-lighter border border-white/10 rounded-3xl p-8">
                        <div className="mb-8">
                            <label className="text-gray-400 text-xs font-bold uppercase mb-4 block flex justify-between">
                                <span>Kutilayotgan SAT Ball</span>
                                <span className="text-cyber text-lg">{score}</span>
                            </label>
                            <input 
                                type="range" 
                                min="1000" 
                                max="1600" 
                                step="10"
                                value={score}
                                onChange={(e) => setScore(Number(e.target.value))}
                                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyber"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
                                <span>1000</span>
                                <span>1600</span>
                            </div>
                        </div>

                        <div className="mb-8">
                             <label className="text-gray-400 text-xs font-bold uppercase mb-4 block">Maqsadli Universitet</label>
                             <select 
                                value={university}
                                onChange={(e) => setUniversity(e.target.value)}
                                className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-white focus:border-cyber focus:outline-none"
                             >
                                 <option>MIT</option>
                                 <option>Harvard</option>
                                 <option>Stanford</option>
                                 <option>NUS</option>
                                 <option>KAIST</option>
                             </select>
                        </div>

                        <div className="p-4 bg-cyber/10 border border-cyber/20 rounded-xl">
                            <h4 className="text-cyber font-bold mb-2 flex items-center gap-2">
                                <Calculator size={16} /> AI PROGNOZ
                            </h4>
                            <p className="text-sm text-gray-300">
                                {score > 1500 
                                    ? "Sizning ballingiz Top 1% ga kiradi. To'liq grant yutib olish imkoniyati juda yuqori." 
                                    : "Ballingiz yaxshi, lekin Top universitetlar uchun yana +50 ball ishlash tavsiya etiladi."}
                            </p>
                        </div>
                    </div>

                    {/* Results Visualization */}
                    <div className="space-y-6">
                        <div className="group bg-gradient-to-r from-green-900/20 to-green-600/10 border border-green-500/30 rounded-3xl p-8 hover:scale-105 transition-transform">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="text-green-500 text-xs font-bold uppercase mb-1">Tejalgan Mablag' (Grant)</div>
                                    <div className="text-4xl md:text-5xl font-black text-white">${stats.scholarship.toLocaleString()}</div>
                                </div>
                                <div className="p-3 bg-green-500/20 rounded-xl text-green-500">
                                    <GraduationCap size={32} />
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm">4 yillik o'qish davomida tejaladigan summa.</p>
                        </div>

                        <div className="group bg-gradient-to-r from-blue-900/20 to-blue-600/10 border border-blue-500/30 rounded-3xl p-8 hover:scale-105 transition-transform">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="text-blue-500 text-xs font-bold uppercase mb-1">Qo'shimcha Daromad</div>
                                    <div className="text-4xl md:text-5xl font-black text-white">+${stats.careerBoost.toLocaleString()}</div>
                                </div>
                                <div className="p-3 bg-blue-500/20 rounded-xl text-blue-500">
                                    <TrendingUp size={32} />
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm">Top universitet diplomi bilan 10 yillik faoliyatdagi qo'shimcha daromad.</p>
                        </div>

                        <div className="group bg-gradient-to-r from-cyber/20 to-purple-600/10 border border-cyber/30 rounded-3xl p-8 hover:scale-105 transition-transform">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="text-cyber text-xs font-bold uppercase mb-1">SAT.uz ROI</div>
                                    <div className="text-4xl md:text-5xl font-black text-white">{stats.roi}</div>
                                </div>
                                <div className="p-3 bg-cyber/20 rounded-xl text-cyber">
                                    <Wallet size={32} />
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm">Kurs narxiga nisbatan investitsiya qaytimi.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CareerROI;
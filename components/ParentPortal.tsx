import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Users, Activity, Brain, Clock, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

const DATA = [
  { day: 'Mon', focus: 85, score: 1320 },
  { day: 'Tue', focus: 78, score: 1340 },
  { day: 'Wed', focus: 92, score: 1360 },
  { day: 'Thu', focus: 88, score: 1390 },
  { day: 'Fri', focus: 95, score: 1410 },
  { day: 'Sat', focus: 98, score: 1450 },
  { day: 'Sun', focus: 90, score: 1460 },
];

const ParentPortal: React.FC = () => {
  return (
    <div className="min-h-screen bg-black pt-24 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
           <div>
              <h1 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
                  <Users className="text-cyber" size={40} />
                  OTA-ONALAR PORTALI
              </h1>
              <p className="text-gray-400">Guardian Command Center v4.0 • Real-time Monitoring</p>
           </div>
           <div className="bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-xl flex items-center gap-2">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
               <span className="text-green-500 font-bold text-sm">FARZANDINGIZ ONLINE</span>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
            {/* Quick Stats */}
            <div className="bg-void-lighter border border-white/10 rounded-2xl p-6">
                <div className="text-gray-500 text-xs font-bold uppercase mb-2 flex items-center gap-2">
                    <Brain size={14} /> Kognitiv Yuklama
                </div>
                <div className="text-3xl font-black text-white">High</div>
                <div className="text-xs text-cyber mt-1">Optimal o'rganish zonasida</div>
            </div>
             <div className="bg-void-lighter border border-white/10 rounded-2xl p-6">
                <div className="text-gray-500 text-xs font-bold uppercase mb-2 flex items-center gap-2">
                    <TrendingUp size={14} /> Bashorat (Score)
                </div>
                <div className="text-3xl font-black text-white">1520+</div>
                <div className="text-xs text-green-500 mt-1">↑ 30 ball (O'tgan hafta)</div>
            </div>
             <div className="bg-void-lighter border border-white/10 rounded-2xl p-6">
                <div className="text-gray-500 text-xs font-bold uppercase mb-2 flex items-center gap-2">
                    <Clock size={14} /> O'rtacha Vaqt
                </div>
                <div className="text-3xl font-black text-white">2.4 soat</div>
                <div className="text-xs text-gray-400 mt-1">Kuniga</div>
            </div>
             <div className="bg-void-lighter border border-white/10 rounded-2xl p-6">
                <div className="text-gray-500 text-xs font-bold uppercase mb-2 flex items-center gap-2">
                    <Activity size={14} /> IoT Diqqat
                </div>
                <div className="text-3xl font-black text-white">94%</div>
                <div className="text-xs text-cyber mt-1">Juda yuqori</div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Chart */}
            <div className="lg:col-span-2 bg-void-lighter border border-white/10 rounded-3xl p-8">
                <h3 className="text-lg font-bold text-white mb-6">Progress va Diqqat Dinamikasi</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={DATA}>
                            <defs>
                                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorFocus" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="day" stroke="#666" />
                            <YAxis yAxisId="left" stroke="#00f0ff" />
                            <YAxis yAxisId="right" orientation="right" stroke="#8b5cf6" />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#000', borderColor: '#333' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Area yAxisId="left" type="monotone" dataKey="score" stroke="#00f0ff" fillOpacity={1} fill="url(#colorScore)" name="SAT Score" />
                            <Area yAxisId="right" type="monotone" dataKey="focus" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorFocus)" name="Diqqat %" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* AI Insights */}
            <div className="bg-gradient-to-b from-void-lighter to-black border border-white/10 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Brain size={100} />
                </div>
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                    <Brain className="text-cyber" size={18} /> AI MURABBIY XULOSASI
                </h3>
                
                <div className="space-y-4 relative z-10">
                    <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
                        <div className="flex items-start gap-3">
                            <CheckCircle size={18} className="text-green-500 mt-1" />
                            <div>
                                <h4 className="font-bold text-white text-sm">Kuchli Tomonlar</h4>
                                <p className="text-xs text-gray-400 mt-1">Algebra va Ma'lumotlar tahlili bo'yicha o'zlashtirish darajasi 98% ga yetdi.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl">
                        <div className="flex items-start gap-3">
                            <AlertTriangle size={18} className="text-yellow-500 mt-1" />
                            <div>
                                <h4 className="font-bold text-white text-sm">E'tibor Talab</h4>
                                <p className="text-xs text-gray-400 mt-1">Geometriya bo'limida murakkab masalalarni ishlash tezligi past. Qo'shimcha 2 soat mashq tavsiya etiladi.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-cyber/10 border border-cyber/20 p-4 rounded-xl">
                        <div className="flex items-start gap-3">
                            <TrendingUp size={18} className="text-cyber mt-1" />
                            <div>
                                <h4 className="font-bold text-white text-sm">Prognoz</h4>
                                <p className="text-xs text-gray-400 mt-1">Agar hozirgi temp saqlansa, 2 oy ichida 1550+ ball olish ehtimoli 85%.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="w-full mt-6 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl transition-all border border-white/10">
                    Batafsil Hisobotni Yuklash (PDF)
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ParentPortal;
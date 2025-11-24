
import React, { useState } from 'react';
import { ShoppingBag, Zap, Lock, Check, Palette, Monitor, Frame, Award } from 'lucide-react';

const ITEMS = [
    { id: 1, name: "Cyberpunk Theme", type: "UI Theme", cost: 500, icon: Monitor, color: "text-cyber" },
    { id: 2, name: "Matrix Green", type: "UI Theme", cost: 800, icon: Monitor, color: "text-green-500" },
    { id: 3, name: "Deep Void", type: "UI Theme", cost: 1000, icon: Monitor, color: "text-purple-500" },
    { id: 4, name: "Quantum Frame", type: "Avatar", cost: 1500, icon: Frame, color: "text-blue-400" },
    { id: 5, name: "Gold Aura", type: "Avatar", cost: 2500, icon: Zap, color: "text-yellow-400" },
    { id: 6, name: "Neuro Boost 2x", type: "Power-up", cost: 5000, icon: Award, color: "text-red-500" },
];

const GamificationStore: React.FC = () => {
    const [userXP, setUserXP] = useState(2450);
    const [owned, setOwned] = useState<number[]>([1]); // Default theme owned

    const buyItem = (id: number, cost: number) => {
        if (userXP >= cost && !owned.includes(id)) {
            setUserXP(prev => prev - cost);
            setOwned(prev => [...prev, id]);
        }
    };

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
                            <ShoppingBag className="text-yellow-500" size={40} />
                            XP <span className="text-white">STORE</span>
                        </h1>
                        <p className="text-gray-400">Spend your hard-earned knowledge points.</p>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/50 px-6 py-3 rounded-2xl flex items-center gap-3">
                        <div className="text-right">
                            <div className="text-xs text-yellow-500 font-bold uppercase">Your Balance</div>
                            <div className="text-2xl font-black text-white">{userXP.toLocaleString()} XP</div>
                        </div>
                        <Zap size={32} className="text-yellow-400 fill-yellow-400 animate-pulse" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ITEMS.map((item) => (
                        <div key={item.id} className="bg-void-lighter border border-white/10 rounded-3xl p-6 group hover:border-cyber/50 transition-all hover:-translate-y-1 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <item.icon size={100} />
                            </div>
                            
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className={`w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center ${item.color} shadow-lg group-hover:scale-110 transition-transform`}>
                                    <item.icon size={32} />
                                </div>
                                <span className="bg-white/5 text-gray-400 text-xs font-bold px-3 py-1 rounded border border-white/10">
                                    {item.type}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-1 relative z-10">{item.name}</h3>
                            <p className="text-gray-500 text-sm mb-6 relative z-10">Unlock exclusive customization.</p>

                            {owned.includes(item.id) ? (
                                <button disabled className="w-full bg-green-500/20 text-green-500 border border-green-500/50 py-3 rounded-xl font-bold flex items-center justify-center gap-2 cursor-default">
                                    <Check size={18} /> OWNED
                                </button>
                            ) : (
                                <button 
                                    onClick={() => buyItem(item.id, item.cost)}
                                    disabled={userXP < item.cost}
                                    className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                                        userXP >= item.cost 
                                        ? 'bg-white/10 text-white hover:bg-yellow-500 hover:text-black border border-white/10' 
                                        : 'bg-void text-gray-600 border border-white/5 cursor-not-allowed'
                                    }`}
                                >
                                    {userXP >= item.cost ? (
                                        <>BUY FOR <Zap size={16} className="text-yellow-400 fill-yellow-400" /> {item.cost}</>
                                    ) : (
                                        <><Lock size={16} /> LOCKED ({item.cost} XP)</>
                                    )}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GamificationStore;

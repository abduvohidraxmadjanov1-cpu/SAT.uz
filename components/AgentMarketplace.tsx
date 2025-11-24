
import React, { useState } from 'react';
import { SpecializedAgent } from '../types';
import { Users, Star, Zap, Check, Lock, Search } from 'lucide-react';

const AGENTS: SpecializedAgent[] = [
    { id: '1', name: "Prof. Einstein AI", specialty: "Advanced Physics & Math", level: "Elite", cost: 5000, hired: false, image: "bg-blue-600" },
    { id: '2', name: "Shakespeare Bot", specialty: "Literature & Essay", level: "Master", cost: 3500, hired: false, image: "bg-purple-600" },
    { id: '3', name: "Logic Master 9000", specialty: "Critical Reasoning", level: "Expert", cost: 2000, hired: true, image: "bg-green-600" },
    { id: '4', name: "Grammar Guardian", specialty: "Writing & Grammar", level: "Expert", cost: 1500, hired: false, image: "bg-yellow-600" },
    { id: '5', name: "Data Wizard", specialty: "Data Analysis", level: "Master", cost: 3000, hired: false, image: "bg-red-600" },
    { id: '6', name: "Ivy League Coach", specialty: "Admissions Strategy", level: "Elite", cost: 8000, hired: false, image: "bg-cyber" },
];

const AgentMarketplace: React.FC = () => {
    const [userXP, setUserXP] = useState(4500);
    const [agents, setAgents] = useState(AGENTS);

    const hireAgent = (id: string, cost: number) => {
        if (userXP >= cost) {
            setUserXP(prev => prev - cost);
            setAgents(prev => prev.map(a => a.id === id ? { ...a, hired: true } : a));
        }
    };

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                         <h1 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
                            <Users className="text-cyber" size={40} />
                            AGENT MARKETPLACE
                        </h1>
                        <p className="text-gray-400">Hire Top 4000 Specialized AI Agents</p>
                    </div>
                    <div className="bg-cyber/10 border border-cyber/50 px-6 py-3 rounded-2xl flex items-center gap-3">
                        <div className="text-right">
                            <div className="text-xs text-cyber font-bold uppercase">Available XP</div>
                            <div className="text-2xl font-black text-white">{userXP.toLocaleString()}</div>
                        </div>
                        <Zap size={32} className="text-yellow-400 fill-yellow-400" />
                    </div>
                </div>

                {/* Filter */}
                <div className="mb-8 relative max-w-md">
                    <input 
                        type="text" 
                        placeholder="Search for an agent (e.g. 'Math Tutor')..." 
                        className="w-full bg-void-lighter border border-white/10 rounded-xl px-4 py-3 pl-12 text-white focus:border-cyber outline-none"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {agents.map((agent) => (
                        <div key={agent.id} className="bg-void-lighter border border-white/10 rounded-3xl p-6 group hover:border-cyber/50 transition-all hover:-translate-y-2">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-16 h-16 rounded-2xl ${agent.image} flex items-center justify-center text-white shadow-lg`}>
                                    <Users size={32} />
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                                    agent.level === 'Elite' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' : 
                                    agent.level === 'Master' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 
                                    'bg-green-500/10 text-green-500 border-green-500/20'
                                }`}>
                                    {agent.level}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-1">{agent.name}</h3>
                            <p className="text-gray-400 text-sm mb-6">{agent.specialty}</p>

                            <div className="flex items-center gap-1 text-yellow-500 mb-6">
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <span className="text-gray-500 text-xs ml-2">(5.0)</span>
                            </div>

                            {agent.hired ? (
                                <button disabled className="w-full bg-green-500/20 text-green-500 border border-green-500/50 py-3 rounded-xl font-bold flex items-center justify-center gap-2 cursor-default">
                                    <Check size={18} /> HIRED
                                </button>
                            ) : (
                                <button 
                                    onClick={() => hireAgent(agent.id, agent.cost)}
                                    disabled={userXP < agent.cost}
                                    className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                                        userXP >= agent.cost 
                                        ? 'bg-white/10 text-white hover:bg-cyber hover:text-black border border-white/10' 
                                        : 'bg-void text-gray-600 border border-white/5 cursor-not-allowed'
                                    }`}
                                >
                                    {userXP >= agent.cost ? (
                                        <>HIRE FOR <Zap size={16} className="text-yellow-400 fill-yellow-400" /> {agent.cost}</>
                                    ) : (
                                        <><Lock size={16} /> LOCKED ({agent.cost} XP)</>
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

export default AgentMarketplace;

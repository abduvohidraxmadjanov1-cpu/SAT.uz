import React from 'react';
import { Trophy, Medal, Crown, User, ArrowUp, Globe, Zap } from 'lucide-react';

const LEADERS = [
    { rank: 1, name: "Azizbek T.", score: 1590, country: "Uzbekistan", streak: 45, change: "up" },
    { rank: 2, name: "Sarah J.", score: 1580, country: "USA", streak: 32, change: "same" },
    { rank: 3, name: "Li Wei", score: 1570, country: "China", streak: 28, change: "up" },
    { rank: 4, name: "Elena R.", score: 1560, country: "Russia", streak: 15, change: "down" },
    { rank: 5, name: "Jasur K.", score: 1550, country: "Uzbekistan", streak: 40, change: "up" },
];

const Leaderboard: React.FC = () => {
    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black text-white mb-2 flex items-center justify-center gap-3">
                        <Trophy className="text-yellow-500" size={40} />
                        GLOBAL <span className="text-cyber">LEADERBOARD</span>
                    </h1>
                    <p className="text-gray-400">Quantum League • Top 1% Students</p>
                </div>

                {/* Top 3 Podium */}
                <div className="flex flex-col md:flex-row justify-center items-end gap-4 md:gap-8 mb-16">
                    {/* 2nd Place */}
                    <div className="order-2 md:order-1 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full border-4 border-gray-400 overflow-hidden mb-4 relative">
                            <div className="absolute inset-0 bg-gray-400/20 flex items-center justify-center">
                                <User size={40} className="text-gray-400" />
                            </div>
                            <div className="absolute bottom-0 inset-x-0 bg-gray-400 text-black text-center font-bold text-xs py-1">#2</div>
                        </div>
                        <div className="text-white font-bold text-lg">Sarah J.</div>
                        <div className="text-cyber font-mono font-bold">1580 XP</div>
                    </div>

                    {/* 1st Place */}
                    <div className="order-1 md:order-2 flex flex-col items-center z-10 scale-125 transform -translate-y-4">
                        <div className="absolute -top-12 animate-bounce">
                            <Crown size={40} className="text-yellow-500 fill-yellow-500" />
                        </div>
                        <div className="w-24 h-24 rounded-full border-4 border-yellow-500 overflow-hidden mb-4 relative shadow-[0_0_30px_rgba(234,179,8,0.5)]">
                            <div className="absolute inset-0 bg-yellow-500/20 flex items-center justify-center">
                                <User size={48} className="text-yellow-500" />
                            </div>
                            <div className="absolute bottom-0 inset-x-0 bg-yellow-500 text-black text-center font-bold text-xs py-1">#1</div>
                        </div>
                        <div className="text-white font-bold text-xl">Azizbek T.</div>
                        <div className="text-cyber font-mono font-bold text-lg">1590 XP</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <Globe size={10} /> Uzbekistan
                        </div>
                    </div>

                    {/* 3rd Place */}
                    <div className="order-3 flex flex-col items-center">
                         <div className="w-20 h-20 rounded-full border-4 border-orange-700 overflow-hidden mb-4 relative">
                            <div className="absolute inset-0 bg-orange-700/20 flex items-center justify-center">
                                <User size={40} className="text-orange-700" />
                            </div>
                            <div className="absolute bottom-0 inset-x-0 bg-orange-700 text-black text-center font-bold text-xs py-1">#3</div>
                        </div>
                        <div className="text-white font-bold text-lg">Li Wei</div>
                        <div className="text-cyber font-mono font-bold">1570 XP</div>
                    </div>
                </div>

                {/* List */}
                <div className="bg-void-lighter border border-white/10 rounded-3xl overflow-hidden">
                    <div className="p-4 border-b border-white/10 flex justify-between text-xs text-gray-500 uppercase font-bold tracking-widest">
                        <div className="w-16 text-center">Rank</div>
                        <div className="flex-1">Student</div>
                        <div className="w-24 text-center">Streak</div>
                        <div className="w-24 text-right">Score</div>
                    </div>
                    {LEADERS.map((leader) => (
                        <div key={leader.rank} className="p-4 border-b border-white/5 flex items-center hover:bg-white/5 transition-colors group">
                            <div className="w-16 text-center font-black text-gray-500 text-xl group-hover:text-cyber">{leader.rank}</div>
                            <div className="flex-1 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                    <User size={20} className="text-gray-400" />
                                </div>
                                <div>
                                    <div className="text-white font-bold">{leader.name}</div>
                                    <div className="text-xs text-gray-500 flex items-center gap-1">
                                        <Globe size={10} /> {leader.country}
                                    </div>
                                </div>
                            </div>
                            <div className="w-24 text-center flex items-center justify-center gap-1 text-orange-500 font-mono font-bold">
                                <Zap size={14} fill="currentColor" /> {leader.streak}
                            </div>
                            <div className="w-24 text-right font-black text-xl text-cyber">{leader.score}</div>
                        </div>
                    ))}
                    {/* User's position */}
                    <div className="bg-cyber/10 p-4 border-t border-cyber/30 flex items-center">
                        <div className="w-16 text-center font-black text-cyber text-xl">42</div>
                        <div className="flex-1 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-cyber text-black flex items-center justify-center font-bold">
                                ME
                            </div>
                            <div>
                                <div className="text-white font-bold">Sizning Profilingiz</div>
                                <div className="text-xs text-gray-500">Uzbekistan</div>
                            </div>
                        </div>
                        <div className="w-24 text-center flex items-center justify-center gap-1 text-gray-500 font-mono font-bold">
                            <Zap size={14} /> 12
                        </div>
                        <div className="w-24 text-right font-black text-xl text-white">1450</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
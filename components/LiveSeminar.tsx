
import React, { useState, useEffect } from 'react';
import { Radio, Users, MessageCircle, Heart, Share2, Brain, Mic, Activity, Send } from 'lucide-react';

const CHAT_MESSAGES = [
    { user: "Azizbek", text: "This explains the derivative rule perfectly!", color: "text-blue-400" },
    { user: "Sarah", text: "Can you repeat the last step?", color: "text-pink-400" },
    { user: "Javohir", text: "Wow, 10^40x clearer than my textbook.", color: "text-green-400" },
    { user: "Malika", text: "Is this method valid for SAT Section 2?", color: "text-yellow-400" },
];

const LiveSeminar: React.FC = () => {
    const [chat, setChat] = useState(CHAT_MESSAGES);
    const [input, setInput] = useState('');
    const [viewers, setViewers] = useState(12043);
    const [confusion, setConfusion] = useState(12); // %

    useEffect(() => {
        const interval = setInterval(() => {
            setViewers(prev => prev + Math.floor(Math.random() * 10 - 3));
            setConfusion(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 5)));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleSend = () => {
        if (!input.trim()) return;
        setChat(prev => [...prev, { user: "You", text: input, color: "text-cyber" }]);
        setInput('');
    };

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-7xl mx-auto h-[85vh] flex flex-col lg:flex-row gap-6">
                {/* Main Stream Area */}
                <div className="flex-1 flex flex-col">
                    <div className="bg-black border border-white/10 rounded-3xl overflow-hidden relative aspect-video shadow-[0_0_50px_rgba(0,240,255,0.1)] group">
                        {/* Placeholder Stream */}
                        <div className="absolute inset-0 bg-void-lighter flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-24 h-24 bg-cyber/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                                    <Radio size={48} className="text-cyber" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">LIVE STREAM</h2>
                                <p className="text-gray-500">Advanced Calculus for SAT Math II</p>
                            </div>
                        </div>
                        
                        {/* Overlays */}
                        <div className="absolute top-6 left-6 flex items-center gap-3">
                            <div className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded animate-pulse">LIVE</div>
                            <div className="bg-black/60 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded flex items-center gap-2">
                                <Users size={12} /> {viewers.toLocaleString()}
                            </div>
                        </div>

                        {/* AI Captions */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur px-6 py-2 rounded-full text-white text-sm font-medium border border-white/10">
                            <span className="text-cyber mr-2">AI CAPTION:</span>
                            "Notice how the limit approaches infinity as x goes to zero..."
                        </div>
                    </div>

                    <div className="mt-6 flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold text-white mb-2">Mastering Limits & Derivatives</h1>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                <span className="flex items-center gap-1"><Mic size={14} /> Professor AI</span>
                                <span className="flex items-center gap-1"><Activity size={14} /> Difficulty: Hard</span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="bg-white/5 border border-white/10 p-3 rounded-xl text-white hover:bg-pink-500 hover:border-pink-500 transition-colors">
                                <Heart size={20} />
                            </button>
                            <button className="bg-white/5 border border-white/10 p-3 rounded-xl text-white hover:bg-cyber hover:border-cyber hover:text-black transition-colors">
                                <Share2 size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-full lg:w-96 flex flex-col gap-6 h-full">
                    {/* AI Metrics */}
                    <div className="bg-void-lighter border border-white/10 rounded-2xl p-6">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <Brain className="text-cyber" size={18} /> CLASS ANALYTICS
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs text-gray-400 mb-1">
                                    <span>Confusion Meter</span>
                                    <span className={confusion > 50 ? "text-red-500" : "text-green-500"}>{Math.round(confusion)}%</span>
                                </div>
                                <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                                    <div className={`h-full transition-all duration-500 ${confusion > 50 ? 'bg-red-500' : 'bg-green-500'}`} style={{width: `${confusion}%`}}></div>
                                </div>
                            </div>
                            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                <div className="text-xs text-gray-500 uppercase font-bold mb-1">AI Note</div>
                                <p className="text-xs text-gray-300 leading-relaxed">
                                    Key takeaway: The chain rule is essential for composite functions. Memorize: f'(g(x)) * g'(x).
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Chat */}
                    <div className="flex-1 bg-void-lighter border border-white/10 rounded-2xl overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-white/10 bg-black/20">
                            <h3 className="text-white font-bold text-sm flex items-center gap-2">
                                <MessageCircle size={16} /> LIVE CHAT
                            </h3>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                            {chat.map((msg, i) => (
                                <div key={i} className="text-sm">
                                    <span className={`font-bold ${msg.color} mr-2`}>{msg.user}:</span>
                                    <span className="text-gray-300">{msg.text}</span>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t border-white/10 bg-black/40">
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask a question..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-cyber outline-none"
                                />
                                <button onClick={handleSend} className="bg-cyber text-black p-2 rounded-lg hover:bg-white transition-colors">
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveSeminar;

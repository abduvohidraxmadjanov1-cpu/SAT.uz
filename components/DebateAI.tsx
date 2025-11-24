
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, User, Cpu, ThumbsUp, ThumbsDown, ShieldAlert, Award, Send } from 'lucide-react';

const TOPICS = [
    "Is Universal Basic Income necessary in the AI age?",
    "Should space exploration be privatized?",
    "Is social media harmful to democracy?",
    "Should genetic engineering be regulated globally?"
];

interface Message {
    id: number;
    sender: 'user' | 'ai';
    text: string;
    score?: number; // For user arguments
    analysis?: string;
}

const DebateAI: React.FC = () => {
    const [topic, setTopic] = useState(TOPICS[0]);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, sender: 'ai', text: `Let's debate: "${TOPICS[0]}". I will argue AGAINST it. You start.` }
    ]);
    const [input, setInput] = useState('');
    const [userScore, setUserScore] = useState(50);
    const [aiScore, setAiScore] = useState(50);
    const [processing, setProcessing] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;
        
        const userMsg: Message = {
            id: Date.now(),
            sender: 'user',
            text: input,
            score: Math.floor(Math.random() * 20 + 70), // Simulating analysis score
            analysis: "Strong logical flow, but lacks empirical evidence."
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setProcessing(true);
        
        // Simulate Health Bar impact
        setUserScore(prev => Math.min(100, prev + 5));
        setAiScore(prev => Math.max(0, prev - 5));

        setTimeout(() => {
            const aiMsg: Message = {
                id: Date.now() + 1,
                sender: 'ai',
                text: "While your point on economic stability is valid, you fail to address the inflationary pressure UBI might cause. Studies from 2023 suggest..."
            };
            setMessages(prev => [...prev, aiMsg]);
            setProcessing(false);
            
            // AI Counter-attack
            setAiScore(prev => Math.min(100, prev + 8));
            setUserScore(prev => Math.max(0, prev - 3));
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-5xl mx-auto h-[80vh] flex flex-col">
                {/* Header & Scoreboard */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-white flex items-center gap-3">
                            <MessageSquare className="text-red-500" size={32} />
                            DEBATE <span className="text-white">ARENA</span>
                        </h1>
                        <p className="text-gray-400 text-sm">Critical Thinking & Logic Training</p>
                    </div>
                    
                    <div className="flex-1 w-full max-w-xl">
                        <div className="flex justify-between text-xs font-bold uppercase mb-2">
                            <span className="text-cyber flex items-center gap-1"><User size={12} /> YOU ({userScore})</span>
                            <span className="text-white">ARGUMENT STRENGTH</span>
                            <span className="text-red-500 flex items-center gap-1">AI ({aiScore}) <Cpu size={12} /></span>
                        </div>
                        <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden flex border border-white/10">
                            <div className="h-full bg-cyber transition-all duration-500" style={{width: `${userScore}%`}}></div>
                            <div className="h-full bg-red-500 transition-all duration-500" style={{width: `${aiScore}%`}}></div>
                        </div>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 bg-void-lighter border border-white/10 rounded-3xl overflow-hidden flex flex-col relative">
                    <div className="absolute top-0 inset-x-0 bg-black/80 backdrop-blur p-4 border-b border-white/10 z-10 text-center">
                        <span className="text-gray-500 text-xs font-bold uppercase">Current Topic</span>
                        <h3 className="text-white font-bold">{topic}</h3>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6 mt-16 custom-scrollbar">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] ${msg.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
                                    <div className={`p-4 rounded-2xl ${msg.sender === 'user' ? 'bg-cyber/10 border border-cyber/30 text-white rounded-tr-sm' : 'bg-white/5 border border-white/10 text-gray-300 rounded-tl-sm'}`}>
                                        <p className="text-sm leading-relaxed">{msg.text}</p>
                                    </div>
                                    
                                    {msg.sender === 'user' && msg.score && (
                                        <div className="flex items-center gap-4 text-xs">
                                            <span className="text-green-400 font-mono flex items-center gap-1"><Award size={12} /> Score: {msg.score}/100</span>
                                            <span className="text-gray-500 italic">{msg.analysis}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {processing && (
                            <div className="flex justify-start">
                                <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce delay-100"></div>
                                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce delay-200"></div>
                                    <span className="text-xs text-red-500 font-bold ml-2">ANALYZING LOGIC...</span>
                                </div>
                            </div>
                        )}
                        <div ref={scrollRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-black border-t border-white/10">
                        <div className="flex gap-4">
                            <input 
                                type="text" 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Construct your argument..."
                                className="flex-1 bg-void-lighter border border-white/20 rounded-xl px-4 py-3 text-white focus:border-cyber outline-none"
                            />
                            <button 
                                onClick={handleSend}
                                disabled={processing}
                                className="bg-cyber text-black px-6 rounded-xl font-bold hover:bg-white transition-all disabled:opacity-50"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DebateAI;

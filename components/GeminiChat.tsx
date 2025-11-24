
import React, { useState, useRef, useEffect } from 'react';
import { generateSATResponse } from '../services/geminiService';
import { Send, Bot, User, Loader2, Mic, Volume2, Cpu, BookOpen, PenTool, Target, Sparkles, ThumbsUp, ThumbsDown, RefreshCw } from 'lucide-react';
import { AgentRole, AgentConfig } from '../types';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  role?: AgentRole;
  rating?: 'up' | 'down';
}

const AGENTS: AgentConfig[] = [
    { id: 'general', name: 'General AI', description: 'Umumiy Yordamchi', icon: Bot, color: 'text-cyber' },
    { id: 'math', name: 'Math Genius', description: 'Matematika Ustasi', icon: Cpu, color: 'text-blue-400' },
    { id: 'reading', name: 'Reading Pro', description: 'O\'qish Mutaxassisi', icon: BookOpen, color: 'text-purple-400' },
    { id: 'writing', name: 'Writing Guru', description: 'Yozish Eksperti', icon: PenTool, color: 'text-pink-400' },
    { id: 'strategy', name: 'Strategist', description: 'Imtihon Strategiyasi', icon: Target, color: 'text-green-400' },
];

const SUGGESTIONS = [
    "Explain the Pythagorean Theorem",
    "How to use semicolons correctly?",
    "What is the quadratic formula?",
    "Strategies for Reading Inference"
];

const GeminiChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Salom! Men SAT.uz Markaziy AI Tizimiman. Qaysi SAT tushunchasi (Concept) bo'yicha yordam kerak? Savolingizni bering.",
      sender: 'ai',
      timestamp: new Date(),
      role: 'general'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentRole, setCurrentRole] = useState<AgentRole>('general');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const responseText = await generateSATResponse(text, currentRole);

    const aiMessage: Message = {
      id: Date.now() + 1,
      text: responseText,
      sender: 'ai',
      timestamp: new Date(),
      role: currentRole
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  const handleRating = (msgId: number, rating: 'up' | 'down') => {
      setMessages(prev => prev.map(msg => {
          if (msg.id === msgId) {
              // If clicking same rating, toggle off
              if (msg.rating === rating) return { ...msg, rating: undefined };
              return { ...msg, rating };
          }
          return msg;
      }));
  };

  const speakText = (text: string) => {
    if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.includes('uz')) || voices.find(v => v.lang.includes('en'));
    if (preferredVoice) utterance.voice = preferredVoice;
    
    utterance.rate = 1.1;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const CurrentIcon = AGENTS.find(a => a.id === currentRole)?.icon || Bot;

  return (
    <div className="w-full max-w-5xl mx-auto my-12 glass-panel rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.15)] flex flex-col h-[700px] border border-cyber/20 relative">
      {/* Abstract Grid Overlay */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>

      <div className="bg-void-lighter/90 backdrop-blur-md px-6 py-4 border-b border-white/10 flex flex-col md:flex-row justify-between items-center z-10">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center ${AGENTS.find(a => a.id === currentRole)?.color} animate-pulse shadow-lg`}>
            <CurrentIcon size={24} />
          </div>
          <div>
            <h3 className="font-black text-white text-lg tracking-wide flex items-center gap-2">
              CONCEPT Q&A <span className="bg-cyber text-black text-[10px] px-1.5 py-0.5 rounded font-bold">AI</span>
            </h3>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              {AGENTS.find(a => a.id === currentRole)?.name} Active
            </p>
          </div>
        </div>

        {/* Agent Selector */}
        <div className="flex gap-2 bg-black/40 p-1.5 rounded-xl border border-white/10 overflow-x-auto max-w-full">
            {AGENTS.map((agent) => (
                <button
                    key={agent.id}
                    onClick={() => setCurrentRole(agent.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                        currentRole === agent.id 
                        ? 'bg-white/10 text-cyber shadow-[0_0_15px_rgba(0,240,255,0.2)] border border-cyber/30' 
                        : 'text-gray-500 hover:text-white hover:bg-white/5'
                    }`}
                >
                    <agent.icon size={14} />
                    <span className="hidden md:inline">{agent.name}</span>
                </button>
            ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-void/50 z-10 scroll-smooth">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} group`}
          >
            <div
              className={`max-w-[85%] rounded-3xl px-6 py-4 shadow-xl backdrop-blur-sm transition-all duration-300 ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-br from-cyber/20 to-blue-600/20 text-white border border-cyber/30 rounded-tr-sm'
                  : 'bg-void-lighter/80 text-gray-200 border border-white/10 rounded-tl-sm hover:border-cyber/30'
              }`}
            >
              <div className="flex items-center justify-between gap-4 mb-2 opacity-60 text-[10px] uppercase tracking-widest font-bold">
                 <div className="flex items-center gap-2">
                    {msg.sender === 'user' ? <User size={10} /> : <Sparkles size={10} className="text-cyber" />}
                    {msg.sender === 'user' ? 'Siz' : AGENTS.find(a => a.id === msg.role)?.name}
                 </div>
                 {msg.sender === 'ai' && (
                     <button onClick={() => speakText(msg.text)} className="hover:text-cyber transition">
                         {isSpeaking ? <Volume2 size={12} className="animate-pulse text-cyber" /> : <Volume2 size={12} />}
                     </button>
                 )}
              </div>
              <p className="text-sm md:text-base leading-7 whitespace-pre-wrap font-light">{msg.text}</p>
              
              {/* Rating System */}
              {msg.sender === 'ai' && (
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] text-gray-600 font-mono">AI GENERATED • RATE ANSWER</span>
                      <div className="flex gap-2">
                          <button 
                            onClick={() => handleRating(msg.id, 'up')}
                            className={`p-1.5 rounded-lg transition-all ${msg.rating === 'up' ? 'text-green-400 bg-green-400/10' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                            title="Helpful"
                          >
                              <ThumbsUp size={14} />
                          </button>
                          <button 
                            onClick={() => handleRating(msg.id, 'down')}
                            className={`p-1.5 rounded-lg transition-all ${msg.rating === 'down' ? 'text-red-400 bg-red-400/10' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                            title="Not Helpful"
                          >
                              <ThumbsDown size={14} />
                          </button>
                          {msg.rating && (
                              <span className="text-[10px] text-cyber animate-in fade-in ml-2 flex items-center gap-1">
                                  <RefreshCw size={10} /> Learning...
                              </span>
                          )}
                      </div>
                  </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-void-lighter rounded-2xl px-6 py-4 border border-white/10 flex items-center gap-4 animate-pulse">
              <div className="relative">
                  <div className="absolute inset-0 bg-cyber blur-md opacity-50 animate-pulse"></div>
                  <Loader2 className="animate-spin text-cyber relative z-10" size={20} />
              </div>
              <span className="text-sm text-cyber font-mono tracking-widest">GENERATING ANSWER...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-void-lighter border-t border-white/10 z-10">
        {/* Quick Suggestions */}
        {messages.length < 3 && (
            <div className="flex gap-2 overflow-x-auto mb-4 pb-2 scrollbar-hide">
                {SUGGESTIONS.map((sug, i) => (
                    <button 
                        key={i}
                        onClick={() => handleSend(sug)}
                        className="whitespace-nowrap text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-gray-400 hover:text-cyber hover:border-cyber/50 transition-all"
                    >
                        {sug}
                    </button>
                ))}
            </div>
        )}

        <div className="flex items-center gap-3 relative">
          <button className="p-3.5 bg-white/5 rounded-2xl text-gray-400 hover:text-cyber hover:bg-white/10 transition border border-transparent hover:border-cyber/20">
              <Mic size={20} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about any SAT concept..."
            className="flex-1 bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-cyber/50 focus:ring-1 focus:ring-cyber/50 transition-all font-medium"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="p-3.5 bg-cyber text-black rounded-2xl hover:bg-white hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all font-bold shadow-[0_0_20px_rgba(0,240,255,0.4)]"
          >
            <Send size={20} />
          </button>
        </div>
        <div className="text-center mt-2 text-[10px] text-gray-600 font-mono flex justify-center gap-4">
            <span>POWERED BY GEMINI 2.5 FLASH</span>
            <span>•</span>
            <span>RLHF FEEDBACK ENABLED</span>
        </div>
      </div>
    </div>
  );
};

export default GeminiChat;

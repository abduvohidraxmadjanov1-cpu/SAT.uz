
import React, { useState, useEffect } from 'react';
import { PenTool, AlignLeft, CheckCircle, AlertTriangle, Sparkles, FileText, BarChart, RefreshCw } from 'lucide-react';

const EssayGrader: React.FC = () => {
    const [text, setText] = useState('');
    const [analyzing, setAnalyzing] = useState(false);
    const [metrics, setMetrics] = useState({
        score: 0,
        cohesion: 0,
        vocabulary: 0,
        grammar: 0,
        sentiment: 'Neutral'
    });
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const analyzeText = () => {
        if (!text.trim()) return;
        setAnalyzing(true);
        
        // Simulate AI Processing
        setTimeout(() => {
            const wordCount = text.split(' ').length;
            const score = Math.min(100, Math.max(40, Math.floor(Math.random() * 30 + 60 + (wordCount / 10))));
            
            setMetrics({
                score,
                cohesion: Math.floor(Math.random() * 20 + 80),
                vocabulary: Math.floor(Math.random() * 20 + 75),
                grammar: Math.floor(Math.random() * 10 + 90),
                sentiment: 'Academic / Formal'
            });

            setSuggestions([
                "Consider using 'furthermore' instead of 'also' in paragraph 2.",
                "The sentence structure in line 4 is repetitive. Try combining clauses.",
                "Excellent use of evidence to support your thesis.",
                "Vocabulary complexity is in the top 10% of applicants."
            ]);

            setAnalyzing(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-6xl mx-auto h-[85vh] flex flex-col">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-white flex items-center gap-3">
                            <PenTool className="text-pink-500" size={32} />
                            ESSAY <span className="text-cyber">GRADER</span>
                        </h1>
                        <p className="text-gray-400 text-sm">College Application & Academic Writing AI</p>
                    </div>
                    <button 
                        onClick={analyzeText}
                        disabled={analyzing || !text}
                        className="bg-pink-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-pink-400 transition-all shadow-[0_0_30px_rgba(236,72,153,0.4)] flex items-center gap-2 disabled:opacity-50"
                    >
                        {analyzing ? <RefreshCw className="animate-spin" size={20} /> : <Sparkles size={20} />}
                        {analyzing ? 'ANALYZING...' : 'GRADE MY ESSAY'}
                    </button>
                </div>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Editor */}
                    <div className="bg-void-lighter border border-white/10 rounded-3xl p-6 flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs text-gray-500 font-bold uppercase flex items-center gap-2">
                                <AlignLeft size={14} /> Input Text
                            </span>
                            <span className="text-xs text-cyber font-mono">{text.split(' ').filter(w => w).length} Words</span>
                        </div>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Paste your essay here..."
                            className="flex-1 bg-black/50 border border-white/5 rounded-2xl p-6 text-gray-300 resize-none focus:outline-none focus:border-pink-500/50 transition-colors font-serif text-lg leading-relaxed"
                        ></textarea>
                    </div>

                    {/* Analysis Panel */}
                    <div className="flex flex-col gap-6">
                        {/* Main Score */}
                        <div className="bg-gradient-to-br from-pink-900/20 to-black border border-pink-500/30 p-8 rounded-3xl flex items-center justify-between relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                            <div>
                                <h3 className="text-pink-500 text-sm font-bold uppercase mb-1">Overall Score</h3>
                                <div className="text-6xl font-black text-white">{metrics.score}<span className="text-2xl text-gray-500">/100</span></div>
                            </div>
                            <div className="w-32 h-32 relative flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full border-8 border-gray-800"></div>
                                <div 
                                    className="absolute inset-0 rounded-full border-8 border-pink-500 border-t-transparent rotate-45 transition-all duration-1000"
                                    style={{ transform: `rotate(${metrics.score * 3.6}deg)` }}
                                ></div>
                                <BarChart size={40} className="text-white" />
                            </div>
                        </div>

                        {/* Detailed Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-void-lighter border border-white/10 p-4 rounded-2xl">
                                <div className="text-xs text-gray-500 uppercase mb-2">Cohesion</div>
                                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                                    <div className="bg-blue-500 h-full transition-all duration-1000" style={{width: `${metrics.cohesion}%`}}></div>
                                </div>
                                <div className="text-right text-white font-bold mt-1">{metrics.cohesion}%</div>
                            </div>
                            <div className="bg-void-lighter border border-white/10 p-4 rounded-2xl">
                                <div className="text-xs text-gray-500 uppercase mb-2">Vocabulary</div>
                                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                                    <div className="bg-purple-500 h-full transition-all duration-1000" style={{width: `${metrics.vocabulary}%`}}></div>
                                </div>
                                <div className="text-right text-white font-bold mt-1">{metrics.vocabulary}%</div>
                            </div>
                            <div className="bg-void-lighter border border-white/10 p-4 rounded-2xl">
                                <div className="text-xs text-gray-500 uppercase mb-2">Grammar</div>
                                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                                    <div className="bg-green-500 h-full transition-all duration-1000" style={{width: `${metrics.grammar}%`}}></div>
                                </div>
                                <div className="text-right text-white font-bold mt-1">{metrics.grammar}%</div>
                            </div>
                            <div className="bg-void-lighter border border-white/10 p-4 rounded-2xl">
                                <div className="text-xs text-gray-500 uppercase mb-2">Tone</div>
                                <div className="text-white font-bold text-sm truncate">{metrics.sentiment}</div>
                            </div>
                        </div>

                        {/* AI Suggestions */}
                        <div className="flex-1 bg-void-lighter border border-white/10 rounded-3xl p-6 overflow-y-auto custom-scrollbar">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <FileText size={18} className="text-cyber" /> AI Feedback
                            </h3>
                            {suggestions.length > 0 ? (
                                <div className="space-y-3">
                                    {suggestions.map((sug, i) => (
                                        <div key={i} className="flex gap-3 items-start bg-white/5 p-3 rounded-xl border border-white/5">
                                            {i % 2 === 0 ? <AlertTriangle size={16} className="text-yellow-500 mt-1 flex-shrink-0" /> : <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />}
                                            <p className="text-gray-300 text-sm leading-relaxed">{sug}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center text-gray-500 mt-10">
                                    <p>Submit text to generate AI suggestions.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EssayGrader;

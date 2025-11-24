
import React, { useState, useEffect } from 'react';
import { generatePracticeQuestion } from '../services/geminiService';
import { PracticeQuestion } from '../types';
import { Brain, CheckCircle, XCircle, Loader2, Sparkles, BookOpen, Layers, Zap } from 'lucide-react';

const DOMAINS = {
    "Math": ["Algebra", "Geometry", "Trigonometry", "Data Analysis", "Advanced Math"],
    "Reading & Writing": ["Reading Comprehension", "Grammar", "Vocabulary", "Expression of Ideas", "Standard English Conventions"]
};

const PracticeArena: React.FC = () => {
    const [currentQuestion, setCurrentQuestion] = useState<PracticeQuestion | null>(null);
    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [explanationText, setExplanationText] = useState('');
    
    const [selectedDomain, setSelectedDomain] = useState<keyof typeof DOMAINS>("Math");
    const [selectedTopic, setSelectedTopic] = useState(DOMAINS["Math"][0]);

    const loadQuestion = async () => {
        setLoading(true);
        setSelectedOption(null);
        setShowExplanation(false);
        setExplanationText('');
        
        const q = await generatePracticeQuestion(selectedTopic);
        setCurrentQuestion(q);
        setLoading(false);
    };

    const handleOptionSelect = (option: string) => {
        if (selectedOption) return;
        setSelectedOption(option);
        setShowExplanation(true);
        
        // Smoother typing effect
        if (currentQuestion?.explanation) {
            let i = 0;
            const text = currentQuestion.explanation;
            setExplanationText('');
            const interval = setInterval(() => {
                setExplanationText(prev => prev + text.charAt(i));
                i++;
                if (i >= text.length) clearInterval(interval);
            }, 10);
        }
    };

    const handleDomainChange = (domain: keyof typeof DOMAINS) => {
        setSelectedDomain(domain);
        setSelectedTopic(DOMAINS[domain][0]);
    };

    return (
        <div className="max-w-[1600px] mx-auto px-6 py-8 h-full min-h-screen flex flex-col bg-void pt-28">
            {/* Header & Controls */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-12 gap-8">
                <div>
                     <h2 className="text-4xl font-black text-white flex items-center gap-4 mb-2">
                        <div className="bg-white/10 p-2 rounded-xl border border-white/10">
                            <Brain className="text-cyber" size={32} />
                        </div>
                        ZEN <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">PRACTICE</span>
                    </h2>
                    <p className="text-gray-400 font-light">Deep Focus Mode • AI Feedback Loop Active</p>
                </div>
                
                <div className="flex flex-wrap gap-4 items-center bg-void-lighter border border-white/10 p-2 rounded-2xl">
                    <div className="flex gap-1 bg-black/50 p-1 rounded-xl">
                        {(Object.keys(DOMAINS) as Array<keyof typeof DOMAINS>).map(domain => (
                            <button
                                key={domain}
                                onClick={() => handleDomainChange(domain)}
                                className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${selectedDomain === domain ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
                            >
                                {domain}
                            </button>
                        ))}
                    </div>
                    <div className="h-8 w-px bg-white/10 hidden md:block"></div>
                    <div className="flex gap-2 overflow-x-auto max-w-md custom-scrollbar pb-1 md:pb-0">
                        {DOMAINS[selectedDomain].map(topic => (
                            <button
                                key={topic}
                                onClick={() => setSelectedTopic(topic)}
                                className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all whitespace-nowrap ${selectedTopic === topic ? 'bg-cyber/10 border-cyber text-cyber' : 'bg-transparent border-transparent text-gray-500 hover:bg-white/5 hover:text-white'}`}
                            >
                                {topic}
                            </button>
                        ))}
                    </div>
                </div>

                <button 
                    onClick={loadQuestion} 
                    disabled={loading}
                    className="bg-cyber text-black px-8 py-4 rounded-xl font-black hover:bg-white transition-all disabled:opacity-50 flex items-center gap-3 shadow-[0_0_30px_rgba(0,240,255,0.2)]"
                >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} fill="currentColor" />}
                    {currentQuestion ? 'NEXT PROBLEM' : 'START SESSION'}
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col relative">
                {!currentQuestion && !loading && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center border border-dashed border-white/10 rounded-[40px] bg-void-lighter/30 m-4 min-h-[400px]">
                        <div className="w-32 h-32 bg-black rounded-full border border-white/10 flex items-center justify-center mb-8 animate-float shadow-2xl">
                            <Layers size={64} className="text-cyber/50" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">Ready to Focus?</h3>
                        <p className="text-gray-400 max-w-md mb-8 leading-relaxed">
                            Your AI tutor is ready to generate high-probability questions for <span className="text-cyber font-bold">{selectedTopic}</span>.
                        </p>
                    </div>
                )}

                {loading && (
                    <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
                        <div className="relative">
                            <div className="w-24 h-24 border-t-4 border-cyber rounded-full animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Brain size={32} className="text-white animate-pulse" />
                            </div>
                        </div>
                        <p className="mt-8 text-gray-500 font-mono tracking-[0.2em] text-xs">SYNTHESIZING PROBLEM...</p>
                    </div>
                )}

                {currentQuestion && !loading && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 flex-1 pb-12">
                        {/* Left: Question */}
                        <div className="flex flex-col gap-8 animate-in slide-in-from-left duration-500">
                            <div className="bg-void-lighter border border-white/10 p-10 rounded-[40px] relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 left-0 w-2 h-full bg-cyber"></div>
                                <div className="flex justify-between items-center mb-8">
                                    <span className="text-cyber text-xs font-bold uppercase tracking-widest border border-cyber/20 px-3 py-1 rounded-full bg-cyber/5">{currentQuestion.topic}</span>
                                    <span className={`text-xs font-black px-4 py-1.5 rounded-full ${
                                        currentQuestion.difficulty === 'Hard' ? 'bg-red-500 text-black' :
                                        currentQuestion.difficulty === 'Medium' ? 'bg-yellow-500 text-black' :
                                        'bg-green-500 text-black'
                                    }`}>
                                        {currentQuestion.difficulty.toUpperCase()}
                                    </span>
                                </div>
                                <p className="text-2xl md:text-3xl font-medium text-white leading-relaxed font-serif">
                                    {currentQuestion.question}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {currentQuestion.options.map((option, idx) => {
                                    const isSelected = selectedOption === option;
                                    const isCorrect = option === currentQuestion.correctAnswer;
                                    const showResult = !!selectedOption;
                                    
                                    let btnClass = "bg-void-lighter border-white/10 hover:bg-white/5 hover:border-white/30";
                                    if (showResult) {
                                        if (isCorrect) btnClass = "bg-green-500/20 border-green-500 text-green-400";
                                        else if (isSelected) btnClass = "bg-red-500/20 border-red-500 text-red-400";
                                        else btnClass = "bg-void-lighter border-white/5 opacity-50";
                                    }

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleOptionSelect(option)}
                                            disabled={!!selectedOption}
                                            className={`w-full p-6 rounded-2xl border-2 text-left transition-all duration-300 flex items-center justify-between group ${btnClass}`}
                                        >
                                            <div className="flex items-center gap-6">
                                                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center text-lg font-bold transition-colors ${showResult && (isCorrect || isSelected) ? 'border-current bg-current text-black' : 'border-white/20 text-gray-500 group-hover:border-white group-hover:text-white'}`}>
                                                    {String.fromCharCode(65 + idx)}
                                                </div>
                                                <span className="font-medium text-xl">{option}</span>
                                            </div>
                                            {showResult && isCorrect && <CheckCircle size={24} className="text-green-500" />}
                                            {showResult && isSelected && !isCorrect && <XCircle size={24} className="text-red-500" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right: Explanation */}
                        <div className={`relative transition-all duration-700 ${showExplanation ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                            <div className="bg-black border border-white/10 rounded-[40px] h-full flex flex-col overflow-hidden">
                                <div className="bg-white/5 p-8 border-b border-white/10 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-cyber/20 flex items-center justify-center text-cyber border border-cyber/30">
                                        <BookOpen size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-xl">Neural Explanation</h3>
                                        <p className="text-xs text-gray-500 font-mono mt-1">GENERATED BY GEMINI 2.5</p>
                                    </div>
                                </div>

                                <div className="flex-1 p-10 overflow-y-auto custom-scrollbar">
                                    <div className="prose prose-invert prose-lg max-w-none">
                                        <div className="text-gray-300 leading-loose whitespace-pre-line font-light text-lg">
                                            {explanationText}
                                            {showExplanation && explanationText.length < (currentQuestion.explanation?.length || 0) && (
                                                <span className="inline-block w-2 h-5 bg-cyber ml-1 animate-pulse align-middle"></span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                {showExplanation && (
                                    <div className="p-8 bg-void-lighter border-t border-white/10">
                                        <div className="bg-gradient-to-r from-cyber/10 to-transparent border border-cyber/20 rounded-2xl p-5 flex items-start gap-4">
                                            <Sparkles size={24} className="text-cyber flex-shrink-0 mt-1" />
                                            <div>
                                                <h4 className="text-cyber font-bold text-xs uppercase mb-2">Pro Tip</h4>
                                                <p className="text-gray-400 text-sm">
                                                    In {currentQuestion.topic} problems, always check if the equation can be simplified before solving.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PracticeArena;

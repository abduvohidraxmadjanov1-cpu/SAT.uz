
import React, { useState, useEffect, useRef } from 'react';
import { Video, Mic, MicOff, PhoneOff, User, Sparkles, MessageSquare } from 'lucide-react';

const QUESTIONS = [
    "Tell me about a time you faced a significant challenge.",
    "Why do you want to attend our university specifically?",
    "Describe a project you are passionate about.",
    "How do you contribute to your community?",
    "What is your greatest weakness and how do you manage it?"
];

const InterviewSimulator: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [active, setActive] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        if (active && navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then(stream => {
                    if (videoRef.current) videoRef.current.srcObject = stream;
                });
        }
    }, [active]);

    const startInterview = () => {
        setActive(true);
        setCurrentQuestion(0);
        setFeedback("");
    };

    const nextQuestion = () => {
        if (currentQuestion < QUESTIONS.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setFeedback("AI Analysis: Good eye contact maintained. Try to reduce filler words like 'um'.");
        } else {
            setActive(false);
            setFeedback("Interview Complete. Overall confidence: 88%.");
        }
    };

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-6xl mx-auto h-[85vh] flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-black text-white flex items-center gap-3">
                            <Video className="text-cyber" size={32} />
                            ADMISSIONS <span className="text-white">INTERVIEW</span>
                        </h1>
                        <p className="text-gray-400 text-sm">Harvard/MIT Mock Interview Simulation</p>
                    </div>
                    {!active && (
                        <button 
                            onClick={startInterview}
                            className="bg-cyber text-black px-8 py-3 rounded-xl font-bold hover:bg-white transition-all flex items-center gap-2"
                        >
                            <Video size={20} /> START INTERVIEW
                        </button>
                    )}
                </div>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0">
                    {/* Main AI View */}
                    <div className="lg:col-span-2 bg-void-lighter border border-white/10 rounded-3xl relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col">
                        {active ? (
                            <div className="relative flex-1 bg-gradient-to-b from-gray-800 to-black flex items-center justify-center">
                                {/* Simulated AI Avatar */}
                                <div className="text-center">
                                    <div className="w-48 h-48 bg-white/5 rounded-full border-4 border-cyber/30 flex items-center justify-center mx-auto mb-6 relative">
                                        <User size={80} className="text-gray-400" />
                                        <div className="absolute inset-0 border-4 border-cyber/50 rounded-full animate-pulse"></div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Dr. Sarah Mitchell</h3>
                                    <p className="text-cyber text-sm uppercase font-bold tracking-widest">Admissions Officer</p>
                                </div>

                                {/* User PiP */}
                                <div className="absolute bottom-6 right-6 w-48 h-36 bg-black border-2 border-white/20 rounded-xl overflow-hidden shadow-2xl">
                                    <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
                                </div>

                                {/* Controls */}
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
                                    <button className="p-4 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors" onClick={() => setActive(false)}>
                                        <PhoneOff size={24} />
                                    </button>
                                    <button 
                                        className={`p-4 rounded-full text-white transition-colors ${isSpeaking ? 'bg-cyber text-black' : 'bg-white/10 hover:bg-white/20'}`}
                                        onClick={() => setIsSpeaking(!isSpeaking)}
                                    >
                                        {isSpeaking ? <Mic size={24} /> : <MicOff size={24} />}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-12 text-center">
                                <Video size={64} className="mb-6 opacity-20" />
                                <h3 className="text-2xl font-bold text-white mb-2">Ready to begin?</h3>
                                <p className="max-w-md">
                                    Our AI will simulate a real university admission interview. 
                                    Ensure you are in a quiet room with good lighting.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Interaction Panel */}
                    <div className="bg-void-lighter border border-white/10 rounded-3xl p-6 flex flex-col">
                        <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                            <MessageSquare className="text-cyber" size={20} />
                            INTERVIEW FLOW
                        </h3>

                        {active && (
                            <div className="flex-1 flex flex-col justify-between">
                                <div className="space-y-6">
                                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                                        <p className="text-xs text-cyber font-bold uppercase mb-2">Current Question</p>
                                        <p className="text-xl font-medium text-white leading-relaxed">
                                            "{QUESTIONS[currentQuestion]}"
                                        </p>
                                    </div>

                                    {feedback && (
                                        <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-xl flex items-start gap-3 animate-in slide-in-from-bottom">
                                            <Sparkles size={18} className="text-blue-400 mt-1 flex-shrink-0" />
                                            <p className="text-sm text-blue-100">{feedback}</p>
                                        </div>
                                    )}
                                </div>

                                <button 
                                    onClick={nextQuestion}
                                    className="w-full bg-white/10 hover:bg-white/20 text-white py-4 rounded-xl font-bold transition-all mt-6 border border-white/10"
                                >
                                    Next Question
                                </button>
                            </div>
                        )}
                        
                        {!active && feedback && (
                            <div className="flex-1 bg-green-500/10 border border-green-500/30 rounded-2xl p-6">
                                <h4 className="text-green-500 font-bold mb-2">Performance Report</h4>
                                <p className="text-gray-300">{feedback}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterviewSimulator;

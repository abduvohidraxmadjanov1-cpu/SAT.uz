
import React, { useState, useEffect } from 'react';
import { Hexagon, Cpu, Shield, Globe, Zap, Code } from 'lucide-react';

interface SystemBootProps {
    onComplete: () => void;
}

const STEPS = [
    { text: "INITIALIZING NEURAL CORE (LAYER 1-3000)...", icon: Cpu, color: "text-cyber" },
    { text: "CONNECTING TO 1000+ GLOBAL SERVERS...", icon: Globe, color: "text-blue-500" },
    { text: "ACTIVATING QUANTUM SECURITY MATRIX...", icon: Shield, color: "text-red-500" },
    { text: "SYNCHRONIZING 4000 AI AGENTS...", icon: Zap, color: "text-yellow-500" },
    { text: "LOADING UZBEK LANGUAGE MODELS...", icon: Code, color: "text-green-500" },
    { text: "SYSTEM READY. WELCOME TO SAT.UZ v4.0", icon: Hexagon, color: "text-white" }
];

const SystemBoot: React.FC<SystemBootProps> = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Total boot time approx 4 seconds
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 1.5;
            });
        }, 30);

        return () => clearInterval(interval);
    }, [onComplete]);

    useEffect(() => {
        if (progress < 20) setStep(0);
        else if (progress < 40) setStep(1);
        else if (progress < 60) setStep(2);
        else if (progress < 80) setStep(3);
        else if (progress < 98) setStep(4);
        else setStep(5);
    }, [progress]);

    return (
        <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center font-mono overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 grid-bg opacity-20 animate-pulse"></div>
            
            {/* Main Content */}
            <div className="relative z-10 w-full max-w-2xl px-8">
                <div className="flex justify-center mb-12">
                    <div className="relative">
                        <div className="absolute inset-0 bg-cyber blur-[50px] opacity-20 animate-pulse"></div>
                        <Hexagon size={80} className="text-cyber animate-spin-slow relative z-10" />
                        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs z-20">
                            {Math.round(progress)}%
                        </div>
                    </div>
                </div>

                {/* Terminal Log */}
                <div className="bg-void-lighter border border-white/10 rounded-xl p-6 font-mono text-xs h-48 overflow-hidden flex flex-col justify-end shadow-[0_0_50px_rgba(0,240,255,0.1)]">
                    {STEPS.map((s, i) => (
                        <div 
                            key={i} 
                            className={`flex items-center gap-3 mb-2 transition-all duration-300 ${i > step ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
                        >
                            <s.icon size={14} className={s.color} />
                            <span className={i === step ? "text-white animate-pulse" : "text-gray-500"}>
                                {s.text}
                            </span>
                            {i < step && <span className="text-green-500 ml-auto">[OK]</span>}
                        </div>
                    ))}
                    <div className="w-full bg-gray-800 h-1 mt-4 rounded-full overflow-hidden">
                        <div className="bg-cyber h-full transition-all duration-100" style={{width: `${progress}%`}}></div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-600 text-[10px] tracking-[0.5em] uppercase animate-pulse">
                        Establishing Neural Link...
                    </p>
                </div>
            </div>

            {/* Decorative Scanlines */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%]"></div>
        </div>
    );
};

export default SystemBoot;

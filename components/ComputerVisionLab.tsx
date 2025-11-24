
import React, { useState, useEffect, useRef } from 'react';
import { Camera, Scan, FileText, CheckCircle, Brain, Cpu, Layers, Maximize, AlertCircle, RefreshCw } from 'lucide-react';

const STEPS = [
    { id: 1, label: "Image Acquisition", status: "pending" },
    { id: 2, label: "Noise Reduction", status: "pending" },
    { id: 3, label: "Handwriting OCR", status: "pending" },
    { id: 4, label: "Symbol Segmentation", status: "pending" },
    { id: 5, label: "Math Logic Core", status: "pending" },
    { id: 6, label: "Solution Generation", status: "pending" }
];

const ComputerVisionLab: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [scanning, setScanning] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [result, setResult] = useState<{problem: string, solution: string, steps: string[]} | null>(null);

    useEffect(() => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    if (videoRef.current) videoRef.current.srcObject = stream;
                })
                .catch(console.error);
        }
    }, []);

    // Draw scanning effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrame: number;
        let scanY = 0;

        const render = () => {
            if (!canvas.parentElement) return;
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (scanning) {
                // Draw Scan Line
                scanY += 5;
                if (scanY > canvas.height) scanY = 0;

                const gradient = ctx.createLinearGradient(0, scanY, 0, scanY + 40);
                gradient.addColorStop(0, 'rgba(0, 240, 255, 0)');
                gradient.addColorStop(0.5, 'rgba(0, 240, 255, 0.5)');
                gradient.addColorStop(1, 'rgba(0, 240, 255, 0)');

                ctx.fillStyle = gradient;
                ctx.fillRect(0, scanY, canvas.width, 40);

                // Draw Detection Boxes (Simulated)
                if (Math.random() > 0.8) {
                    const x = Math.random() * (canvas.width - 100);
                    const y = Math.random() * (canvas.height - 50);
                    ctx.strokeStyle = 'rgba(0, 240, 255, 0.8)';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(x, y, 100, 50);
                    
                    ctx.fillStyle = '#00f0ff';
                    ctx.font = '10px monospace';
                    ctx.fillText(`CONF: ${(Math.random() * 10 + 90).toFixed(1)}%`, x, y - 5);
                }
            }

            animationFrame = requestAnimationFrame(render);
        };
        render();
        return () => cancelAnimationFrame(animationFrame);
    }, [scanning]);

    const startScan = () => {
        setScanning(true);
        setResult(null);
        setProgress(0);
        setCurrentStep(0);

        let step = 0;
        const interval = setInterval(() => {
            step++;
            setCurrentStep(step);
            setProgress((step / 6) * 100);

            if (step >= 6) {
                clearInterval(interval);
                setScanning(false);
                setResult({
                    problem: "∫(x^2 + 2x) dx",
                    solution: "(x^3)/3 + x^2 + C",
                    steps: [
                        "Identified integral symbol and polynomial function.",
                        "Apply power rule for integration: ∫x^n dx = (x^(n+1))/(n+1).",
                        "Integrate x^2: (x^(2+1))/(2+1) = x^3/3.",
                        "Integrate 2x: 2 * (x^(1+1))/(1+1) = x^2.",
                        "Add constant of integration C."
                    ]
                });
            }
        }, 800);
    };

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-7xl mx-auto h-[85vh] flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-black text-white flex items-center gap-3">
                            <Scan className="text-cyber" size={32} />
                            CV & ML LAB <span className="text-xs bg-cyber text-black px-2 py-1 rounded">v9.0</span>
                        </h1>
                        <p className="text-gray-400">Computer Vision Handwriting Recognition System</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-void-lighter border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2">
                            <Brain size={16} className="text-purple-400" />
                            <span className="text-xs text-gray-400">ALGORITHMS:</span>
                            <span className="text-white font-bold">1,000,000+</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0">
                    {/* Camera Feed */}
                    <div className="lg:col-span-2 relative bg-black border border-cyber/30 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.1)]">
                        <video 
                            ref={videoRef} 
                            autoPlay 
                            muted 
                            playsInline 
                            className="absolute inset-0 w-full h-full object-cover opacity-80"
                        />
                        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                        
                        {/* Overlay UI */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
                            <div className="flex justify-between">
                                <Maximize className="text-cyber/50" />
                                <Maximize className="text-cyber/50 rotate-90" />
                            </div>
                            
                            {!scanning && !result && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                                    <button 
                                        onClick={startScan}
                                        className="bg-cyber/90 backdrop-blur text-black px-8 py-4 rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,240,255,0.4)] flex items-center gap-3"
                                    >
                                        <Camera size={24} /> SCAN PROBLEM
                                    </button>
                                </div>
                            )}

                            <div className="flex justify-between">
                                <Maximize className="text-cyber/50 -rotate-90" />
                                <Maximize className="text-cyber/50 rotate-180" />
                            </div>
                        </div>
                    </div>

                    {/* Analysis Panel */}
                    <div className="bg-void-lighter border border-white/10 rounded-3xl p-6 flex flex-col">
                        <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                            <Layers className="text-cyber" size={20} />
                            PROCESSING PIPELINE
                        </h3>

                        <div className="space-y-4 mb-8 flex-1 overflow-y-auto custom-scrollbar">
                            {STEPS.map((step, idx) => (
                                <div key={step.id} className="flex items-center gap-4">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                                        idx < currentStep ? 'bg-green-500 text-black' : 
                                        idx === currentStep ? 'bg-cyber text-black animate-pulse' : 'bg-white/5 text-gray-500'
                                    }`}>
                                        {idx < currentStep ? <CheckCircle size={14} /> : idx + 1}
                                    </div>
                                    <div className="flex-1">
                                        <div className={`text-sm font-bold transition-colors ${idx === currentStep ? 'text-white' : 'text-gray-500'}`}>{step.label}</div>
                                        <div className="h-1 bg-gray-800 rounded-full mt-1 overflow-hidden">
                                            <div 
                                                className={`h-full transition-all duration-500 ${idx < currentStep ? 'bg-green-500 w-full' : idx === currentStep ? 'bg-cyber w-full animate-progress' : 'w-0'}`}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {result && (
                            <div className="bg-white/5 border border-green-500/30 rounded-2xl p-4 animate-in fade-in slide-in-from-bottom duration-500">
                                <div className="flex items-center gap-2 text-green-500 mb-2">
                                    <CheckCircle size={16} />
                                    <span className="text-xs font-bold uppercase">Solution Found (99.9% Confidence)</span>
                                </div>
                                <div className="font-mono text-xl text-white mb-2">{result.problem}</div>
                                <div className="text-cyber font-bold text-2xl mb-4">= {result.solution}</div>
                                <div className="text-xs text-gray-400 space-y-1">
                                    {result.steps.map((s, i) => (
                                        <div key={i}>• {s}</div>
                                    ))}
                                </div>
                                <button 
                                    onClick={startScan}
                                    className="w-full mt-4 bg-white/10 text-white py-2 rounded-lg text-sm font-bold hover:bg-white/20 flex items-center justify-center gap-2"
                                >
                                    <RefreshCw size={14} /> New Scan
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComputerVisionLab;

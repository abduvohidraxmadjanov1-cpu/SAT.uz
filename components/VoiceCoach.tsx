
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Brain, Activity, CheckCircle, AlertCircle, Play, Square } from 'lucide-react';

const VoiceCoach: React.FC = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState("Press microphone to start explaining...");
    const [analysis, setAnalysis] = useState<{score: number, clarity: string, missing: string[]} | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const animationFrameRef = useRef<number>(0);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            analyserRef.current = audioContextRef.current.createAnalyser();
            sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
            sourceRef.current.connect(analyserRef.current);
            
            setIsRecording(true);
            setAnalysis(null);
            setTranscript("Listening... (Explain 'Photosynthesis' or 'Pythagorean Theorem')");
            visualize();
            
            // Simulate transcription appearing
            setTimeout(() => {
                if(isRecording) setTranscript("So basically, the square of the hypotenuse...");
            }, 2000);
            setTimeout(() => {
                if(isRecording) setTranscript("So basically, the square of the hypotenuse is equal to the sum of the squares of the other two sides.");
            }, 4000);

        } catch (err) {
            console.error(err);
        }
    };

    const stopRecording = () => {
        setIsRecording(false);
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        if (sourceRef.current) sourceRef.current.disconnect();
        
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            setAnalysis({
                score: 88,
                clarity: "High",
                missing: ["Did not mention 'Right-angled triangle' condition", "Good formula usage"]
            });
        }, 2000);
    };

    const visualize = () => {
        if (!analyserRef.current || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            animationFrameRef.current = requestAnimationFrame(draw);
            analyserRef.current!.getByteFrequencyData(dataArray);

            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const barWidth = (canvas.width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;

            for(let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] / 2;
                ctx.fillStyle = `rgb(${barHeight + 100}, 50, 255)`;
                ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight);
                x += barWidth + 1;
            }
        };
        draw();
    };

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-4xl mx-auto h-[80vh] flex flex-col">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black text-white mb-2 flex items-center justify-center gap-3">
                        <Mic className="text-cyber" size={40} />
                        VOICE <span className="text-purple-500">COACH</span>
                    </h1>
                    <p className="text-gray-400">Feynman Technique AI: Teach to Learn</p>
                </div>

                <div className="flex-1 bg-void-lighter border border-white/10 rounded-3xl overflow-hidden relative flex flex-col shadow-[0_0_50px_rgba(168,85,247,0.1)]">
                    <div className="flex-1 relative bg-black/50 flex flex-col items-center justify-center p-8">
                        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" width={800} height={400} />
                        
                        <div className={`relative z-10 text-center transition-all duration-500 ${isRecording ? 'scale-110' : 'scale-100'}`}>
                            <div className="text-2xl md:text-4xl font-medium text-white mb-8 leading-relaxed font-serif italic">
                                "{transcript}"
                            </div>
                        </div>

                        {isAnalyzing && (
                            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                                <Brain size={64} className="text-cyber animate-pulse mb-4" />
                                <h2 className="text-xl font-bold text-white">AI ANALYZING EXPLANATION...</h2>
                                <p className="text-gray-400 text-sm font-mono mt-2">Checking Logic • Verifying Facts • Measuring Clarity</p>
                            </div>
                        )}

                        {analysis && (
                            <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center z-20 p-8 animate-in zoom-in-95">
                                <div className="w-24 h-24 rounded-full border-4 border-green-500 flex items-center justify-center mb-6">
                                    <span className="text-4xl font-black text-white">{analysis.score}</span>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">Great Explanation!</h2>
                                <p className="text-cyber font-bold mb-6">{analysis.clarity} Clarity</p>
                                
                                <div className="bg-white/10 rounded-xl p-6 max-w-lg w-full text-left">
                                    <h3 className="text-gray-400 text-xs font-bold uppercase mb-4">AI Feedback</h3>
                                    <ul className="space-y-3">
                                        {analysis.missing.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                                <AlertCircle size={16} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                        <li className="flex items-start gap-3 text-sm text-gray-300">
                                            <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                            Confidence level detected: 92%
                                        </li>
                                    </ul>
                                </div>
                                <button onClick={() => setAnalysis(null)} className="mt-8 text-gray-400 hover:text-white underline">Try Another Concept</button>
                            </div>
                        )}
                    </div>

                    {/* Controls */}
                    <div className="h-24 bg-void border-t border-white/10 flex items-center justify-center gap-8">
                        {!isRecording ? (
                            <button 
                                onClick={startRecording}
                                className="w-16 h-16 rounded-full bg-cyber text-black flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_20px_#00f0ff]"
                            >
                                <Mic size={32} />
                            </button>
                        ) : (
                            <button 
                                onClick={stopRecording}
                                className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_20px_red] animate-pulse"
                            >
                                <Square size={24} fill="currentColor" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoiceCoach;

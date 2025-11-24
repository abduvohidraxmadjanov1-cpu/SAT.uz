
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Activity, AlertCircle } from 'lucide-react';
import { Page } from '../types';

interface VoiceControlProps {
    setPage: (page: Page) => void;
}

const VoiceControl: React.FC<VoiceControlProps> = ({ setPage }) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [commandStatus, setCommandStatus] = useState<'idle' | 'listening' | 'processing' | 'success' | 'error' | 'unsupported'>('idle');
    
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const animationFrameRef = useRef<number>(0);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = 'uz-UZ';

            recognitionRef.current.onstart = () => {
                setCommandStatus('listening');
            };

            recognitionRef.current.onresult = (event: any) => {
                const current = event.resultIndex;
                const transcriptText = event.results[current][0].transcript;
                setTranscript(transcriptText);
            };

            recognitionRef.current.onend = () => {
                // Don't stop listening state immediately if we want continuous feel, but for command mode:
                if (isListening) {
                    setIsListening(false);
                    stopVisualizer();
                    if (transcript) processCommand(transcript);
                    else setCommandStatus('idle');
                }
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error("Speech Rec Error", event.error);
                setCommandStatus('error');
                setIsListening(false);
                stopVisualizer();
            };
        } else {
            setCommandStatus('unsupported');
        }

        return () => {
            if (recognitionRef.current) recognitionRef.current.abort();
            stopVisualizer();
        };
    }, [transcript, isListening]);

    const processCommand = (text: string) => {
        const cmd = text.toLowerCase();
        setCommandStatus('processing');
        
        // Simulated Intent NLU
        setTimeout(() => {
            let matched = false;
            if (cmd.includes('bosh') || cmd.includes('home') || cmd.includes('uy')) {
                setPage(Page.HOME);
                matched = true;
            } else if (cmd.includes('kurs') || cmd.includes('course') || cmd.includes('dars')) {
                setPage(Page.COURSE);
                matched = true;
            } else if (cmd.includes('amaliyot') || cmd.includes('practice') || cmd.includes('test')) {
                setPage(Page.PRACTICE);
                matched = true;
            } else if (cmd.includes('markaz') || cmd.includes('hub') || cmd.includes('mcp')) {
                setPage(Page.MCP_HUB);
                matched = true;
            } else if (cmd.includes('fokus') || cmd.includes('focus') || cmd.includes('iot')) {
                setPage(Page.FOCUS_MODE);
                matched = true;
            }

            if (matched) {
                setCommandStatus('success');
            } else {
                setCommandStatus('error');
            }

            setTimeout(() => {
                setCommandStatus('idle');
                setTranscript('');
            }, 2000);
        }, 500);
    };

    const startListening = async () => {
        if (commandStatus === 'unsupported') {
            alert("Brauzeringiz ovozli buyruqlarni qo'llab-quvvatlamaydi. Iltimos Chrome ishlating.");
            return;
        }

        if (isListening) {
            recognitionRef.current?.stop();
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            startVisualizer(stream);
            recognitionRef.current?.start();
            setIsListening(true);
            setTranscript('');
        } catch (err) {
            console.error("Microphone access denied:", err);
            setCommandStatus('error');
        }
    };

    const startVisualizer = (stream: MediaStream) => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        
        const audioCtx = audioContextRef.current;
        analyserRef.current = audioCtx.createAnalyser();
        analyserRef.current.fftSize = 256;
        
        sourceRef.current = audioCtx.createMediaStreamSource(stream);
        sourceRef.current.connect(analyserRef.current);
        
        drawVisualizer();
    };

    const stopVisualizer = () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        if (sourceRef.current) {
            sourceRef.current.disconnect();
            sourceRef.current = null;
        }
    };

    const drawVisualizer = () => {
        if (!analyserRef.current || !canvasRef.current) return;
        
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const draw = () => {
            animationFrameRef.current = requestAnimationFrame(draw);
            analyserRef.current!.getByteFrequencyData(dataArray);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = 25;

            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgba(0, 240, 255, 0.1)';
            ctx.fill();

            // Draw circular wave
            for (let i = 0; i < bufferLength; i++) {
                const barHeight = dataArray[i] / 3;
                if (barHeight < 2) continue; // Filter noise

                const rad = (i * 2 * Math.PI) / bufferLength;
                const x = centerX + Math.cos(rad) * (radius + barHeight);
                const y = centerY + Math.sin(rad) * (radius + barHeight);
                const x2 = centerX + Math.cos(rad) * radius;
                const y2 = centerY + Math.sin(rad) * radius;

                ctx.beginPath();
                ctx.moveTo(x2, y2);
                ctx.lineTo(x, y);
                ctx.strokeStyle = `hsl(${(i / bufferLength) * 360 + 180}, 100%, 50%)`;
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        };

        draw();
    };

    if (commandStatus === 'unsupported') return null;

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-2">
            {/* Transcript Bubble */}
            {(transcript || commandStatus !== 'idle') && (
                <div className={`
                    px-4 py-2 rounded-xl backdrop-blur-md border mb-2 transition-all duration-300 max-w-xs text-right
                    ${commandStatus === 'error' ? 'bg-red-500/20 border-red-500 text-red-200' : 
                      commandStatus === 'success' ? 'bg-green-500/20 border-green-500 text-green-200' :
                      'bg-cyber/10 border-cyber/30 text-cyber'}
                `}>
                    <p className="text-xs font-mono uppercase font-bold mb-1">
                        {commandStatus === 'listening' ? 'TINGLAMOQDA...' : 
                         commandStatus === 'processing' ? 'TAHLIL QILINMOQDA...' : 
                         commandStatus === 'success' ? 'BAJARILDI' : 
                         commandStatus === 'error' ? 'XATOLIK' : 'OVOZ TIZIMI'}
                    </p>
                    <p className="text-sm font-medium">
                        {commandStatus === 'error' ? "Mikrofon yoki tarmoq xatosi" : (transcript || "Buyruq kuting...")}
                    </p>
                </div>
            )}

            {/* Main Button */}
            <div className="relative group">
                <div className={`absolute inset-0 bg-cyber rounded-full blur-lg opacity-40 transition-opacity duration-300 ${isListening ? 'animate-pulse opacity-80' : 'group-hover:opacity-60'}`}></div>
                <button
                    onClick={startListening}
                    className={`
                        relative w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-xl overflow-hidden
                        ${isListening ? 'bg-black border-cyber scale-110' : 'bg-black/80 border-white/20 hover:border-cyber hover:scale-105'}
                        ${commandStatus === 'error' ? 'border-red-500' : ''}
                    `}
                >
                    <canvas 
                        ref={canvasRef} 
                        width="64" 
                        height="64" 
                        className="absolute inset-0 w-full h-full pointer-events-none" 
                    />
                    
                    <div className="relative z-10">
                        {commandStatus === 'error' ? (
                            <AlertCircle className="text-red-500" size={24} />
                        ) : isListening ? (
                            <Activity className="text-cyber animate-pulse" size={24} />
                        ) : (
                            <Mic className="text-white group-hover:text-cyber transition-colors" size={24} />
                        )}
                    </div>
                </button>
            </div>
        </div>
    );
};

export default VoiceControl;

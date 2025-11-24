import React, { useState, useEffect, useRef } from 'react';
import { Mic, Sun, Wind, Volume2, AlertTriangle, CheckCircle, Wifi, Thermometer } from 'lucide-react';

const StudyRoom: React.FC = () => {
    const [noiseLevel, setNoiseLevel] = useState(0);
    const [lightLevel, setLightLevel] = useState(85); // Simulated
    const [temp, setTemp] = useState(24); // Simulated
    const [isListening, setIsListening] = useState(false);
    const [status, setStatus] = useState<'Optimal' | 'Suboptimal' | 'Poor'>('Optimal');
    
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const animationFrameRef = useRef<number>(0);

    useEffect(() => {
        // Start Audio Analysis
        const startAudio = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                setIsListening(true);
                
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
                analyserRef.current = audioContextRef.current.createAnalyser();
                analyserRef.current.fftSize = 256;
                sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
                sourceRef.current.connect(analyserRef.current);

                const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);

                const update = () => {
                    analyserRef.current!.getByteFrequencyData(dataArray);
                    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
                    setNoiseLevel(Math.round(average)); // 0-255 scale roughly mapped to DB
                    
                    animationFrameRef.current = requestAnimationFrame(update);
                };
                update();

            } catch (err) {
                console.error("Mic Error:", err);
            }
        };

        startAudio();

        // Simulate other sensors
        const interval = setInterval(() => {
            setLightLevel(prev => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 5)));
            setTemp(prev => Math.min(30, Math.max(18, prev + (Math.random() - 0.5))));
        }, 2000);

        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            if (sourceRef.current) sourceRef.current.disconnect();
            if (audioContextRef.current) audioContextRef.current.close();
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (noiseLevel > 50 || lightLevel < 40) setStatus('Poor');
        else if (noiseLevel > 30 || lightLevel < 60) setStatus('Suboptimal');
        else setStatus('Optimal');
    }, [noiseLevel, lightLevel]);

    return (
        <div className="min-h-screen bg-black pt-24 px-4 pb-12">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                     <h1 className="text-4xl font-black text-white mb-2 flex items-center justify-center gap-3">
                        <Wind className="text-cyber animate-pulse" />
                        SMART STUDY ROOM
                    </h1>
                    <p className="text-gray-400">IoT Environmental Analysis & Optimization</p>
                </div>

                <div className="bg-void-lighter border border-white/10 rounded-3xl p-8 mb-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyber/5 to-transparent"></div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <div className="text-sm text-gray-500 font-bold uppercase mb-2">Environment Status</div>
                            <div className={`text-5xl font-black ${status === 'Optimal' ? 'text-green-500' : status === 'Suboptimal' ? 'text-yellow-500' : 'text-red-500'}`}>
                                {status}
                            </div>
                            <p className="text-gray-400 mt-2 text-sm max-w-md">
                                {status === 'Optimal' ? "Xona holati a'lo darajada. O'qishga kirishing." : 
                                 status === 'Suboptimal' ? "Yorug'likni oshiring yoki shovqinni kamaytiring." : 
                                 "Diqqat! Muhit o'qish uchun yaroqsiz."}
                            </p>
                        </div>
                        
                        <div className="w-40 h-40 bg-black rounded-full border-4 border-white/10 flex items-center justify-center relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                             {/* Ripple Effect for Noise */}
                             <div 
                                className={`absolute inset-0 rounded-full border-2 transition-all duration-100 ${noiseLevel > 30 ? 'border-red-500 opacity-50' : 'border-cyber opacity-20'}`}
                                style={{ transform: `scale(${1 + noiseLevel/100})` }}
                             ></div>
                             
                             <div className="text-center">
                                 <div className="text-3xl font-bold text-white">{noiseLevel}</div>
                                 <div className="text-xs text-gray-500 uppercase">dB Noise</div>
                             </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Noise Sensor */}
                    <div className="bg-void-lighter border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center">
                        <div className={`p-4 rounded-full mb-4 ${noiseLevel > 40 ? 'bg-red-500/10 text-red-500' : 'bg-cyber/10 text-cyber'}`}>
                            <Volume2 size={32} />
                        </div>
                        <h3 className="text-white font-bold mb-1">Noise Level</h3>
                        <div className="text-2xl font-mono text-gray-300 mb-2">{noiseLevel} dB</div>
                        <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                            <div className={`h-full transition-all duration-100 ${noiseLevel > 40 ? 'bg-red-500' : 'bg-cyber'}`} style={{width: `${(noiseLevel/100)*100}%`}}></div>
                        </div>
                    </div>

                    {/* Light Sensor */}
                    <div className="bg-void-lighter border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center">
                        <div className={`p-4 rounded-full mb-4 ${lightLevel < 50 ? 'bg-yellow-500/10 text-yellow-500' : 'bg-cyber/10 text-cyber'}`}>
                            <Sun size={32} />
                        </div>
                        <h3 className="text-white font-bold mb-1">Lighting</h3>
                        <div className="text-2xl font-mono text-gray-300 mb-2">{Math.round(lightLevel)}%</div>
                        <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-yellow-400 h-full transition-all duration-500" style={{width: `${lightLevel}%`}}></div>
                        </div>
                    </div>

                    {/* Temp Sensor */}
                    <div className="bg-void-lighter border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center">
                        <div className="p-4 rounded-full mb-4 bg-purple-500/10 text-purple-500">
                            <Thermometer size={32} />
                        </div>
                        <h3 className="text-white font-bold mb-1">Temperature</h3>
                        <div className="text-2xl font-mono text-gray-300 mb-2">{temp.toFixed(1)}°C</div>
                         <div className="flex items-center gap-2 text-xs text-green-500">
                             <CheckCircle size={12} /> Optimal
                         </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                     <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full text-xs text-gray-500 border border-white/5">
                         <Wifi size={14} className="text-green-500" />
                         IoT Sensors Connected • Latency: 4ms
                     </div>
                </div>
            </div>
        </div>
    );
};

export default StudyRoom;
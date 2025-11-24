
import React, { useEffect, useRef, useState } from 'react';
import { Camera, Scan, Activity, Eye, Brain, Zap, Wifi, AlertTriangle, Lock } from 'lucide-react';

const IoTFocusMode: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [metrics, setMetrics] = useState({
        focus: 98,
        fatigue: 12,
        emotion: 'Neytral',
        heartRate: 72
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let stream: MediaStream | null = null;

        // Request Camera Permission
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(s => {
                    stream = s;
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                    setError(null);
                })
                .catch(err => {
                    console.error("Camera Error:", err);
                    setError("ACCESS_DENIED_BY_USER");
                });
        } else {
            setError("NO_HARDWARE_DETECTED");
        }

        // Simulate Metrics Update Loop (Simulating AI Analysis)
        const interval = setInterval(() => {
            setMetrics(prev => ({
                focus: Math.min(100, Math.max(85, prev.focus + (Math.random() - 0.5) * 5)),
                fatigue: Math.max(0, Math.min(30, prev.fatigue + (Math.random() - 0.4) * 2)),
                emotion: Math.random() > 0.8 ? (Math.random() > 0.5 ? 'Fokuslangan' : 'O\'ychan') : prev.emotion,
                heartRate: Math.floor(70 + Math.random() * 10)
            }));
        }, 2000);

        return () => {
            clearInterval(interval);
            if (stream) stream.getTracks().forEach(track => track.stop());
        };
    }, []);

    // Draw HUD on Canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let scanLineY = 0;

        const render = () => {
            if (!canvas) return;
            canvas.width = canvas.parentElement?.clientWidth || 640;
            canvas.height = canvas.parentElement?.clientHeight || 480;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            if (error) return;

            // Draw Face Detection Box (Simulated)
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const boxSize = 200;

            ctx.strokeStyle = '#00f0ff';
            ctx.lineWidth = 2;
            
            // Corner brackets
            const cornerLen = 20;
            // Top Left
            ctx.beginPath(); ctx.moveTo(centerX - boxSize/2, centerY - boxSize/2 + cornerLen); ctx.lineTo(centerX - boxSize/2, centerY - boxSize/2); ctx.lineTo(centerX - boxSize/2 + cornerLen, centerY - boxSize/2); ctx.stroke();
            // Top Right
            ctx.beginPath(); ctx.moveTo(centerX + boxSize/2 - cornerLen, centerY - boxSize/2); ctx.lineTo(centerX + boxSize/2, centerY - boxSize/2); ctx.lineTo(centerX + boxSize/2, centerY - boxSize/2 + cornerLen); ctx.stroke();
            // Bottom Left
            ctx.beginPath(); ctx.moveTo(centerX - boxSize/2, centerY + boxSize/2 - cornerLen); ctx.lineTo(centerX - boxSize/2, centerY + boxSize/2); ctx.lineTo(centerX - boxSize/2 + cornerLen, centerY + boxSize/2); ctx.stroke();
            // Bottom Right
            ctx.beginPath(); ctx.moveTo(centerX + boxSize/2 - cornerLen, centerY + boxSize/2); ctx.lineTo(centerX + boxSize/2, centerY + boxSize/2); ctx.lineTo(centerX + boxSize/2, centerY + boxSize/2 - cornerLen); ctx.stroke();

            // Scanning Line
            scanLineY += 5;
            if (scanLineY > canvas.height) scanLineY = 0;
            
            const gradient = ctx.createLinearGradient(0, scanLineY, 0, scanLineY + 20);
            gradient.addColorStop(0, 'rgba(0, 240, 255, 0)');
            gradient.addColorStop(0.5, 'rgba(0, 240, 255, 0.5)');
            gradient.addColorStop(1, 'rgba(0, 240, 255, 0)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, scanLineY, canvas.width, 20);

            animationFrameId = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(animationFrameId);
    }, [error]);

    return (
        <div className="relative w-full h-full bg-black rounded-3xl overflow-hidden border border-cyber/30 shadow-[0_0_50px_rgba(0,240,255,0.1)]">
            {error ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-10">
                    <AlertTriangle size={64} className="text-red-500 animate-pulse mb-4" />
                    <h2 className="text-2xl font-black text-white mb-2">SENSOR OFFLINE</h2>
                    <p className="text-gray-500 font-mono text-sm mb-6">
                        CODE: {error}
                    </p>
                    <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl max-w-md text-center">
                        <p className="text-red-400 text-xs">
                            Neural Core requires camera access to track focus metrics. 
                            Using simulated data stream for demo.
                        </p>
                    </div>
                </div>
            ) : (
                <video 
                    ref={videoRef} 
                    autoPlay 
                    muted 
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale contrast-125"
                />
            )}
            <canvas 
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />
            
            {/* HUD Overlay */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                {/* Top Header */}
                <div className="flex justify-between items-start">
                    <div className={`flex items-center gap-2 bg-black/60 backdrop-blur px-4 py-2 rounded-lg border ${error ? 'border-red-500/30' : 'border-cyber/30'}`}>
                        <div className={`w-3 h-3 rounded-full ${error ? 'bg-red-500 animate-pulse' : 'bg-green-500 animate-pulse shadow-[0_0_10px_#00f0ff]'}`}></div>
                        <span className={`${error ? 'text-red-500' : 'text-cyber'} font-mono text-xs tracking-widest`}>
                            {error ? 'SYSTEM ERROR' : 'REC ● AI ANALYZING'}
                        </span>
                    </div>
                    <div className="flex flex-col items-end">
                         <span className="text-xs text-cyber font-mono">IoT-CAM-001</span>
                         <span className="text-2xl font-black text-white font-mono">{new Date().toLocaleTimeString()}</span>
                    </div>
                </div>

                {/* Center Reticle */}
                {!error && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyber/50 rounded-full animate-ping"></div>
                )}

                {/* Bottom Metrics */}
                <div className="grid grid-cols-4 gap-4 opacity-90">
                    <div className="bg-black/60 backdrop-blur border border-cyber/20 p-4 rounded-xl">
                        <div className="flex items-center gap-2 text-cyber mb-1">
                            <Brain size={16} />
                            <span className="text-xs font-bold uppercase">Diqqat</span>
                        </div>
                        <div className="text-2xl font-mono font-bold text-white">{Math.round(metrics.focus)}%</div>
                        <div className="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden">
                            <div className="h-full bg-cyber" style={{width: `${metrics.focus}%`}}></div>
                        </div>
                    </div>

                    <div className="bg-black/60 backdrop-blur border border-purple-500/20 p-4 rounded-xl">
                        <div className="flex items-center gap-2 text-purple-400 mb-1">
                            <Zap size={16} />
                            <span className="text-xs font-bold uppercase">Charchoq</span>
                        </div>
                        <div className="text-2xl font-mono font-bold text-white">{Math.round(metrics.fatigue)}%</div>
                         <div className="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500" style={{width: `${metrics.fatigue}%`}}></div>
                        </div>
                    </div>

                     <div className="bg-black/60 backdrop-blur border border-green-500/20 p-4 rounded-xl">
                        <div className="flex items-center gap-2 text-green-400 mb-1">
                            <Activity size={16} />
                            <span className="text-xs font-bold uppercase">Yurak Urib</span>
                        </div>
                        <div className="text-2xl font-mono font-bold text-white">{metrics.heartRate} <span className="text-xs text-gray-400">BPM</span></div>
                    </div>

                    <div className="bg-black/60 backdrop-blur border border-blue-500/20 p-4 rounded-xl">
                        <div className="flex items-center gap-2 text-blue-400 mb-1">
                            <Eye size={16} />
                            <span className="text-xs font-bold uppercase">Holat</span>
                        </div>
                        <div className="text-xl font-mono font-bold text-white">{metrics.emotion}</div>
                    </div>
                </div>
            </div>
            
            {/* Decorative corners */}
            <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-cyber/50 rounded-tr-3xl pointer-events-none"></div>
            <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-cyber/50 rounded-bl-3xl pointer-events-none"></div>
        </div>
    );
};

export default IoTFocusMode;
